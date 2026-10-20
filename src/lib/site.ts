export const site = {
  name: "Arrow Home",
  legalName: "ARROW HOME Group",
  tagline: "Construction, rénovation et immobilier au Sénégal",
  description:
    "Arrow Home Group : construction, rénovation, aménagement intérieur, menuiserie, ascenseurs, immobilier et projets hôteliers à Dakar et dans les régions du Sénégal. Devis gratuit.",
  url: "https://arrowhome.sn",
  phone: "+221 78 715 54 54",
  phoneHref: "tel:+221787155454",
  whatsapp: "221787155454",
  email: "arrowhome.senegal@gmail.com",
  address: "Avenue Malick Sy, Médina, Dakar",
  hours: [
    { days: "Lundi – Vendredi", time: "9h – 17h" },
    { days: "Samedi", time: "9h – 13h" },
    { days: "Dimanche", time: "Fermé" },
  ],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61568603257478",
    instagram: "https://www.instagram.com/arrowhome_group/",
    linkedin: "https://www.linkedin.com/company/arrow-home-group/",
  },
};

export const whatsappLink = (text = "Bonjour Arrow Home, je souhaite avoir des informations sur vos services.") =>
  `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;

export const nav = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/#services" },
  { label: "Immobilier", href: "/immobilier" },
  { label: "Réalisations", href: "/#realisations" },
  { label: "À propos", href: "/#apropos" },
  { label: "Contact", href: "/#contact" },
];

export type Service = {
  slug: string;
  title: string;
  short: string;
  points: string[];
  icon: string;
};

export const services: Service[] = [
  {
    slug: "construction-btp",
    title: "Construction & BTP",
    short: "Villas, immeubles et bâtiments clés en main, de l'étude au gros œuvre.",
    points: ["Gros œuvre et structure", "Projets clés en main", "Suivi de chantier professionnel"],
    icon: "Building2",
  },
  {
    slug: "renovation",
    title: "Rénovation & réhabilitation",
    short: "Transformation complète de villas, appartements et bâtiments existants.",
    points: ["Rénovation complète", "Réhabilitation de bâtiments", "Mise aux normes"],
    icon: "Hammer",
  },
  {
    slug: "second-oeuvre",
    title: "Second œuvre & finitions",
    short: "Électricité, plomberie, étanchéité, carrelage, peinture et faux plafonds.",
    points: ["Électricité et domotique", "Plomberie et étanchéité", "Finitions haut de gamme"],
    icon: "PaintRoller",
  },
  {
    slug: "menuiserie",
    title: "Aluminium & menuiserie bois",
    short: "Portes, fenêtres, cloisons vitrées, placards et menuiserie sur mesure.",
    points: ["Menuiserie aluminium", "Cloisons vitrées", "Menuiserie bois sur mesure"],
    icon: "DoorOpen",
  },
  {
    slug: "amenagement-interieur",
    title: "Aménagement intérieur & décoration",
    short: "Design d'intérieur, plans 3D, choix des matériaux et mobilier sur mesure.",
    points: ["Plans et modélisation 3D", "Sélection des matériaux", "Mobilier sur mesure"],
    icon: "Sofa",
  },
  {
    slug: "immobilier",
    title: "Immobilier",
    short: "Vente et location de biens : terrains, villas, appartements et locaux.",
    points: ["Vente et location", "Accompagnement des acheteurs", "Valorisation de biens"],
    icon: "KeyRound",
  },
  {
    slug: "ascenseurs",
    title: "Solutions d'ascenseurs",
    short: "Fourniture, installation et maintenance d'ascenseurs pour vos bâtiments.",
    points: ["Fourniture et installation", "Maintenance", "Mise en conformité"],
    icon: "ArrowUpDown",
  },
  {
    slug: "amenagement-exterieur",
    title: "Aménagement extérieur",
    short: "Façades, cours, terrasses, clôtures, jardins et espaces extérieurs.",
    points: ["Façades et clôtures", "Terrasses et pavage", "Espaces verts"],
    icon: "Trees",
  },
  {
    slug: "projets-hoteliers",
    title: "Projets hôteliers",
    short: "Construction et aménagement d'hôtels, résidences et espaces d'accueil.",
    points: ["Hôtels et résidences", "Aménagement des chambres", "Espaces communs"],
    icon: "Hotel",
  },
];

export const steps = [
  {
    title: "Consultation",
    text: "Nous écoutons votre projet, visitons le site et étudions votre budget et vos contraintes.",
  },
  {
    title: "Conception & devis",
    text: "Plans, choix des matériaux et devis détaillé, clair et transparent.",
  },
  {
    title: "Réalisation",
    text: "Chantier organisé, contrôle qualité à chaque étape et points d'avancement réguliers.",
  },
  {
    title: "Livraison & suivi",
    text: "Réception des travaux, vérification de la qualité et service après livraison.",
  },
];

export const strengths = [
  { title: "Prix clairs", text: "Un devis détaillé et transparent, validé avec vous avant le début des travaux.", icon: "ReceiptText" },
  { title: "Délais respectés", text: "Un planning défini dès le départ et un suivi régulier de l'avancement.", icon: "CalendarCheck" },
  { title: "Qualité contrôlée", text: "Des vérifications à chaque étape du chantier, jusqu'à la livraison.", icon: "ShieldCheck" },
  { title: "Un seul interlocuteur", text: "Construction, finitions, menuiserie, ascenseurs : tout est coordonné par nos équipes.", icon: "Handshake" },
];
