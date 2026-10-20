import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { illustrations, projects, type PortfolioCategory } from "./portfolio";

/** Élément affiché dans le portfolio : un projet réel, ou une illustration clairement signalée. */
export type PortfolioItem = {
  id: string;
  category: PortfolioCategory;
  title: string;
  caption: string;
  href?: string;
  image?: string;
  variant?: number;
  illustration: boolean;
};

export function getPortfolioItems(locale: Locale, t: Dictionary): PortfolioItem[] {
  const real: PortfolioItem[] = projects.map((p) => ({
    id: p.slug,
    category: p.category,
    title: p.title[locale],
    caption: p.location?.[locale] ?? t.portfolio.categories[p.category],
    href: href(locale, "projects", `/${p.slug}`),
    image: p.cover,
    illustration: false,
  }));
  const covered = new Set(real.map((r) => r.category));
  const demo: PortfolioItem[] = illustrations
    .filter((i) => !covered.has(i.category))
    .map((i) => ({
      id: i.id,
      category: i.category,
      title: t.portfolio.categories[i.category],
      caption: t.portfolio.illustrationCaption,
      variant: i.variant,
      illustration: true,
    }));
  return [...real, ...demo];
}
