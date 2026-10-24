import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
// Plus Jakarta Sans : uniquement Regular (400), Medium (500) et Bold (700).
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "../globals.css";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import MobileActionBar from "@/components/MobileActionBar";
import WhatsAppButton from "@/components/WhatsAppButton";
import { getDictionary } from "@/i18n";
import { htmlLang, isLocale, locales } from "@/i18n/config";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

export const dynamicParams = false;
export const generateStaticParams = () => locales.map((locale) => ({ locale }));

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  return {
    metadataBase: new URL(site.url),
    applicationName: site.legalName,
    ...pageMetadata(locale, "home"),
  };
}

export const viewport: Viewport = { themeColor: "#06182a", colorScheme: "dark" };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: site.legalName,
    url: `${site.url}/${locale}`,
    logo: `${site.url}/brand/logo.png`,
    image: `${site.url}/brand/logo.png`,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: site.address.country,
    },
    areaServed: { "@type": "Country", name: "Sénégal" },
    openingHours: site.openingHours,
    sameAs: Object.values(site.social),
    description: t.meta.siteDescription,
    inLanguage: htmlLang[locale],
  };

  return (
    <html lang={htmlLang[locale]}>
      <body className="flex min-h-dvh flex-col pb-[calc(4rem+env(safe-area-inset-bottom))] font-sans lg:pb-0">
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;translate:none!important;transform:none!important}`}</style>
        </noscript>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-accent focus:px-5 focus:py-3 focus:text-on-accent"
        >
          {t.nav.skip}
        </a>
        <Header locale={locale} t={t.nav} />
        <main id="contenu" className="flex-1" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} t={t} />
        <WhatsAppButton label={t.hero.whatsapp} message={t.contact.whatsappMsg} />
        <MobileActionBar locale={locale} t={t} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      </body>
    </html>
  );
}
