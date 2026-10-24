/** Constantes et types partagés entre le formulaire (navigateur) et le serveur. Ne pas importer zod ici. */
export type FieldErrorCode = "required" | "tooShort" | "tooLong" | "email" | "phone" | "consent" | "invalid";
export type FormErrorCode = "rateLimited" | "spam" | "unavailable" | "server";

export const budgetKeys = ["lt5", "5-20", "20-50", "50-100", "gt100", "unknown"] as const;
export const leadKinds = ["quote", "contact"] as const;

export type LeadField = "name" | "phone" | "email" | "service" | "location" | "budget" | "message" | "consent";

export type LeadState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; fieldErrors?: Partial<Record<LeadField, FieldErrorCode>>; formError?: FormErrorCode };
