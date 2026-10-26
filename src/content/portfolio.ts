import type { ServiceSlug } from "./services";

/** Catégories du portfolio (les libellés traduits sont dans les dictionnaires, `portfolio.categories`). */
export const portfolioCategories = [
  "all",
  "construction",
  "renovation",
  "amenagement",
  "aluminium",
  "bois",
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
  decoration: "decoration",
};

type Localized = { fr: string; en: string; zh: string };

/**
 * RÉALISATIONS RÉELLES D'ARROW HOME GROUP.
 * Ne publier ici que des projets vérifiés, avec des photos dont l'entreprise détient les droits.
 * Sans `cover`, la carte affiche un encadré aux couleurs de la marque avec le domaine d'intervention (non cliquable).
 * AJOUTER UNE PHOTO : déposer le fichier dans public/photos/projets/ puis renseigner `cover: "/photos/projets/<fichier>.jpg"`.
 * Dès qu'une photo est renseignée, la carte devient cliquable et la fiche est créée :
 * /fr/realisations/<slug>, /en/projects/<slug>, /zh/projects/<slug>.
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
  cover?: string;
  gallery: string[];
  title: Localized;
  summary: Localized;
  location?: Localized;
  services: Localized[];
  highlights: Localized[];
};

export const projects: Project[] = [
  {
    slug: "stade-iba-mar-diop",
    category: "renovation",
    gallery: [],
    title: { fr: "Stade Iba Mar Diop, Dakar", en: "Iba Mar Diop Stadium, Dakar", zh: "达喀尔 Iba Mar Diop 体育场" },
    summary: {
      fr: "Participation à la rénovation du stade, en préparation des Jeux Olympiques de la Jeunesse Dakar 2026.",
      en: "Participation in the renovation of the stadium, in preparation for the Dakar 2026 Youth Olympic Games.",
      zh: "参与体育场翻新工程，为 2026 年达喀尔青年奥运会做准备。",
    },
    services: [],
    highlights: [],
  },
  {
    slug: "agence-ecobank-thiaroye",
    category: "construction",
    gallery: [],
    title: { fr: "Agence Ecobank Thiaroye", en: "Ecobank Thiaroye Branch", zh: "Ecobank 银行 Thiaroye 支行" },
    summary: {
      fr: "Construction complète de l'agence : gros œuvre, menuiserie aluminium et finitions.",
      en: "Complete construction of the branch: structural work, aluminium joinery and finishing.",
      zh: "支行整体建造：主体结构、铝制门窗及精装修。",
    },
    services: [],
    highlights: [],
  },
  {
    slug: "axil-hotel-dakar",
    category: "aluminium",
    gallery: [],
    title: { fr: "Axil Hôtel, Dakar", en: "Axil Hotel, Dakar", zh: "达喀尔 Axil 酒店" },
    summary: {
      fr: "Réalisation de l'ensemble de la menuiserie aluminium de l'hôtel.",
      en: "All of the hotel's aluminium joinery.",
      zh: "承接酒店全部铝制门窗工程。",
    },
    services: [],
    highlights: [],
  },
  {
    slug: "p703-villa-sangalkam",
    category: "amenagement",
    gallery: [],
    title: { fr: "P703 Villa Sangalkam", en: "P703 Villa Sangalkam", zh: "P703 Villa Sangalkam 住宅区" },
    summary: {
      fr: "Cité résidentielle de villas et d'appartements haut confort : second œuvre, finitions et ameublement, livrée clé en main.",
      en: "Residential estate of high-comfort villas and apartments: secondary works, finishing and furnishing, delivered turnkey.",
      zh: "高舒适度别墅与公寓住宅区：二次装修、精装修及家具配置，交钥匙交付。",
    },
    services: [],
    highlights: [],
  },
];

/** Réalisations ayant une photo : seules celles-ci ont une fiche détaillée (et figurent dans le sitemap). */
export const publishedProjects = projects.filter((p): p is Project & { cover: string } => Boolean(p.cover));

/**
 * Encadrés « Photos à venir » par catégorie (aucun dessin). Vide depuis l'ajout des références réelles :
 * seules les réalisations de `projects` sont affichées.
 */
export const placeholders: { id: string; category: PortfolioCategory }[] = [];
