import "server-only";
import type { Locale } from "./config";
import type { Dictionary } from "./dictionaries/fr";
import fr from "./dictionaries/fr";
import en from "./dictionaries/en";
import zh from "./dictionaries/zh";

const dictionaries: Record<Locale, Dictionary> = { fr, en, zh };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];

export { fill } from "./fill";

export type { Dictionary };
