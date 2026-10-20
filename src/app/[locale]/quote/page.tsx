import type { Metadata } from "next";
import { Suspense } from "react";
import { Phone } from "lucide-react";
import { WhatsAppIcon } from "@/components/Icon";
import LeadForm from "@/components/LeadForm";
import Reveal from "@/components/Reveal";
import { PageHero } from "@/components/sections/Blocks";
import { serviceSlugs } from "@/content/services";
import { getDictionary } from "@/i18n";
import type { Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";
import { site, whatsappLink } from "@/lib/site";
import QuoteForm from "./QuoteForm";

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "quote", getDictionary(locale).meta.pages.quote);
}

export default async function QuotePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const t = getDictionary(locale);
  const formProps = {
    locale,
    t: t.form,
    services: serviceSlugs.map((slug) => ({ slug, title: t.services.items[slug].title })),
    privacyHref: href(locale, "privacy"),
  };
  return (
    <>
      <PageHero eyebrow={t.quote.eyebrow} title={t.quote.title} text={t.quote.text} />
      <section className="bg-white py-20 lg:py-28">
        <div className="container-x grid gap-14 lg:grid-cols-[1.6fr_1fr] lg:gap-20">
          <Reveal>
            <Suspense fallback={<LeadForm kind="quote" {...formProps} />}>
              <QuoteForm {...formProps} />
            </Suspense>
          </Reveal>
          <Reveal delay={120}>
            <aside className="border border-mist bg-tint p-8 sm:p-10 lg:sticky lg:top-32">
              <h2 className="display text-3xl text-graphite">{t.quote.asideTitle}</h2>
              <p className="mt-4 text-stone">{t.quote.asideText}</p>
              <div className="mt-8 flex flex-col gap-3">
                <a href={site.phoneHref} className="btn btn-dark">
                  <Phone className="size-4" aria-hidden />
                  {site.phone}
                </a>
                <a href={whatsappLink(t.contact.whatsappMsg)} target="_blank" rel="noopener noreferrer" className="btn btn-outline-dark">
                  <WhatsAppIcon className="size-4" />
                  {t.contact.whatsapp}
                </a>
              </div>
              <dl className="mt-8 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 border-t border-mist pt-6 text-sm">
                {t.contact.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-stone">{h.days}</dt>
                    <dd className="font-semibold text-graphite">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
