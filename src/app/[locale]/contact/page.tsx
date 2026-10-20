import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { ContactDetails, CtaPanel, MapEmbed, PageHero } from "@/components/sections/Blocks";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "contact", getDictionary(locale).meta.pages.contact);
}

export default async function ContactPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  return (
    <>
      <PageHero eyebrow={t.contact.eyebrow} title={t.contact.title} text={t.contact.text} />
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x grid gap-16 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal className="space-y-10">
            <ContactDetails t={t} />
            <MapEmbed title={t.contact.mapTitle} />
          </Reveal>
          <Reveal delay={120} className="space-y-10">
            <div>
              <h2 className="display text-4xl text-graphite">{t.contact.formTitle}</h2>
              <p className="mt-3 text-stone">{t.contact.formText}</p>
            </div>
            <LeadForm kind="contact" locale={locale} t={t.form} services={[]} privacyHref={href(locale, "privacy")} />
            <CtaPanel locale={locale} t={t} />
          </Reveal>
        </div>
      </section>
    </>
  );
}
