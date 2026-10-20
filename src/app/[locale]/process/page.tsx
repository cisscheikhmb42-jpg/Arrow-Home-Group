import type { Metadata } from "next";
import { CtaBand, ProcessTimeline } from "@/components/sections/Blocks";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "process", getDictionary(locale).meta.pages.process);
}

export default async function ProcessPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <>
      <div className="pt-4 lg:pt-8">
        <ProcessTimeline t={t} headingLevel="h1" />
      </div>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
