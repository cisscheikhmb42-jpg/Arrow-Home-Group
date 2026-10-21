"use server";

import { headers } from "next/headers";
import { isServiceSlug } from "@/content/services";
import fr from "@/i18n/dictionaries/fr";
import { leadSchema } from "@/lib/leads/schema";
import type { FieldErrorCode, LeadField, LeadState } from "@/lib/leads/shared";
import { notifyConfigured, notifyLead } from "@/lib/leads/notify";
import { hashIp, isRateLimitedLocally } from "@/lib/leads/rate-limit";
import { storageConfigured, storeLead } from "@/lib/leads/store";

const FIELDS = ["kind", "locale", "name", "phone", "email", "service", "location", "budget", "message", "consent"] as const;
const MIN_FILL_MS = 2500;

/** Reçoit les formulaires de devis et de contact. Toutes les vérifications sont refaites ici, côté serveur. */
export async function submitLead(_prev: LeadState, formData: FormData): Promise<LeadState> {
  // Piège à robots : champ invisible qui doit rester vide.
  if (String(formData.get("website") ?? "") !== "") return { status: "error", formError: "spam" };

  // Délai minimum de remplissage (renseigné par le navigateur ; absent si JavaScript est désactivé).
  const started = Number(formData.get("started"));
  if (started && Date.now() - started < MIN_FILL_MS) return { status: "error", formError: "spam" };

  const raw: Record<string, string> = {};
  for (const f of FIELDS) {
    const v = formData.get(f);
    if (v !== null && typeof v !== "string") return { status: "error", formError: "spam" };
    raw[f] = v ?? "";
  }

  const parsed = leadSchema.safeParse(raw);
  if (!parsed.success) {
    const fieldErrors: Partial<Record<LeadField, FieldErrorCode>> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0] as LeadField;
      if (key && !fieldErrors[key]) fieldErrors[key] = (issue.message as FieldErrorCode) || "invalid";
    }
    if (Object.keys(fieldErrors).length === 0) return { status: "error", formError: "spam" };
    return { status: "error", fieldErrors };
  }
  const lead = parsed.data;

  const canStore = storageConfigured();
  const canNotify = notifyConfigured();
  if (!canStore && !canNotify) {
    console.error("[lead] Aucun service d'enregistrement configuré (SUPABASE_URL / RESEND_API_KEY).");
    return { status: "error", formError: "unavailable" };
  }

  const h = await headers();
  const ip = h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
  const ipHash = hashIp(ip);

  // Sans base, garde-fou en mémoire ; avec la base, c'est elle qui limite (partagé entre toutes les instances).
  if (!canStore && isRateLimitedLocally(ipHash)) return { status: "error", formError: "rateLimited" };

  let stored = false;
  if (canStore) {
    try {
      if ((await storeLead(lead, ipHash)) === "rate_limited") return { status: "error", formError: "rateLimited" };
      stored = true;
    } catch (e) {
      console.error("[lead] Échec de l'enregistrement :", (e as Error).message);
    }
  }

  let notified = false;
  if (canNotify) {
    try {
      const label = lead.service && isServiceSlug(lead.service) ? fr.services.items[lead.service].title : lead.service ?? "-";
      await notifyLead(lead, label);
      notified = true;
    } catch (e) {
      console.error("[lead] Échec de la notification :", (e as Error).message);
    }
  }

  // La confirmation n'est affichée que si la demande a réellement été enregistrée ou transmise.
  if (!stored && !notified) return { status: "error", formError: "server" };
  return { status: "success" };
}
