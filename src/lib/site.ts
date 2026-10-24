/** Coordonnées et informations officielles d'Arrow Home Group (identiques dans toutes les langues). */
export const site = {
  name: "Arrow Home",
  legalName: "ARROW HOME GROUP",
  /** Domaine public. À définir dans Vercel (NEXT_PUBLIC_SITE_URL) quand le nom de domaine définitif est branché. */
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://arrow-home.vercel.app").replace(/\/$/, ""),
  phone: "+221 78 715 54 54",
  phoneHref: "tel:+221787155454",
  whatsapp: "221787155454",
  email: "info@arrowhome.cc",
  address: {
    street: "Avenue Malick Sy, Médina",
    city: "Dakar",
    country: "SN",
  },
  mapQuery: "Avenue Malick Sy, Médina, Dakar",
  /** Horaires au format schema.org ; l'affichage est traduit dans les dictionnaires. */
  openingHours: ["Mo-Fr 09:00-17:00", "Sa 09:00-13:00"],
  social: {
    facebook: "https://www.facebook.com/profile.php?id=61568603257478",
    instagram: "https://www.instagram.com/arrowhome_group/",
    linkedin: "https://www.linkedin.com/company/arrow-home-group/",
  },
  instagramHandle: "@arrowhome_group",
};

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsapp}${text ? `?text=${encodeURIComponent(text)}` : ""}`;
