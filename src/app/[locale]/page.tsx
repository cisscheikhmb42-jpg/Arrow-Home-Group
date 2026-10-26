import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import { InstagramIcon } from "@/components/Icon";
import QuickQuote from "@/components/QuickQuote";
import Reveal from "@/components/Reveal";
import { AboutSection, ContactSection, DiasporaBand, ProcessTimeline, StatsBand, Testimonials } from "@/components/sections/Blocks";
import PortfolioRail from "@/components/sections/PortfolioRail";
import SectionHeading from "@/components/sections/SectionHeading";
import ServicesGrid from "@/components/sections/ServicesGrid";
import { getPortfolioItems } from "@/content/portfolio-items";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { site } from "@/lib/site";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const s = t.hero.slides;
  const quote = href(locale, "quote");

  // Chaque diapositive renvoie vers une vraie page (devis pré-rempli, réalisations, méthode…).
  const slides: Slide[] = [
    { ...s[0], cta: { label: s[0].cta, href: quote }, secondary: { label: s[0].secondary, href: href(locale, "projects") } },
    { ...s[1], cta: { label: s[1].cta, href: `${quote}?service=construction` }, secondary: { label: s[1].secondary, href: href(locale, "services") } },
    { ...s[2], cta: { label: s[2].cta, href: `${quote}?service=renovation` }, secondary: { label: s[2].secondary, href: href(locale, "projects") } },
    { ...s[3], cta: { label: s[3].cta, href: `${quote}?service=construction` }, secondary: { label: s[3].secondary, href: href(locale, "process") } },
  ];

  return (
    <>
      <HeroSlider slides={slides} t={t.hero} aside={<QuickQuote locale={locale} t={t} />} />
      {/* Sur téléphone et tablette, le choix rapide de prestation suit le diaporama. */}
      <section className="border-b border-line bg-surface py-12 lg:hidden">
        <div className="container-x max-w-xl">
          <QuickQuote locale={locale} t={t} />
        </div>
      </section>
      <div id="contenu-suite" />
      <StatsBand t={t} />

      {/* Expertises */}
      <section className="bg-canvas py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} subtitle={t.services.subtitle}>
            <Link href={href(locale, "services")} className="link-line self-start text-ink lg:self-auto">
              {t.services.more}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </SectionHeading>
          <ServicesGrid locale={locale} t={t} />
        </div>
      </section>

      {/* Réalisations */}
      <section className="overflow-hidden border-t border-line bg-canvas py-24 lg:py-36">
        <div className="container-x">
          <SectionHeading eyebrow={t.portfolio.eyebrow} title={t.portfolio.title} subtitle={t.portfolio.subtitle}>
            <Link href={href(locale, "projects")} className="link-line self-start text-ink lg:self-auto">
              {t.portfolio.viewAll}
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </SectionHeading>
          <Reveal className="mt-10 max-w-3xl border-l border-accent pl-5 text-sm leading-relaxed text-muted">
            {t.portfolio.illustrationNote}{" "}
            <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 font-medium text-ink underline decoration-accent underline-offset-4">
              <InstagramIcon className="size-4" />
              {t.portfolio.instagram}
            </a>
          </Reveal>
          <div className="mt-6">
            <PortfolioRail items={getPortfolioItems(locale, t)} t={t} />
          </div>
        </div>
      </section>

      <AboutSection locale={locale} t={t} />
      <ProcessTimeline t={t} />
      <DiasporaBand t={t} />
      <Testimonials locale={locale} t={t} />
      <ContactSection locale={locale} t={t} />
    </>
  );
}
