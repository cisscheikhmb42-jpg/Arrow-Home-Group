import type { Metadata } from "next";
import { Suspense } from "react";
import { InstagramIcon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero } from "@/components/sections/Blocks";
import PortfolioExplorer from "@/components/sections/PortfolioExplorer";
import PortfolioRail from "@/components/sections/PortfolioRail";
import { getPortfolioItems } from "@/content/portfolio-items";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "projects", getDictionary(locale).meta.pages.projects);
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const items = getPortfolioItems(locale, t);
  const explorerT = { ...t.portfolio, illustrationAlt: t.common.illustrationAlt };

  return (
    <>
      <PageHero eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} text={t.portfolio.subtitle} />

      <section className="overflow-hidden bg-white py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="max-w-3xl border-l border-champagne pl-5 text-sm leading-relaxed text-stone">
            {t.portfolio.illustrationNote}{" "}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-semibold text-graphite underline decoration-champagne underline-offset-4">
              <InstagramIcon className="size-4" />
              {t.portfolio.instagram}
            </a>
          </Reveal>
          <h2 className="sr-only">{t.portfolio.carouselLabel}</h2>
          <div className="mt-6">
            <PortfolioRail items={items} t={t} />
          </div>
        </div>
      </section>

      <section className="bg-ivory py-20 lg:py-28">
        <div className="container-x">
          <h2 className="display mb-10 text-4xl text-graphite sm:text-5xl">{t.portfolio.gridTitle}</h2>
          <Suspense fallback={null}>
            <PortfolioExplorer items={items} t={explorerT} />
          </Suspense>
        </div>
      </section>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
