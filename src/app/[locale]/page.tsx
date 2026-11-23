import Link from "next/link";
import { ArrowRight } from "lucide-react";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import QuickQuote from "@/components/QuickQuote";
import { AboutSection, ContactSection, ProcessTimeline, StatsBand, Testimonials, VideosBand } from "@/components/sections/Blocks";
import PortfolioRail from "@/components/sections/PortfolioRail";
import SectionHeading from "@/components/sections/SectionHeading";
import ServicesGrid from "@/components/sections/ServicesGrid";
import { getPortfolioItems } from "@/content/portfolio-items";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";

export default async function Home({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const s = t.hero.slides;
  const quote = href(locale, "quote");

  // Chaque diapositive renvoie vers une vraie page (devis pré-rempli, réalisations, méthode…).
  const slides: Slide[] = [
    // Fond de chaque diapositive : une photo de nos réalisations.
    {
      ...s[0],
      cta: { label: s[0].cta, href: quote },
      secondary: { label: s[0].secondary, href: href(locale, "projects") },
      image: "/photos/projets/stade-iba-mar-diop/couverture-tribune.jpg",
      imagePosition: "50% 60%",
    },
    {
      ...s[1],
      cta: { label: s[1].cta, href: `${quote}?service=construction` },
      secondary: { label: s[1].secondary, href: href(locale, "services") },
      image: "/photos/projets/projet-p7-kalia/facade-principale.jpg",
      imagePosition: "60% 55%",
    },
    {
      ...s[2],
      cta: { label: s[2].cta, href: `${quote}?service=renovation` },
      secondary: { label: s[2].secondary, href: href(locale, "projects") },
      image: "/photos/projets/agence-ecobank-thiaroye/01-accueil-1.jpg",
    },
    {
      ...s[3],
      cta: { label: s[3].cta, href: `${quote}?service=construction` },
      secondary: { label: s[3].secondary, href: href(locale, "process") },
      image: "/photos/projets/p703-villa-sangalkam/01-villas-1.jpg",
    },
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
          <div className="mt-12">
            <PortfolioRail items={getPortfolioItems(locale, t)} t={t} />
          </div>
        </div>
      </section>

      <VideosBand t={t} />
      <AboutSection locale={locale} t={t} />
      <ProcessTimeline t={t} />
      <Testimonials locale={locale} t={t} />
      <ContactSection locale={locale} t={t} />
    </>
  );
}
