"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { isLocale, defaultLocale } from "@/i18n/config";
import en from "@/i18n/dictionaries/en";
import fr from "@/i18n/dictionaries/fr";
import zh from "@/i18n/dictionaries/zh";

const dicts = { fr, en, zh };

export default function NotFound() {
  const seg = usePathname()?.split("/")[1];
  const locale = isLocale(seg) ? seg : defaultLocale;
  const t = dicts[locale].notFound;
  return (
    <section className="flex min-h-[60vh] items-center bg-canvas py-24">
      <div className="container-x max-w-2xl">
        <p className="eyebrow">404</p>
        <h1 className="display mt-6 text-5xl text-ink sm:text-6xl">{t.title}</h1>
        <p className="mt-6 text-lg text-muted">{t.text}</p>
        <Link href={`/${locale}`} className="btn btn-primary mt-10">
          {t.back}
        </Link>
      </div>
    </section>
  );
}
