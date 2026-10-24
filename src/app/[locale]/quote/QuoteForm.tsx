"use client";

import { useSearchParams } from "next/navigation";
import LeadForm from "@/components/LeadForm";
import { resolveServiceSlug } from "@/content/services";

/** Pré-remplit la prestation à partir de ?service= (y compris les anciens identifiants du site). */
export default function QuoteForm(props: Omit<React.ComponentProps<typeof LeadForm>, "kind" | "defaultService">) {
  const service = resolveServiceSlug(useSearchParams().get("service"));
  return <LeadForm key={service} kind="quote" defaultService={service} {...props} />;
}
