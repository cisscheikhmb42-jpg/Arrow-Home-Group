/**
 * Les 8 expertises. Les textes sont dans les dictionnaires (`src/i18n/dictionaries`), sous `services.items[slug]`.
 * `image` : chemin d'une vraie photo dans /public (ex. "/photos/services/construction.jpg").
 * Sans photo, seule l'icone est affichee.
 */
export const serviceSlugs = [
  "construction",
  "renovation",
  "amenagement-finition",
  "plomberie-sanitaire",
  "aluminium",
  "bois",
  "ascenseurs",
  "decoration",
] as const;

export type ServiceSlug = (typeof serviceSlugs)[number];

export const serviceMeta: Record<ServiceSlug, { icon: string; image?: string }> = {
  construction: { icon: "Building2" },
  renovation: { icon: "Hammer" },
  "amenagement-finition": { icon: "PaintRoller" },
  "plomberie-sanitaire": { icon: "ShowerHead" },
  aluminium: { icon: "AppWindow" },
  bois: { icon: "TreePine" },
  ascenseurs: { icon: "ArrowUpDown" },
  decoration: { icon: "Sofa" },
};

/** Anciens identifiants (liens ?service= de la version précédente du site) → nouvelle expertise. */
const legacyAliases: Record<string, ServiceSlug> = {
  "construction-btp": "construction",
  "projets-hoteliers": "construction",
  "second-oeuvre": "amenagement-finition",
  plomberie: "plomberie-sanitaire",
  sanitaire: "plomberie-sanitaire",
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
