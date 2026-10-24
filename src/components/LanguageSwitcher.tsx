"use client";

import { usePathname, useRouter } from "next/navigation";
import { LOCALE_COOKIE, htmlLang, localeLabels, locales, type Locale } from "@/i18n/config";
import { switchLocalePath } from "@/i18n/routes";

/** Sélecteur FR / EN / 中文 : renvoie vers la page équivalente en conservant les paramètres (filtres, service…). */
export default function LanguageSwitcher({
  locale,
  label,
  className = "",
  dark = false,
  onNavigate,
}: {
  locale: Locale;
  label: string;
  className?: string;
  dark?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() || `/${locale}`;
  const router = useRouter();

  return (
    <ul aria-label={label} className={`flex items-center ${className}`}>
      {locales.map((l, i) => {
        const target = switchLocalePath(pathname, l);
        const active = l === locale;
        return (
          <li key={l} className="flex items-center">
            {i > 0 && <span aria-hidden className="mx-1 h-3 w-px bg-current opacity-25" />}
            <a
              href={target}
              hrefLang={htmlLang[l]}
              lang={htmlLang[l]}
              aria-current={active ? "true" : undefined}
              title={localeLabels[l].name}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
                e.preventDefault();
                try {
                  document.cookie = `${LOCALE_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
                } catch {}
                onNavigate?.();
                if (!active) router.push(`${target}${window.location.search}${window.location.hash}`);
              }}
              className={`inline-flex min-h-11 min-w-11 items-center justify-center px-2 whitespace-nowrap text-[13px] font-medium tracking-[0.08em] transition-colors ${
                dark
                  ? active ? "text-white" : "text-muted hover:text-white"
                  : active ? "text-ink" : "text-muted hover:text-ink"
              }`}
            >
              <span className={active ? "border-b border-accent pb-0.5" : "pb-0.5"}>{localeLabels[l].short}</span>
              <span className="sr-only"> – {localeLabels[l].name}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
