import type { Metadata } from "next";
import { defaultLocale, htmlLang, locales, ogLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n";
import { href, type RouteKey } from "@/i18n/routes";
import { site } from "./site";

/** Adresses des versions linguistiques d'une page (balises hreflang + sitemap). */
export function languageAlternates(key: RouteKey, rest = ""): Record<string, string> {
  const out: Record<string, string> = {};
  for (const l of locales) out[htmlLang[l]] = `${site.url}${href(l, key, rest)}`;
  out["x-default"] = `${site.url}${href(defaultLocale, key, rest)}`;
  return out;
}

export function pageMetadata(
  locale: Locale,
  key: RouteKey,
  { title, description, rest = "" }: { title?: string; description?: string; rest?: string } = {},
): Metadata {
  const t = getDictionary(locale);
  const url = `${site.url}${href(locale, key, rest)}`;
  const fullTitle = title ? `${title} | ${site.legalName}` : t.meta.siteTitle;
  const desc = description ?? t.meta.siteDescription;
  return {
    title: title ? { absolute: fullTitle } : { absolute: t.meta.siteTitle },
    description: desc,
    alternates: { canonical: url, languages: languageAlternates(key, rest) },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description: desc,
      siteName: site.legalName,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      images: [{ url: "/brand/logo.png", width: 320, height: 190, alt: site.legalName }],
    },
    twitter: { card: "summary", title: fullTitle, description: desc },
  };
}
