import "server-only";
import type { Lead } from "./schema";

/**
 * Notification par e-mail via l'API Resend (https://resend.com), facultative.
 * Variables : RESEND_API_KEY, LEAD_NOTIFY_FROM (adresse d'un domaine vérifié chez Resend),
 * LEAD_NOTIFY_TO (destinataires séparés par des virgules).
 * Le contenu est envoyé en texte brut : aucune donnée saisie n'est interprétée comme du HTML.
 */
export const notifyConfigured = () =>
  !!(process.env.RESEND_API_KEY && process.env.LEAD_NOTIFY_FROM && process.env.LEAD_NOTIFY_TO);

const oneLine = (v: string) => v.replace(/[\r\n]+/g, " ").slice(0, 120);

export async function notifyLead(lead: Lead, serviceLabel: string): Promise<void> {
  if (!notifyConfigured()) throw new Error("notify not configured");
  const to = process.env.LEAD_NOTIFY_TO!.split(",").map((s) => s.trim()).filter(Boolean);
  const lines = [
    `Type : ${lead.kind === "quote" ? "Demande de devis" : "Message de contact"}`,
    `Langue : ${lead.locale}`,
    `Nom : ${lead.name}`,
    `Téléphone : ${lead.phone}`,
    `E-mail : ${lead.email ?? "-"}`,
    `Prestation : ${serviceLabel}`,
    `Localisation : ${lead.location ?? "-"}`,
    `Budget : ${lead.budget ?? "-"}`,
    "",
    lead.message,
  ];
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.LEAD_NOTIFY_FROM,
      to,
      ...(lead.email ? { reply_to: lead.email } : {}),
      subject: oneLine(`[Site] ${lead.kind === "quote" ? "Devis" : "Contact"} – ${lead.name}`),
      text: lines.join("\n"),
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`notify failed: ${res.status}`);
}
