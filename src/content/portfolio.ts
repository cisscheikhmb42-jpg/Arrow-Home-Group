import type { ServiceSlug } from "./services";

/** Catégories du portfolio (les libellés traduits sont dans les dictionnaires, `portfolio.categories`). */
export const portfolioCategories = [
  "all",
  "construction",
  "renovation",
  "amenagement",
  "aluminium",
  "bois",
  "immobilier",
  "decoration",
] as const;
export type PortfolioCategory = Exclude<(typeof portfolioCategories)[number], "all">;

export const isPortfolioCategory = (v: unknown): v is PortfolioCategory =>
  typeof v === "string" && v !== "all" && (portfolioCategories as readonly string[]).includes(v);

/** Lien entre une catégorie du portfolio et l'expertise correspondante (pour le formulaire de devis). */
export const categoryService: Record<PortfolioCategory, ServiceSlug> = {
  construction: "construction",
  renovation: "renovation",
  amenagement: "amenagement-finition",
  aluminium: "aluminium",
  bois: "bois",
  immobilier: "immobilier",
  decoration: "decoration",
};

type Localized = { fr: string; en: string; zh: string };

/**
 * RÉALISATIONS RÉELLES D'ARROW HOME GROUP.
 * Ne publier ici que des projets vérifiés, avec des photos dont l'entreprise détient les droits.
 * Chaque projet ajouté obtient automatiquement sa fiche : /fr/realisations/<slug>, /en/projects/<slug>, /zh/projects/<slug>.
 *
 * Exemple :
 * {
 *   slug: "villa-ngor",
 *   category: "construction",
 *   cover: "/photos/projets/villa-ngor/01.jpg",
 *   gallery: ["/photos/projets/villa-ngor/02.jpg"],
 *   title: { fr: "…", en: "…", zh: "…" },
 *   summary: { fr: "…", en: "…", zh: "…" },
 *   location: { fr: "Dakar", en: "Dakar", zh: "达喀尔" },
 *   services: [{ fr: "Gros œuvre", en: "Structural work", zh: "主体结构" }],
 *   highlights: [],
 * }
 */
export type Project = {
  slug: string;
  category: PortfolioCategory;
  cover: string;
  gallery: string[];
  title: Localized;
  summary: Localized;
  location?: Localized;
  services: Localized[];
  highlights: Localized[];
};

export const projects: Project[] = [];

/**
 * VISUELS D'ILLUSTRATION (en attendant les photos de chantiers).
 * Ce sont des dessins au trait, présentés comme tels sur le site : ils ne sont jamais attribués à un projet réel.
 * Pour les remplacer, publier les vrais projets dans `projects` ci-dessus : les illustrations disparaissent alors
 * automatiquement des catégories qui ont au moins un projet réel.
 */
export const illustrations: { id: string; category: PortfolioCategory; variant: number }[] = [
  { id: "construction-1", category: "construction", variant: 0 },
  { id: "renovation-1", category: "renovation", variant: 6 },
  { id: "amenagement-1", category: "amenagement", variant: 1 },
  { id: "aluminium-1", category: "aluminium", variant: 4 },
  { id: "bois-1", category: "bois", variant: 5 },
  { id: "immobilier-1", category: "immobilier", variant: 2 },
  { id: "decoration-1", category: "decoration", variant: 7 },
];
