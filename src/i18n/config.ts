export const locales = ["fr", "en", "zh"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const isLocale = (v: string | undefined): v is Locale => !!v && (locales as readonly string[]).includes(v);

/** Code BCP 47 utilisé pour <html lang> et les balises hreflang. */
export const htmlLang: Record<Locale, string> = { fr: "fr", en: "en", zh: "zh-Hans" };

/** Locale Open Graph. */
export const ogLocale: Record<Locale, string> = { fr: "fr_SN", en: "en_US", zh: "zh_CN" };

export const localeLabels: Record<Locale, { short: string; name: string }> = {
  fr: { short: "FR", name: "Français" },
  en: { short: "EN", name: "English" },
  zh: { short: "中文", name: "简体中文" },
};

export const LOCALE_COOKIE = "NEXT_LOCALE";
