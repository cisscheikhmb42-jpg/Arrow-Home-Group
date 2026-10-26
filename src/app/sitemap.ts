import type { MetadataRoute } from "next";
import { publishedProjects as projects } from "@/content/portfolio";
import { locales } from "@/i18n/config";
import { allRouteKeys, href, type RouteKey } from "@/i18n/routes";
import { languageAlternates } from "@/lib/seo";
import { site } from "@/lib/site";

/** Sitemap multilingue : chaque page est déclarée dans les 3 langues, avec ses équivalents (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const entries: { key: RouteKey; rest?: string; priority: number }[] = [
    ...allRouteKeys.map((key) => ({
      key,
      priority: key === "home" ? 1 : key === "legal" || key === "privacy" ? 0.3 : 0.8,
    })),
    ...projects.map((p) => ({ key: "projects" as RouteKey, rest: `/${p.slug}`, priority: 0.6 })),
  ];
  return entries.flatMap(({ key, rest = "", priority }) =>
    locales.map((l) => ({
      url: `${site.url}${href(l, key, rest)}`,
      changeFrequency: "monthly" as const,
      priority,
      alternates: { languages: languageAlternates(key, rest) },
    })),
  );
}
