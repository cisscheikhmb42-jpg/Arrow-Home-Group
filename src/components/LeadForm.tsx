"use client";

import Link from "next/link";
import { useActionState, useEffect, useRef, useState } from "react";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { submitLead } from "@/app/actions/lead";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { budgetKeys, type LeadField, type LeadState } from "@/lib/leads/shared";

type Values = Record<"name" | "phone" | "email" | "service" | "location" | "budget" | "message", string> & { consent: boolean };
const empty: Values = { name: "", phone: "", email: "", service: "", location: "", budget: "", message: "", consent: false };
const initial: LeadState = { status: "idle" };

export default function LeadForm({
  kind,
  locale,
  t,
  services,
  defaultService = "",
  privacyHref,
}: {
  kind: "quote" | "contact";
  locale: Locale;
  t: Dictionary["form"];
  services: { slug: string; title: string }[];
  defaultService?: string;
  privacyHref: string;
}) {
  const [state, action, pending] = useActionState(submitLead, initial);
  const [values, setValues] = useState<Values>({ ...empty, service: defaultService });
  const [started, setStarted] = useState("");
  const summaryRef = useRef<HTMLDivElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const draftKey = `ah-draft-${kind}`;
  const isQuote = kind === "quote";

  // Restaure un brouillon (ex. après un changement de langue) et note l'heure d'affichage du formulaire.
  useEffect(() => {
    setStarted(String(Date.now()));
    try {
      const saved = sessionStorage.getItem(draftKey);
      if (saved) {
        const draft = { ...empty, ...JSON.parse(saved) } as Values;
        setValues({ ...draft, service: defaultService || draft.service });
      }
    } catch {}
  }, [draftKey, defaultService]);

  useEffect(() => {
    try {
      const { consent: _c, ...rest } = values;
      if (Object.values(rest).some(Boolean)) sessionStorage.setItem(draftKey, JSON.stringify(rest));
    } catch {}
  }, [values, draftKey]);

  useEffect(() => {
    if (state.status === "success") {
      try {
        sessionStorage.removeItem(draftKey);
      } catch {}
      setValues({ ...empty, service: defaultService });
      successRef.current?.focus();
    } else if (state.status === "error") {
      summaryRef.current?.focus();
    }
  }, [state, draftKey, defaultService]);

  const fieldErrors = state.status === "error" ? state.fieldErrors ?? {} : {};
  const formError = state.status === "error" ? state.formError : undefined;
  const err = (f: LeadField) => (fieldErrors[f] ? t.errors[fieldErrors[f]!] : undefined);
  const set = (k: keyof Values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setValues((v) => ({ ...v, [k]: e.target.type === "checkbox" ? (e.target as HTMLInputElement).checked : e.target.value }));

  if (state.status === "success") {
    return (
      <div ref={successRef} tabIndex={-1} role="status" className="border border-mist bg-white p-8 sm:p-12">
        <CheckCircle2 className="size-10 text-champagne-700" strokeWidth={1.25} aria-hidden />
        <h2 className="display mt-6 text-3xl text-graphite sm:text-4xl">{t.successTitle}</h2>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-stone">{t.successText}</p>
        <button type="button" onClick={() => window.location.reload()} className="btn btn-outline-dark mt-8">
          {t.newRequest}
        </button>
      </div>
    );
  }

  const label = (f: LeadField, text: string, required: boolean) => (
    <label htmlFor={`${kind}-${f}`} className="mb-2 block text-sm font-medium text-graphite">
      {text}
      {required ? (
        <span className="text-champagne-700" aria-hidden>
          {" "}*
        </span>
      ) : (
        <span className="font-normal text-stone"> ({t.optional})</span>
      )}
    </label>
  );
  const describe = (f: LeadField) => (fieldErrors[f] ? `${kind}-${f}-error` : undefined);
  const errorText = (f: LeadField) =>
    err(f) ? (
      <p id={`${kind}-${f}-error`} className="mt-2 text-sm text-[#b42318]">
        {err(f)}
      </p>
    ) : null;

  return (
    <form action={action} noValidate className="border border-mist bg-white p-6 sm:p-10">
      <input type="hidden" name="kind" value={kind} />
      <input type="hidden" name="locale" value={locale} />
      <input type="hidden" name="started" value={started} />
      {/* Piège à robots, invisible pour les visiteurs et ignoré par les lecteurs d'écran. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={`${kind}-website`}>{t.honeypot}</label>
        <input id={`${kind}-website`} type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </div>

      <div
        ref={summaryRef}
        tabIndex={-1}
        role="alert"
        className={formError || Object.keys(fieldErrors).length ? "mb-8 border-l-2 border-[#b42318] bg-[#fef3f2] p-4 text-sm text-[#7a271a]" : "sr-only"}
      >
        {formError ? t.errors[formError] : Object.keys(fieldErrors).length ? t.errorSummary : ""}
      </div>

      <p className="mb-6 text-sm text-stone">{t.requiredNote}</p>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          {label("name", t.fields.name, true)}
          <input id={`${kind}-name`} name="name" className="field" autoComplete="name" maxLength={120} required
            placeholder={t.placeholders.name} value={values.name} onChange={set("name")}
            aria-invalid={!!fieldErrors.name} aria-describedby={describe("name")} />
          {errorText("name")}
        </div>
        <div>
          {label("phone", t.fields.phone, true)}
          <input id={`${kind}-phone`} name="phone" type="tel" inputMode="tel" className="field" autoComplete="tel" maxLength={25} required
            placeholder={t.placeholders.phone} value={values.phone} onChange={set("phone")}
            aria-invalid={!!fieldErrors.phone} aria-describedby={describe("phone")} />
          {errorText("phone")}
        </div>
        <div>
          {label("email", t.fields.email, false)}
          <input id={`${kind}-email`} name="email" type="email" inputMode="email" className="field" autoComplete="email" maxLength={160}
            placeholder={t.placeholders.email} value={values.email} onChange={set("email")}
            aria-invalid={!!fieldErrors.email} aria-describedby={describe("email")} />
          {errorText("email")}
        </div>

        {isQuote && (
          <>
            <div>
              {label("service", t.fields.service, true)}
              <select id={`${kind}-service`} name="service" className="field" required value={values.service} onChange={set("service")}
                aria-invalid={!!fieldErrors.service} aria-describedby={describe("service")}>
                <option value="">{t.selectService}</option>
                {services.map((s) => (
                  <option key={s.slug} value={s.slug}>{s.title}</option>
                ))}
                <option value="other">{t.otherService}</option>
              </select>
              {errorText("service")}
            </div>
            <div>
              {label("location", t.fields.location, false)}
              <input id={`${kind}-location`} name="location" className="field" autoComplete="address-level2" maxLength={160}
                placeholder={t.placeholders.location} value={values.location} onChange={set("location")}
                aria-invalid={!!fieldErrors.location} aria-describedby={describe("location")} />
              {errorText("location")}
            </div>
            <div className="sm:col-span-2">
              {label("budget", t.fields.budget, false)}
              <select id={`${kind}-budget`} name="budget" className="field" value={values.budget} onChange={set("budget")}
                aria-invalid={!!fieldErrors.budget} aria-describedby={describe("budget")}>
                <option value="">{t.selectBudget}</option>
                {budgetKeys.map((b) => (
                  <option key={b} value={b}>{t.budgets[b]}</option>
                ))}
              </select>
              {errorText("budget")}
            </div>
          </>
        )}

        <div className="sm:col-span-2">
          {label("message", isQuote ? t.fields.message : t.fields.contactMessage, true)}
          <textarea id={`${kind}-message`} name="message" rows={6} className="field min-h-40 resize-y" maxLength={3000} required
            placeholder={t.placeholders.message} value={values.message} onChange={set("message")}
            aria-invalid={!!fieldErrors.message} aria-describedby={describe("message")} />
          {errorText("message")}
        </div>

        <div className="sm:col-span-2">
          <div className="flex items-start gap-3">
            <input id={`${kind}-consent`} name="consent" type="checkbox" required checked={values.consent} onChange={set("consent")}
              className="mt-1 size-5 shrink-0 accent-graphite" aria-invalid={!!fieldErrors.consent} aria-describedby={describe("consent")} />
            <label htmlFor={`${kind}-consent`} className="text-sm leading-relaxed text-anthracite">
              {t.fields.consent}{" "}
              <span className="text-champagne-700" aria-hidden>*</span>{" "}
              <Link href={privacyHref} className="underline decoration-champagne underline-offset-4 hover:text-graphite">
                ({t.privacyLink})
              </Link>
            </label>
          </div>
          {errorText("consent")}
        </div>
      </div>

      <button type="submit" disabled={pending} className="btn btn-dark mt-10 w-full disabled:opacity-60 sm:w-auto">
        {pending ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden />
            {t.sending}
          </>
        ) : (
          <>
            {isQuote ? t.submitQuote : t.submitContact}
            <ArrowRight className="arrow size-4" aria-hidden />
          </>
        )}
      </button>
    </form>
  );
}
