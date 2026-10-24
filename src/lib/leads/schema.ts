import { z } from "zod";
import { locales } from "@/i18n/config";
import { serviceSlugs } from "@/content/services";

import { budgetKeys, leadKinds } from "./shared";

export type { FieldErrorCode, FormErrorCode, LeadField, LeadState } from "./shared";

const text = (min: number, max: number) =>
  z
    .string()
    .trim()
    .min(1, { message: "required" })
    .min(min, { message: "tooShort" })
    .max(max, { message: "tooLong" });

const optional = (max: number) =>
  z
    .string()
    .trim()
    .max(max, { message: "tooLong" })
    .transform((v) => v || undefined);

const phone = z
  .string()
  .trim()
  .min(1, { message: "required" })
  .max(25, { message: "phone" })
  .refine((v) => /^\+?[0-9 ().-]+$/.test(v) && (v.match(/\d/g)?.length ?? 0) >= 7 && (v.match(/\d/g)?.length ?? 0) <= 15, {
    message: "phone",
  });

export const leadSchema = z
  .object({
    kind: z.enum(leadKinds, { message: "invalid" }),
    locale: z.enum(locales, { message: "invalid" }),
    name: text(2, 120),
    phone,
    email: z
      .string()
      .trim()
      .max(160, { message: "tooLong" })
      .refine((v) => v === "" || z.email().safeParse(v).success, { message: "email" })
      .transform((v) => v.toLowerCase() || undefined),
    service: z
      .string()
      .trim()
      .refine((v) => v === "" || v === "other" || (serviceSlugs as readonly string[]).includes(v), { message: "invalid" })
      .transform((v) => v || undefined),
    location: optional(160),
    budget: z
      .string()
      .trim()
      .refine((v) => v === "" || (budgetKeys as readonly string[]).includes(v), { message: "invalid" })
      .transform((v) => v || undefined),
    message: text(10, 3000),
    consent: z.literal("on", { message: "consent" }),
  })
  .superRefine((v, ctx) => {
    if (v.kind === "quote" && !v.service) ctx.addIssue({ code: "custom", path: ["service"], message: "required" });
  });

export type Lead = z.infer<typeof leadSchema>;
