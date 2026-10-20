type Localized = { fr: string; en: string; zh: string };

/**
 * TÉMOIGNAGES CLIENTS AUTHENTIQUES UNIQUEMENT.
 * La section « Témoignages » ne s'affiche que si cette liste contient au moins un élément.
 * Obtenir l'accord écrit du client avant publication.
 */
export type Testimonial = {
  author: string;
  context: Localized; // ex. « Rénovation d'une villa, Dakar »
  quote: Localized;
};

export const testimonials: Testimonial[] = [];

/**
 * BIENS IMMOBILIERS RÉELLEMENT DISPONIBLES.
 * La page Immobilier affiche la liste et ses filtres dès qu'un bien est ajouté ici.
 */
export type Property = {
  id: string;
  deal: "sale" | "rent";
  type: "land" | "villa" | "apartment" | "commercial";
  city: string;
  title: Localized;
  priceXof?: number;
  areaM2?: number;
  bedrooms?: number;
  image?: string;
};

export const properties: Property[] = [];
