import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { testimonials } from "@/content/trust";
import { site, whatsappLink } from "@/lib/site";
import Blueprint from "../Blueprint";
import { WhatsAppIcon } from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "./SectionHeading";

/** À propos : section sombre, texte + composition graphique. */
export function AboutSection({
  locale,
  t,
  full = false,
  headingLevel = "h2",
}: {
  locale: Locale;
  t: Dictionary;
  full?: boolean;
  headingLevel?: "h1" | "h2";
}) {
  const a = t.about;
  const Title = headingLevel;
  return (
    <section className="on-dark relative overflow-hidden bg-graphite py-24 text-white lg:py-36">
      <div className="container-x grid items-center gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-24">
        <Reveal>
          <p className="eyebrow eyebrow-light">{a.eyebrow}</p>
          <Title className="display mt-6 text-4xl sm:text-5xl lg:text-6xl">{full ? a.title : a.lead}</Title>
          {full && <p className="display mt-6 text-2xl text-champagne italic lang-zh:not-italic">{a.lead}</p>}
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-ash">
            {(full ? a.paragraphs : a.paragraphs.slice(0, 2)).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href={href(locale, "quote")} className="btn btn-champagne">
              {a.cta}
              <ArrowRight className="arrow size-4" aria-hidden />
            </Link>
            {!full && (
              <Link href={href(locale, "about")} className="btn btn-outline-light">
                {a.more}
              </Link>
            )}
          </div>
        </Reveal>

        <div className="relative">
          <div aria-hidden className="absolute -inset-6 hidden border border-champagne/30 lg:block" />
          <div className="relative aspect-[4/5] overflow-hidden bg-graphite-900 sm:aspect-[5/4] lg:aspect-[4/5]">
            <Blueprint variant={2} className="absolute inset-0 h-full w-full opacity-80" />
          </div>
        </div>
      </div>

      <div className="container-x mt-20 lg:mt-28">
        <ul className="grid gap-px border-y border-white/10 sm:grid-cols-2 lg:grid-cols-4">
          {a.values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 100} className="py-8 sm:pr-8 lg:py-10">
              <span className="text-xs font-semibold tracking-[0.2em] text-champagne tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="display mt-4 text-3xl">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-ash">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Notre méthode : chronologie horizontale sur grand écran, verticale sur mobile. */
export function ProcessTimeline({ t, headingLevel = "h2" }: { t: Dictionary; headingLevel?: "h1" | "h2" }) {
  const p = t.process;
  return (
    <section className="bg-ivory py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} as={headingLevel} />
        <ol className="relative mt-20 grid gap-0 lg:grid-cols-5 lg:gap-8">
          <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-mist lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          {p.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 120} className="relative pb-12 pl-12 last:pb-0 lg:pb-0 lg:pl-0">
              <span aria-hidden className="absolute top-0 left-0 size-[15px] rounded-full border border-champagne bg-ivory lg:relative lg:block">
                <span className="absolute inset-[4px] rounded-full bg-champagne" />
              </span>
              <p className="text-xs font-semibold tracking-[0.2em] text-champagne-700 uppercase lg:mt-8">
                {p.step} {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-3 text-3xl text-graphite">{s.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-stone">{s.text}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Témoignages : ne s'affiche que si de vrais témoignages ont été ajoutés dans src/content/trust.ts. */
export function Testimonials({ locale, t }: { locale: Locale; t: Dictionary }) {
  if (testimonials.length === 0) return null;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((q) => (
            <li key={q.author} className="border-t border-champagne pt-8">
              <blockquote className="display text-2xl leading-snug text-graphite">« {q.quote[locale]} »</blockquote>
              <p className="mt-6 font-semibold text-graphite">{q.author}</p>
              <p className="text-sm text-stone">{q.context[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Bandeau immobilier. */
export function RealEstateBanner({ locale, t }: { locale: Locale; t: Dictionary }) {
  const r = t.realEstate;
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container-x">
        <Reveal className="on-dark grid overflow-hidden bg-graphite text-white lg:grid-cols-2">
          <div className="px-7 py-14 sm:px-12 lg:px-16 lg:py-20">
            <p className="eyebrow eyebrow-light">{r.eyebrow}</p>
            <h2 className="display mt-6 text-4xl sm:text-5xl">{r.title}</h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">{r.text}</p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Link href={href(locale, "real-estate")} className="btn btn-champagne">
                {r.cta}
                <ArrowRight className="arrow size-4" aria-hidden />
              </Link>
              <Link href={`${href(locale, "quote")}?service=immobilier`} className="btn btn-outline-light">
                {r.entrust}
              </Link>
            </div>
          </div>
          <div className="relative hidden min-h-80 border-l border-white/10 lg:block">
            <Blueprint variant={2} className="absolute inset-0 h-full w-full" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Coordonnées : téléphone, WhatsApp, e-mails, adresse, horaires. */
export function ContactDetails({ t }: { t: Dictionary }) {
  const c = t.contact;
  const rows = [
    { href: site.phoneHref, label: c.phone, value: site.phone, icon: <Phone className="size-5" strokeWidth={1.5} aria-hidden /> },
    {
      href: whatsappLink(c.whatsappMsg),
      label: c.whatsapp,
      value: site.phone,
      icon: <WhatsAppIcon className="size-5" />,
      external: true,
    },
    {
      href: `mailto:${site.email}`,
      label: c.email,
      value: site.email,
      icon: <Mail className="size-5" strokeWidth={1.5} aria-hidden />,
      extra: { href: `mailto:${site.emailSecondary}`, value: site.emailSecondary },
    },
  ];
  return (
    <div>
      <ul className="divide-y divide-mist border-y border-mist">
        {rows.map((r) => (
          <li key={r.label} className="flex items-start gap-5 py-5">
            <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center border border-mist bg-white text-graphite">
              {r.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-semibold tracking-[0.18em] text-stone uppercase">{r.label}</span>
              <a
                href={r.href}
                {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-1 block text-lg break-words text-graphite hover:text-champagne-700"
              >
                {r.value}
              </a>
              {r.extra && (
                <a href={r.extra.href} className="mt-0.5 block break-words text-stone hover:text-champagne-700">
                  {r.extra.value}
                </a>
              )}
            </span>
          </li>
        ))}
        <li className="flex items-start gap-5 py-5">
          <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center border border-mist bg-white text-graphite">
            <MapPin className="size-5" strokeWidth={1.5} aria-hidden />
          </span>
          <span>
            <span className="block text-xs font-semibold tracking-[0.18em] text-stone uppercase">{c.office}</span>
            <span className="mt-1 block text-lg text-graphite">{c.address}</span>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
              {c.hours.map((h) => (
                <div key={h.days} className="contents">
                  <dt className="text-stone">{h.days}</dt>
                  <dd className="font-semibold text-graphite">{h.time}</dd>
                </div>
              ))}
            </dl>
          </span>
        </li>
      </ul>
    </div>
  );
}

/** Carte Google Maps (chargement différé). */
export function MapEmbed({ title }: { title: string }) {
  return (
    <div className="overflow-hidden border border-mist bg-mist">
      <iframe
        title={title}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
        className="block h-80 w-full grayscale-[35%] lg:h-[26rem]"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}

/** Section contact de la page d'accueil. */
export function ContactSection({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.contact;
  return (
    <section id="contact" className="bg-ivory py-24 lg:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="display mt-6 text-4xl text-graphite sm:text-5xl lg:text-6xl">{c.title}</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-stone">{c.text}</p>
          <div className="mt-10">
            <ContactDetails t={t} />
          </div>
        </Reveal>
        <Reveal delay={150} className="flex flex-col gap-8">
          <MapEmbed title={c.mapTitle} />
          <CtaPanel locale={locale} t={t} />
        </Reveal>
      </div>
    </section>
  );
}

/** Encadré « Besoin d'un devis ? ». */
export function CtaPanel({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.contact;
  return (
    <div className="on-dark bg-graphite p-8 text-white sm:p-12">
      <h3 className="display text-3xl sm:text-4xl">{c.quoteTitle}</h3>
      <p className="mt-4 text-ash">{c.quoteText}</p>
      <Link href={href(locale, "quote")} className="btn btn-champagne mt-8 w-full sm:w-auto">
        {c.quoteCta}
        <ArrowRight className="arrow size-4" aria-hidden />
      </Link>
    </div>
  );
}

/** En-tête des pages intérieures. */
export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-mist bg-ivory pt-16 pb-16 lg:pt-28 lg:pb-24">
      <div className="container-x">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-6 text-5xl text-graphite sm:text-6xl lg:text-7xl">{title}</h1>
          {text && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone sm:text-xl">{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/** Bandeau d'appel à l'action en bas de page. */
export function CtaBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="on-dark bg-graphite py-20 text-white lg:py-28">
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-2xl">
          <h2 className="display text-4xl sm:text-5xl">{t.services.ctaTitle}</h2>
          <p className="mt-5 text-lg text-ash">{t.services.ctaText}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href={href(locale, "quote")} className="btn btn-champagne">
            {t.nav.cta}
            <ArrowRight className="arrow size-4" aria-hidden />
          </Link>
          <a href={site.phoneHref} className="btn btn-outline-light">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
