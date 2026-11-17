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
 *   coverAlt: { fr: "…", en: "…", zh: "…" },
 *   gallery: [{ src: "/photos/projets/villa-ngor/02.jpg", alt: { fr: "…", en: "…", zh: "…" } }],
 *   title: { fr: "…", en: "…", zh: "…" },
 *   summary: { fr: "…", en: "…", zh: "…" },
 *   location: { fr: "Dakar", en: "Dakar", zh: "达喀尔" },
 *   services: [{ fr: "Gros œuvre", en: "Structural work", zh: "主体结构" }],
 *   highlights: [],
 * }
 */
export type ProjectPhoto = { src: string; alt: Localized };

export type Project = {
  slug: string;
  category: PortfolioCategory;
  cover?: string;
  /** Description de la photo principale (accessibilité et référencement). */
  coverAlt?: Localized;
  /** Cadrage de la photo principale quand elle est recadrée (CSS object-position), ex. "70% 60%". */
  coverPosition?: string;
  /** Photos complémentaires, dans l'ordre d'affichage, chacune avec sa légende. */
  gallery: ProjectPhoto[];
  /** Titre de la galerie en chapitres (par défaut : « Le chantier en images »). */
  galleryTitle?: Localized;
  /** Phrase d'introduction de la galerie en chapitres. */
  galleryIntro?: Localized;
  /** Galerie organisée en chapitres (étapes du chantier), affichée à la place de `gallery`. */
  chapters?: { title: Localized; photos: ProjectPhoto[] }[];
  /** Comparaison avant / après, affichée en tête de la galerie. */
  beforeAfter?: { before: ProjectPhoto; after: ProjectPhoto };
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
    cover: "/photos/projets/stade-iba-mar-diop/couverture-tribune.jpg",
    coverAlt: {
      fr: "La nouvelle tribune principale du stade Iba Mar Diop, vue depuis la pelouse",
      en: "The new main stand of Iba Mar Diop Stadium, seen from the pitch",
      zh: "从草坪看 Iba Mar Diop 体育场新建主看台",
    },
    coverPosition: "50% 62%",
    gallery: [],
    galleryIntro: {
      fr: "De la démolition de l'ancienne tribune jusqu'au stade achevé, étape par étape.",
      en: "From the demolition of the old stand to the finished stadium, step by step.",
      zh: "从拆除旧看台到体育场竣工，逐步呈现。",
    },
    beforeAfter: {
      before: {
        src: "/photos/projets/stade-iba-mar-diop/avant-demolition.jpg",
        alt: {
          fr: "Avant : démolition de l'ancienne tribune",
          en: "Before: demolition of the old stand",
          zh: "改造前：拆除旧看台",
        },
      },
      after: {
        src: "/photos/projets/stade-iba-mar-diop/apres-complexe-acheve.jpg",
        alt: {
          fr: "Après : le complexe achevé, vu du ciel",
          en: "After: the completed complex from above",
          zh: "改造后：俯瞰竣工后的综合体",
        },
      },
    },
    chapters: [
      {
        title: { fr: "Démolition de l'ancienne tribune", en: "Demolition of the old stand", zh: "拆除旧看台" },
        photos: [
          {
            src: "/photos/projets/stade-iba-mar-diop/01-demolition-1.jpg",
            alt: {
              fr: "Démolition de l'ancienne tribune",
              en: "Demolition of the old stand",
              zh: "拆除旧看台",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/01-demolition-2.jpg",
            alt: {
              fr: "Les derniers éléments de l'ancienne tribune",
              en: "The last sections of the old stand",
              zh: "旧看台的最后部分",
            },
          },
        ],
      },
      {
        title: { fr: "Fondations et gros œuvre", en: "Foundations and structural work", zh: "基础与主体结构" },
        photos: [
          {
            src: "/photos/projets/stade-iba-mar-diop/02-gros-oeuvre-1.jpg",
            alt: {
              fr: "Fondations de la nouvelle tribune",
              en: "Foundations of the new stand",
              zh: "新看台基础施工",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/02-gros-oeuvre-2.jpg",
            alt: {
              fr: "Ferraillage d'une dalle par les équipes",
              en: "Teams placing slab reinforcement",
              zh: "施工人员绑扎楼板钢筋",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/02-gros-oeuvre-3.jpg",
            alt: {
              fr: "Vue du ciel : le site pendant les fondations",
              en: "Overhead view: the site during foundation works",
              zh: "俯瞰：基础施工阶段的场地",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/02-gros-oeuvre-4.jpg",
            alt: {
              fr: "Élévation de la structure en béton de la tribune",
              en: "The stand's concrete structure rising",
              zh: "看台混凝土结构施工",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/02-gros-oeuvre-5.jpg",
            alt: {
              fr: "Vue du ciel : structure de la tribune et du bâtiment voisin",
              en: "Overhead view: structure of the stand and the adjoining building",
              zh: "俯瞰：看台与相邻建筑结构",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/02-gros-oeuvre-6.jpg",
            alt: {
              fr: "Vue aérienne : construction des tribunes",
              en: "Aerial view: construction of the stands",
              zh: "航拍：看台施工",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/02-gros-oeuvre-7.jpg",
            alt: {
              fr: "Escaliers de la tribune en cours de réalisation",
              en: "Stand staircases under construction",
              zh: "看台楼梯施工",
            },
          },
        ],
      },
      {
        title: { fr: "Charpente métallique", en: "Steel structure", zh: "钢结构" },
        photos: [
          {
            src: "/photos/projets/stade-iba-mar-diop/03-charpente-1.jpg",
            alt: {
              fr: "Vue aérienne : montage des charpentes métalliques",
              en: "Aerial view: steel frames going up",
              zh: "航拍：钢结构安装",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/03-charpente-2.jpg",
            alt: {
              fr: "Vue aérienne : charpente de la tribune principale",
              en: "Aerial view: main stand roof structure",
              zh: "航拍：主看台屋顶钢结构",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/03-charpente-3.jpg",
            alt: {
              fr: "Détail de la charpente métallique",
              en: "Close-up of the steel structure",
              zh: "钢结构细节",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/03-charpente-4.jpg",
            alt: {
              fr: "Vue aérienne : couverture de la tribune et préparation de l'aire de jeu",
              en: "Aerial view: stand roofing and preparation of the playing area",
              zh: "航拍：看台屋面与比赛场地整备",
            },
          },
        ],
      },
      {
        title: { fr: "Terrains et pistes", en: "Pitches and tracks", zh: "场地与跑道" },
        photos: [
          {
            src: "/photos/projets/stade-iba-mar-diop/04-terrains-1.jpg",
            alt: {
              fr: "Vue du ciel : tribune avancée et terrassement du second terrain",
              en: "Overhead view: stand well advanced and earthworks for the second pitch",
              zh: "俯瞰：看台主体基本完成，第二块场地土方施工",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/04-terrains-2.jpg",
            alt: {
              fr: "Vue du ciel : préparation de la plateforme du terrain et de la piste",
              en: "Overhead view: pitch and track base preparation",
              zh: "俯瞰：场地与跑道基层施工",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/04-terrains-3.jpg",
            alt: {
              fr: "Vue du ciel : aire de jeu et piste en cours de revêtement",
              en: "Overhead view: playing area and track being surfaced",
              zh: "俯瞰：比赛场地与跑道面层施工",
            },
          },
        ],
      },
      {
        title: { fr: "Bâtiments du complexe", en: "Complex buildings", zh: "场馆配套建筑" },
        photos: [
          {
            src: "/photos/projets/stade-iba-mar-diop/05-batiments-1.jpg",
            alt: {
              fr: "Bâtiment en construction le long de la route",
              en: "Building under construction along the road",
              zh: "沿路建筑施工",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/05-batiments-2.jpg",
            alt: {
              fr: "Vue aérienne : dalle de toiture d'un bâtiment",
              en: "Aerial view: a building's roof slab",
              zh: "航拍：建筑屋面板",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/05-batiments-3.jpg",
            alt: {
              fr: "Élévation des murs en briques",
              en: "Brick walls going up",
              zh: "砖墙砌筑",
            },
          },
        ],
      },
      {
        title: { fr: "Second œuvre intérieur", en: "Interior fit-out", zh: "室内装修" },
        photos: [
          {
            src: "/photos/projets/stade-iba-mar-diop/06-interieur-1.jpg",
            alt: {
              fr: "Couloir : ossature du faux plafond et réseaux",
              en: "Corridor: suspended-ceiling frame and services",
              zh: "走廊：吊顶龙骨与管线",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/06-interieur-2.jpg",
            alt: {
              fr: "Ossature métallique du faux plafond et passage des câbles",
              en: "Metal suspended-ceiling frame and cable runs",
              zh: "吊顶金属龙骨与线缆敷设",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/06-interieur-3.jpg",
            alt: {
              fr: "Pose du faux plafond acoustique perforé",
              en: "Installing the perforated acoustic ceiling",
              zh: "安装穿孔吸音吊顶",
            },
          },
        ],
      },
      {
        title: { fr: "Le stade achevé", en: "The finished stadium", zh: "竣工效果" },
        photos: [
          {
            src: "/photos/projets/stade-iba-mar-diop/07-acheve-1.jpg",
            alt: {
              fr: "La piste d'athlétisme et la tribune principale",
              en: "The athletics track and main stand",
              zh: "田径跑道与主看台",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/07-acheve-2.jpg",
            alt: {
              fr: "La tribune principale et les mâts de drapeaux",
              en: "The main stand and flagpoles",
              zh: "主看台与旗杆",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/07-acheve-3.jpg",
            alt: {
              fr: "Les façades à lames de la salle et de la tribune",
              en: "The slatted façades of the hall and the stand",
              zh: "场馆与看台的格栅立面",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/07-acheve-4.jpg",
            alt: {
              fr: "Façade en briques et panneaux ajourés",
              en: "Brick façade with perforated panels",
              zh: "砖砌立面与镂空面板",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/07-acheve-5.jpg",
            alt: {
              fr: "Bâtiment achevé et équipements techniques en toiture",
              en: "Completed building with rooftop technical equipment",
              zh: "竣工建筑及屋顶设备",
            },
          },
          {
            src: "/photos/projets/stade-iba-mar-diop/07-acheve-6.jpg",
            alt: {
              fr: "Bâtiment achevé en bordure du stade",
              en: "Completed building alongside the stadium",
              zh: "体育场旁的竣工建筑",
            },
          },
        ],
      },
    ],
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
    cover: "/photos/projets/agence-ecobank-thiaroye/facade.jpg",
    coverAlt: {
      fr: "Façade de l'agence Ecobank de Thiaroye",
      en: "Façade of the Ecobank Thiaroye branch",
      zh: "Ecobank 银行 Thiaroye 支行外立面",
    },
    coverPosition: "50% 30%",
    gallery: [],
    galleryTitle: { fr: "L'agence en images", en: "The branch in pictures", zh: "支行图集" },
    galleryIntro: {
      fr: "L'agence livrée : accueil, mezzanine, bureaux et salle de réunion.",
      en: "The completed branch: reception, mezzanine, offices and meeting room.",
      zh: "竣工后的支行：接待区、夹层、办公室与会议室。",
    },
    chapters: [
      {
        title: { fr: "Accueil et espace clientèle", en: "Reception and customer area", zh: "接待与客户区" },
        photos: [
          {
            src: "/photos/projets/agence-ecobank-thiaroye/01-accueil-1.jpg",
            alt: {
              fr: "Hall d'accueil et escalier hélicoïdal",
              en: "Entrance hall and spiral staircase",
              zh: "接待大厅与旋转楼梯",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/01-accueil-2.jpg",
            alt: {
              fr: "Banque d'accueil et espace d'attente",
              en: "Reception desk and waiting area",
              zh: "接待台与等候区",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/01-accueil-3.jpg",
            alt: {
              fr: "Postes de conseillers et cloisons vitrées",
              en: "Advisor desks and glass partitions",
              zh: "客户经理工位与玻璃隔断",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/01-accueil-4.jpg",
            alt: {
              fr: "Espace caisses",
              en: "Teller area",
              zh: "柜台区",
            },
          },
        ],
      },
      {
        title: { fr: "Mezzanine et espaces ouverts", en: "Mezzanine and open spaces", zh: "夹层与开放空间" },
        photos: [
          {
            src: "/photos/projets/agence-ecobank-thiaroye/02-mezzanine-1.jpg",
            alt: {
              fr: "Vue depuis la mezzanine sur le hall",
              en: "View of the hall from the mezzanine",
              zh: "从夹层俯瞰大厅",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/02-mezzanine-2.jpg",
            alt: {
              fr: "Mezzanine et garde-corps en verre",
              en: "Mezzanine with glass balustrade",
              zh: "夹层与玻璃栏杆",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/02-mezzanine-3.jpg",
            alt: {
              fr: "Coursive végétalisée autour de la trémie",
              en: "Planted walkway around the open void",
              zh: "环绕中庭的绿植走廊",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/02-mezzanine-4.jpg",
            alt: {
              fr: "Coursive et grandes baies vitrées",
              en: "Walkway and large windows",
              zh: "走廊与大面积窗户",
            },
          },
        ],
      },
      {
        title: { fr: "Bureaux et salle de réunion", en: "Offices and meeting room", zh: "办公室与会议室" },
        photos: [
          {
            src: "/photos/projets/agence-ecobank-thiaroye/03-bureaux-1.jpg",
            alt: {
              fr: "Salle de réunion",
              en: "Meeting room",
              zh: "会议室",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/03-bureaux-2.jpg",
            alt: {
              fr: "Bureaux cloisonnés en aluminium et verre",
              en: "Aluminium and glass partitioned offices",
              zh: "铝合金玻璃隔断办公室",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/03-bureaux-3.jpg",
            alt: {
              fr: "Bureau individuel derrière une cloison vitrée",
              en: "Private office behind a glass partition",
              zh: "玻璃隔断后的独立办公室",
            },
          },
          {
            src: "/photos/projets/agence-ecobank-thiaroye/03-bureaux-4.jpg",
            alt: {
              fr: "Couloir des bureaux",
              en: "Office corridor",
              zh: "办公室走廊",
            },
          },
        ],
      },
    ],
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
