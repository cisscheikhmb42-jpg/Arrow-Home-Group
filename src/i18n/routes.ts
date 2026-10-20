import { locales, type Locale } from "./config";

/**
 * Pages du site. La clé est aussi le nom du dossier interne dans `src/app/[locale]/`.
 * Les URL publiques sont traduites ; le middleware réécrit l'URL publique vers le dossier interne.
 */
export const routes = {
  home: { fr: "", en: "", zh: "" },
  services: { fr: "services", en: "services", zh: "services" },
  projects: { fr: "realisations", en: "projects", zh: "projects" },
  about: { fr: "a-propos", en: "about", zh: "about" },
  process: { fr: "notre-methode", en: "our-process", zh: "process" },
  contact: { fr: "contact", en: "contact", zh: "contact" },
  quote: { fr: "devis", en: "quote", zh: "quote" },
  "real-estate": { fr: "immobilier", en: "real-estate", zh: "real-estate" },
  legal: { fr: "mentions-legales", en: "legal-notice", zh: "legal" },
  privacy: { fr: "confidentialite", en: "privacy-policy", zh: "privacy" },
} as const satisfies Record<string, Record<Locale, string>>;

export type RouteKey = keyof typeof routes;
const routeKeys = Object.keys(routes) as RouteKey[];

/** Chemin public d'une page dans une langue, ex. href("en", "projects") → "/en/projects". */
export function href(locale: Locale, key: RouteKey, rest = ""): string {
  const slug = routes[key][locale];
  return `/${locale}${slug ? `/${slug}` : ""}${rest}`;
}

/** Retrouve la page à partir du premier segment public (ex. "realisations" en français). */
export function keyFromSlug(locale: Locale, slug: string): RouteKey | undefined {
  return routeKeys.find((k) => k !== "home" && routes[k][locale] === slug);
}

/** Retrouve la page à partir du nom de dossier interne (utile pour corriger une URL non traduite). */
export function keyFromInternal(segment: string): RouteKey | undefined {
  return routeKeys.find((k) => k !== "home" && k === segment);
}

/**
 * Équivalent d'un chemin public dans une autre langue.
 * "/fr/realisations" → "/en/projects" ; "/fr" → "/zh".
 */
export function switchLocalePath(pathname: string, to: Locale): string {
  const parts = pathname.split("/").filter(Boolean);
  const from = parts[0] as Locale;
  if (!locales.includes(from)) return `/${to}`;
  const [, seg, ...rest] = parts;
  if (!seg) return `/${to}`;
  const key = keyFromSlug(from, seg);
  if (!key) return `/${to}`;
  return href(to, key, rest.length ? `/${rest.join("/")}` : "");
}

export const allRouteKeys = routeKeys;
