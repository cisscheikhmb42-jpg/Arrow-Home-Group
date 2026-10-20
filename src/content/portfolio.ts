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
 * CATEGORIES AFFICHEES EN ATTENDANT LES PHOTOS : un encadre sobre « Photos a venir » par categorie (aucun dessin).
 * Des qu'un projet reel est ajoute dans `projects`, l'encadre de sa categorie est remplace automatiquement.
 */
export const placeholders: { id: string; category: PortfolioCategory }[] = [
  { id: "construction", category: "construction" },
  { id: "renovation", category: "renovation" },
  { id: "amenagement", category: "amenagement" },
  { id: "aluminium", category: "aluminium" },
  { id: "bois", category: "bois" },
  { id: "immobilier", category: "immobilier" },
  { id: "decoration", category: "decoration" },
];
