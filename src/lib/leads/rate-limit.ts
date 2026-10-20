import "server-only";
import { createHash } from "node:crypto";
import { countRecent } from "./store";

export const RATE_LIMIT = { max: 3, windowMs: 15 * 60 * 1000 };

/** Empreinte non réversible de l'adresse IP (sel secret LEAD_IP_SALT). L'adresse IP brute n'est jamais stockée. */
export function hashIp(ip: string): string {
  const salt = process.env.LEAD_IP_SALT || "arrow-home-default-salt";
  return createHash("sha256").update(`${salt}:${ip}`).digest("hex");
}

// Solution de secours, en mémoire, si Supabase n'est pas configuré (non partagée entre instances serverless).
const memory = new Map<string, number[]>();

/**
 * Vrai si l'adresse a déjà envoyé trop de demandes récemment.
 * En production, le comptage s'appuie sur la base Supabase (persistant et partagé entre toutes les instances).
 */
export async function isRateLimited(ipHash: string): Promise<boolean> {
  const count = await countRecent(ipHash, RATE_LIMIT.windowMs);
  if (count !== null) return count >= RATE_LIMIT.max;
  const now = Date.now();
  const recent = (memory.get(ipHash) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  if (recent.length >= RATE_LIMIT.max) return true;
  memory.set(ipHash, [...recent, now]);
  if (memory.size > 5000) memory.clear();
  return false;
}
