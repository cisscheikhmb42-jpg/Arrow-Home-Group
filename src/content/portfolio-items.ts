import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { placeholders, projects, type PortfolioCategory } from "./portfolio";

/** Element affiche dans le portfolio : un projet reel, ou un encadre « Photos a venir ». */
export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  caption: string;
  href?: string;
  image?: string;
  placeholder: boolean;
};

export function getPortfolioItems(locale: Locale, t: Dictionary): PortfolioItem[] {
  const real: PortfolioItem[] = projects.map((p) => ({
    id: p.slug,
    category: p.category,
    title: p.title[locale],
    caption: p.location?.[locale] ?? t.portfolio.categories[p.category],
    href: href(locale, "projects", `/${p.slug}`),
    image: p.cover,
    placeholder: false,
  }));
  const covered = new Set(real.map((r) => r.category));
  const upcoming: PortfolioItem[] = placeholders
    .filter((p) => !covered.has(p.category))
    .map((p) => ({
      id: p.id,
      category: p.category,
      title: t.portfolio.categories[p.category],
      caption: t.portfolio.illustrationCaption,
      placeholder: true,
    }));
  return [...real, ...upcoming];
}
