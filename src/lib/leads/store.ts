import "server-only";
import type { Lead } from "./schema";

/**
 * Enregistrement des demandes dans Supabase, côté serveur uniquement.
 * Le site n'appelle qu'une fonction verrouillée (public.submit_website_lead) avec la clé publique du projet
 * et un jeton secret (LEAD_RPC_TOKEN). Aucune clé service_role n'est nécessaire.
 * La table website_leads a RLS activé sans aucune politique : elle reste illisible depuis l'extérieur.
 * Voir supabase/migrations/20261021000000_submit_website_lead.sql.
 */
function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_PUBLISHABLE_KEY;
  const token = process.env.LEAD_RPC_TOKEN;
  if (!url || !key || !token || token.length < 32 || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)) return null;
  const headers: Record<string, string> = { apikey: key };
  // Les anciennes clés anon sont des JWT ; les nouvelles clés (sb_publishable_…) ne passent que par l'en-tête apikey.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  return { url, headers, token };
}

export const storageConfigured = () => config() !== null;

/** Enregistre la demande. La limitation de fréquence est appliquée par la base elle-même. */
export async function storeLead(lead: Lead, ipHash: string): Promise<"ok" | "rate_limited"> {
  const c = config();
  if (!c) throw new Error("storage not configured");
  const res = await fetch(`${c.url}/rest/v1/rpc/submit_website_lead`, {
    method: "POST",
    headers: { ...c.headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      p_token: c.token,
      p_kind: lead.kind,
      p_locale: lead.locale,
      p_full_name: lead.name,
      p_phone: lead.phone,
      p_email: lead.email ?? null,
      p_service: lead.service ?? null,
      p_location: lead.location ?? null,
      p_budget: lead.budget ?? null,
      p_message: lead.message,
      p_ip_hash: ipHash,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`rpc failed: ${res.status}`);
  const result = await res.json();
  if (result === "ok" || result === "rate_limited") return result;
  throw new Error(`rpc refused: ${String(result).slice(0, 20)}`);
}
