import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Icon from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero } from "@/components/sections/Blocks";
import { serviceMeta, serviceSlugs } from "@/content/services";
import { getDictionary } from "@/i18n";
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

      <nav aria-label={t.services.title} className="sticky top-[4.5rem] z-30 border-b border-mist bg-white/95 backdrop-blur lg:top-24">
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

      <div className="bg-white">
        {serviceSlugs.map((slug, i) => {
          const s = t.services.items[slug];
          const meta = serviceMeta[slug];
          const flip = i % 2 === 1;
          return (
            <section key={slug} id={slug} aria-labelledby={`${slug}-title`} className={`scroll-mt-40 border-b border-mist py-20 lg:py-28 ${i % 2 ? "bg-tint" : "bg-white"}`}>
              <div className={`container-x grid gap-12 lg:gap-24 ${meta.image ? "items-center lg:grid-cols-2" : "lg:grid-cols-[auto_1fr]"}`}>
                {meta.image ? (
                  <Reveal className={flip ? "lg:order-2" : ""}>
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={meta.image} alt={s.title} fill sizes="(min-width:1024px) 50vw, 100vw" className="object-cover" />
                    </div>
                  </Reveal>
                ) : (
                  <Reveal>
                    <span className="inline-flex size-16 items-center justify-center border border-mist bg-white text-graphite">
                      <Icon name={meta.icon} className="size-7" strokeWidth={1.5} />
                    </span>
                  </Reveal>
                )}
                <Reveal delay={120} className="max-w-3xl">
                  <p className="text-xs font-semibold tracking-[0.2em] text-stone tabular-nums">
                    {String(i + 1).padStart(2, "0")} / {String(serviceSlugs.length).padStart(2, "0")}
                  </p>
                  <h2 id={`${slug}-title`} className="display mt-4 text-4xl text-graphite sm:text-5xl">
                    {s.title}
                  </h2>
                  <p className="mt-6 text-lg leading-relaxed text-graphite">{s.body}</p>
                  <ul className="mt-8 space-y-3 border-t border-mist pt-8">
                    {s.points.map((p) => (
                      <li key={p} className="flex items-center gap-3 text-graphite">
                        <Check className="size-4 shrink-0 text-graphite" aria-hidden />
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
