import "server-only";
import type { Lead } from "./schema";

/**
 * Enregistrement des demandes dans Supabase via l'API REST, côté serveur uniquement.
 * La clé utilisée (SUPABASE_SERVICE_ROLE_KEY, ou la nouvelle « secret key ») ne doit JAMAIS être exposée au navigateur :
 * elle n'est pas préfixée NEXT_PUBLIC_ et ce module est marqué server-only.
 * La table a RLS activé sans aucune politique : elle est inaccessible avec la clé publique (anon).
 */
const TABLE = "website_leads";

function config() {
  const url = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key || !/^https:\/\/[a-z0-9-]+\.supabase\.co$/.test(url)) return null;
  const headers: Record<string, string> = { apikey: key };
  // Les anciennes clés sont des JWT ; les nouvelles clés secrètes (sb_secret_…) ne passent que par l'en-tête apikey.
  if (key.startsWith("eyJ")) headers.Authorization = `Bearer ${key}`;
  return { url, headers };
}

export const storageConfigured = () => config() !== null;

export async function countRecent(ipHash: string, sinceMs: number): Promise<number | null> {
  const c = config();
  if (!c) return null;
  const since = new Date(Date.now() - sinceMs).toISOString();
  const res = await fetch(
    `${c.url}/rest/v1/${TABLE}?select=id&ip_hash=eq.${encodeURIComponent(ipHash)}&created_at=gte.${encodeURIComponent(since)}`,
    { method: "HEAD", headers: { ...c.headers, Prefer: "count=exact", Range: "0-0" }, cache: "no-store", signal: AbortSignal.timeout(6000) },
  );
  if (!res.ok && res.status !== 206) throw new Error(`count failed: ${res.status}`);
  const total = Number(res.headers.get("content-range")?.split("/")[1]);
  return Number.isFinite(total) ? total : 0;
}

export async function insertLead(lead: Lead, ipHash: string): Promise<void> {
  const c = config();
  if (!c) throw new Error("storage not configured");
  const res = await fetch(`${c.url}/rest/v1/${TABLE}`, {
    method: "POST",
    headers: { ...c.headers, "Content-Type": "application/json", Prefer: "return=minimal" },
    body: JSON.stringify({
      kind: lead.kind,
      locale: lead.locale,
      full_name: lead.name,
      phone: lead.phone,
      email: lead.email ?? null,
      service: lead.service ?? null,
      location: lead.location ?? null,
      budget: lead.budget ?? null,
      message: lead.message,
      consent: true,
      ip_hash: ipHash,
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8000),
  });
  if (!res.ok) throw new Error(`insert failed: ${res.status}`);
}
