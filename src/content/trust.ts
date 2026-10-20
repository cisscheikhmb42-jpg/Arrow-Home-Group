type Localized = { fr: string; en: string; zh: string };

/**
 * TEMOIGNAGES CLIENTS AUTHENTIQUES UNIQUEMENT.
 * La section « Temoignages » ne s'affiche que si cette liste contient au moins un element.
 * Obtenir l'accord ecrit du client avant publication.
 */
export type Testimonial = {
  author: string;
  context: Localized; // ex. « Renovation d'une villa, Dakar »
  quote: Localized;
};

export const testimonials: Testimonial[] = [];
