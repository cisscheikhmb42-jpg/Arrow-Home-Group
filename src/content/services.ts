/**
 * Les 8 expertises. Les textes sont dans les dictionnaires (`src/i18n/dictionaries`), sous `services.items[slug]`.
 * `image` : chemin d'une vraie photo dans /public (ex. "/photos/services/construction.jpg").
 * Sans photo, l'illustration `variant` de <Blueprint> est affichée.
 */
export const serviceSlugs = [
  "construction",
  "renovation",
  "amenagement-finition",
  "aluminium",
  "bois",
  "ascenseurs",
  "immobilier",
  "decoration",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceMeta: Record<ServiceSlug, { icon: string; variant: number; image?: string }> = {
  construction: { icon: "Building2", variant: 0 },
  renovation: { icon: "Hammer", variant: 6 },
  "amenagement-finition": { icon: "PaintRoller", variant: 1 },
  aluminium: { icon: "AppWindow", variant: 4 },
  bois: { icon: "TreePine", variant: 5 },
  ascenseurs: { icon: "ArrowUpDown", variant: 3 },
  immobilier: { icon: "KeyRound", variant: 2 },
  decoration: { icon: "Sofa", variant: 7 },
};

/** Anciens identifiants (liens ?service= de la version précédente du site) → nouvelle expertise. */
const legacyAliases: Record<string, ServiceSlug> = {
  "construction-btp": "construction",
  "projets-hoteliers": "construction",
  "second-oeuvre": "amenagement-finition",
  "amenagement-exterieur": "amenagement-finition",
  "amenagement-interieur": "decoration",
  menuiserie: "aluminium",
};

export const isServiceSlug = (v: unknown): v is ServiceSlug =>
  typeof v === "string" && (serviceSlugs as readonly string[]).includes(v);

export function resolveServiceSlug(v: string | null | undefined): ServiceSlug | "" {
  if (!v) return "";
  if (isServiceSlug(v)) return v;
  return legacyAliases[v] ?? "";
}
