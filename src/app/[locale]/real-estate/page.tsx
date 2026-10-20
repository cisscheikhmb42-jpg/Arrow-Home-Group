import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icon";
import Reveal from "@/components/Reveal";
import { CtaBand, PageHero } from "@/components/sections/Blocks";
import { properties } from "@/content/trust";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";
import { whatsappLink } from "@/lib/site";
import PropertyList from "./PropertyList";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "real-estate", getDictionary(locale).meta.pages.realEstate);
}

export default async function RealEstatePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const r = t.realEstate;
  const quote = href(locale, "quote");
  return (
    <>
      <PageHero eyebrow={r.eyebrow} title={t.meta.pages.realEstate.title} text={r.pageIntro} />
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x">
          {properties.length > 0 ? (
            <PropertyList items={properties} locale={locale} t={r} quoteHref={quote} />
          ) : (
            <Reveal className="border border-mist bg-tint">
              <div className="px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
                <h2 className="display max-w-3xl text-4xl text-graphite sm:text-5xl">{r.emptyTitle}</h2>
                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-graphite">{r.emptyText}</p>
                <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Link href={`${quote}?service=immobilier`} className="btn btn-dark">
                    {r.entrust}
                    <ArrowRight className="arrow size-4" aria-hidden />
                  </Link>
                  <a href={whatsappLink(r.whatsappMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                    <WhatsAppIcon className="size-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </section>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
