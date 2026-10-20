import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { serviceMeta, serviceSlugs } from "@/content/services";
import Icon from "../Icon";
import Reveal from "../Reveal";

/** Cartes des 8 expertises (page d'accueil). La photo s'affiche des qu'elle est renseignee dans src/content/services.ts. */
export default function ServicesGrid({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <ul className="mt-16 grid gap-px border border-mist bg-mist sm:grid-cols-2 lg:grid-cols-4">
      {serviceSlugs.map((slug, i) => {
        const s = t.services.items[slug];
        const meta = serviceMeta[slug];
        return (
          <Reveal as="li" key={slug} delay={(i % 4) * 90} className="group relative flex flex-col bg-white">
            {meta.image && (
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={meta.image} alt={s.title} fill sizes="(min-width:1024px) 25vw, (min-width:640px) 50vw, 100vw" className="object-cover transition-transform duration-[1200ms] group-hover:scale-105" />
              </div>
            )}
            <div className="flex flex-1 flex-col p-7">
              <div className="flex items-start justify-between">
                <span className="inline-flex size-12 items-center justify-center bg-tint text-graphite">
                  <Icon name={meta.icon} className="size-6" strokeWidth={1.5} />
                </span>
                <span className="text-xs font-semibold tracking-[0.2em] text-stone tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <h3 className="display mt-6 text-2xl text-graphite sm:text-[1.75rem]">{s.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-stone">{s.short}</p>
              <div className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-graphite">
                <Link href={href(locale, "services", `#${slug}`)} className="link-line">
                  {t.services.more}
                  <span className="sr-only"> : {s.title}</span>
                </Link>
                <Link
                  href={`${href(locale, "quote")}?service=${slug}`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-graphite hover:underline"
                >
                  {t.services.quote}
                  <span className="sr-only"> : {s.title}</span>
                  <ArrowRight className="size-3.5" aria-hidden />
                </Link>
              </div>
            </div>
          </Reveal>
        );
      })}
    </ul>
  );
}
