"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Property } from "@/content/trust";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fill } from "@/i18n/fill";

/** Liste filtrable des biens (affichée dès qu'un bien réel est ajouté dans src/content/trust.ts). */
export default function PropertyList({ items, locale, t, quoteHref }: { items: Property[]; locale: Locale; t: Dictionary["realEstate"]; quoteHref: string }) {
  const [deal, setDeal] = useState("");
  const [type, setType] = useState("");
  const [city, setCity] = useState("");
  const cities = useMemo(() => [...new Set(items.map((p) => p.city))].sort(), [items]);
  const shown = items.filter((p) => (!deal || p.deal === deal) && (!type || p.type === type) && (!city || p.city === city));
  const f = t.filters;
  const fmt = new Intl.NumberFormat(locale === "zh" ? "zh-CN" : locale === "en" ? "en-US" : "fr-FR");

  const select = (id: string, label: string, value: string, onChange: (v: string) => void, options: [string, string][]) => (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-semibold text-graphite">{label}</label>
      <select id={id} className="field" value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="">{f.all}</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </div>
  );

  return (
    <div>
      <fieldset className="grid gap-4 sm:grid-cols-3">
        <legend className="sr-only">{f.label}</legend>
        {select("re-deal", f.deal, deal, setDeal, [["sale", f.sale], ["rent", f.rent]])}
        {select("re-type", f.type, type, setType, [["land", f.land], ["villa", f.villa], ["apartment", f.apartment], ["commercial", f.commercial]])}
        {select("re-city", f.city, city, setCity, cities.map((c) => [c, c]))}
      </fieldset>
      {shown.length === 0 ? (
        <p className="mt-12 text-stone" aria-live="polite">{t.noResults}</p>
      ) : (
        <ul className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {shown.map((p) => (
            <li key={p.id} className="border border-mist bg-white">
              <div className="relative aspect-[4/3] bg-tint">
                {p.image ? <Image src={p.image} alt={p.title[locale]} fill sizes="(min-width:1024px) 33vw, 100vw" className="object-cover" /> : null}
                <span className="absolute top-4 left-4 bg-graphite px-3 py-1.5 text-xs font-semibold tracking-[0.15em] text-white uppercase">{f[p.deal]}</span>
              </div>
              <div className="p-6">
                <p className="text-xs font-semibold tracking-[0.18em] text-stone uppercase">{f[p.type]} · {p.city}</p>
                <h3 className="display mt-2 text-2xl text-graphite">{p.title[locale]}</h3>
                <p className="mt-3 text-sm text-stone">
                  {[p.areaM2 && fill(t.area, { n: p.areaM2 }), p.bedrooms && fill(t.bedrooms, { n: p.bedrooms })].filter(Boolean).join(" · ")}
                </p>
                <p className="mt-4 font-semibold text-graphite">{p.priceXof ? `${fmt.format(p.priceXof)} FCFA` : t.priceOnRequest}</p>
                <Link href={`${quoteHref}?service=immobilier`} className="link-line mt-5 text-graphite">{t.enquire}</Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
