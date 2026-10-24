import type { Metadata } from "next";
import { AboutSection, CtaBand, ProcessTimeline, StatsBand, Testimonials } from "@/components/sections/Blocks";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "about", getDictionary(locale).meta.pages.about);
}

export default async function AboutPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <>
      <AboutSection locale={locale} t={t} full headingLevel="h1" />
      <StatsBand t={t} />
      <ProcessTimeline t={t} />
      <Testimonials locale={locale} t={t} />
      <CtaBand locale={locale} t={t} />
    </>
  );
}
