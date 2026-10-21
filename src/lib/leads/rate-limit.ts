import "server-only";
import { createHash } from "node:crypto";

export const RATE_LIMIT = { max: 3, windowMs: 15 * 60 * 1000 };

/** Empreinte non réversible de l'adresse IP (sel secret LEAD_IP_SALT). L'adresse IP brute n'est jamais stockée. */
export function hashIp(ip: string): string {
  const salt = process.env.LEAD_IP_SALT || "arrow-home-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

// Limitation en mémoire, utilisée seulement quand Supabase n'est pas configuré (la base applique sinon la sienne).
// Non partagée entre instances serverless : simple garde-fou pour la notification e-mail seule.
const memory = new Map<string, number[]>();

export function isRateLimitedLocally(ipHash: string): boolean {
  const now = Date.now();
  const recent = (memory.get(ipHash) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) return true;
  memory.set(ipHash, [...recent, now]);
  if (memory.size > 5000) memory.clear();
  return false;
}
