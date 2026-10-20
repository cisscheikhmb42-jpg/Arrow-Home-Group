import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Blueprint from "@/components/Blueprint";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero } from "@/components/sections/Blocks";
import { serviceMeta, serviceSlugs } from "@/content/services";
import { fill, getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "services", getDictionary(locale).meta.pages.services);
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <>
      <PageHero eyebrow={t.services.eyebrow} title={t.services.title} text={`${t.services.subtitle} ${t.services.pageIntro}`} />

      <nav aria-label={t.services.title} className="sticky top-[4.5rem] z-30 border-b border-mist bg-ivory/95 backdrop-blur lg:top-24">
        <ul className="container-x scroller flex gap-6 overflow-x-auto py-4 text-[13px] font-semibold tracking-[0.08em] whitespace-nowrap uppercase lang-zh:tracking-normal">
          {serviceSlugs.map((slug) => (
            <li key={slug}>
              <a href={`#${slug}`} className="text-stone hover:text-graphite">
                {t.services.items[slug].title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="bg-ivory">
        {serviceSlugs.map((slug, i) => {
          const s = t.services.items[slug];
          const meta = serviceMeta[slug];
          const flip = i % 2 === 1;
          return (
            <section key={slug} id={slug} aria-labelledby={`${slug}-title`} className={`scroll-mt-40 py-20 lg:py-28 ${i % 2 ? "bg-white" : ""}`}>
              <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
                <Reveal className={flip ? "lg:order-2" : ""}>
                  <div className="relative aspect-[4/3] overflow-hidden border border-mist bg-white">
                    {meta.image ? (
                      <Image src={meta.image} alt={s.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                    ) : (
                      <div role="img" aria-label={fill(t.common.illustrationAlt, { name: s.title })} className="absolute inset-0">
                        <Blueprint variant={meta.variant} tone="light" className="absolute inset-0 h-full w-full" />
                      </div>
                    )}
                  </div>
                </Reveal>
                <Reveal delay={120}>
                  <p className="text-xs font-semibold tracking-[0.2em] text-champagne-700 tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(serviceSlugs.length).padStart(2, "0")}
                  </p>
                  <h2 id={`${slug}-title`} className="display mt-4 text-4xl text-graphite sm:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-stone">{s.body}</p>
                  <ul className="mt-8 space-y-3 border-t border-mist pt-8">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-graphite">
                        <Check className="size-4 shrink-0 text-champagne-700" aria-hidden />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link href={`${href(locale, "quote")}?service=${slug}`} className="btn btn-dark mt-10">
                    {t.services.quote}
                    <span className="sr-only"> : {s.title}</span>
                    <ArrowRight className="arrow size-4" aria-hidden />
                  </Link>
                </Reveal>
              </div>
            </section>
          );
        })}
      </div>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
