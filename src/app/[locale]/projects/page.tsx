import type { Metadata } from "next";
import { Suspense } from "react";
import { CtaBand, FollowNote, PageHero } from "@/components/sections/Blocks";
import PortfolioExplorer from "@/components/sections/PortfolioExplorer";
import PortfolioRail from "@/components/sections/PortfolioRail";
import { getPortfolioItems } from "@/content/portfolio-items";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "projects", getDictionary(locale).meta.pages.projects);
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const items = getPortfolioItems(locale, t);

  return (
    <>
      <PageHero eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} text={t.portfolio.subtitle} />

      <section className="overflow-hidden border-b border-line bg-canvas py-20 lg:py-28">
        <div className="container-x">
          <FollowNote t={t} />
          <h2 className="sr-only">{t.portfolio.carouselLabel}</h2>
          <div className="mt-6">
            <PortfolioRail items={items} t={t} />
          </div>
        </div>
      </section>

      <section className="bg-canvas py-20 lg:py-28">
        <div className="container-x">
          <h2 className="display mb-10 text-4xl text-ink sm:text-5xl">{t.portfolio.gridTitle}</h2>
          <Suspense fallback={null}>
            <PortfolioExplorer items={items} t={t.portfolio} />
          </Suspense>
        </div>
      </section>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
