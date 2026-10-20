import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { testimonials } from "@/content/trust";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "./SectionHeading";

/** A propos : texte et engagements. */
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
    <section className="border-t border-mist bg-white py-24 lg:py-36">
      <div className="container-x">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">{a.eyebrow}</p>
          <Title className="display mt-6 text-4xl text-graphite sm:text-5xl lg:text-6xl">{full ? a.title : a.lead}</Title>
          {full && <p className="display mt-6 text-2xl text-stone italic lang-zh:not-italic">{a.lead}</p>}
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-graphite">
            {(full ? a.paragraphs : a.paragraphs.slice(0, 2)).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href={href(locale, "quote")} className="btn btn-dark">
              {a.cta}
              <ArrowRight className="arrow size-4" aria-hidden />
            </Link>
            {!full && (
              <Link href={href(locale, "about")} className="btn btn-outline-dark">
                {a.more}
              </Link>
            )}
          </div>
        </Reveal>

        <ul className="mt-20 grid border-y border-mist sm:grid-cols-2 lg:mt-24 lg:grid-cols-4">
          {a.values.map((v, i) => (
            <Reveal as="li" key={v.title} delay={i * 100} className="py-8 sm:pr-8 lg:py-10">
              <span className="block h-0.5 w-10 bg-champagne" aria-hidden />
              <h3 className="display mt-5 text-3xl text-graphite">{v.title}</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-stone">{v.text}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Notre methode : chronologie horizontale sur grand ecran, verticale sur mobile. */
export function ProcessTimeline({ t, headingLevel = "h2" }: { t: Dictionary; headingLevel?: "h1" | "h2" }) {
  const p = t.process;
  return (
    <section className="border-t border-mist bg-white py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} as={headingLevel} />
        <ol className="relative mt-20 grid gap-0 lg:grid-cols-5 lg:gap-8">
          <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-mist lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          {p.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 120} className="relative pb-12 pl-12 last:pb-0 lg:pb-0 lg:pl-0">
              <span aria-hidden className="absolute top-0 left-0 size-[15px] rounded-full border border-graphite bg-white lg:relative lg:block">
                <span className="absolute inset-[4px] rounded-full bg-graphite" />
              </span>
              <p className="text-xs font-semibold tracking-[0.2em] text-stone uppercase lg:mt-8">
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

/** Temoignages : ne s'affiche que si de vrais temoignages ont ete ajoutes dans src/content/trust.ts. */
export function Testimonials({ locale, t }: { locale: Locale; t: Dictionary }) {
  if (testimonials.length === 0) return null;
  return (
    <section className="border-t border-mist bg-white py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((q) => (
            <li key={q.author} className="border-t-2 border-champagne pt-8">
              <blockquote className="display text-2xl leading-snug text-graphite">
                {locale === "fr" ? `« ${q.quote[locale]} »` : `“${q.quote[locale]}”`}
              </blockquote>
              <p className="mt-6 font-semibold text-graphite">{q.author}</p>
              <p className="text-sm text-stone">{q.context[locale]}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/** Coordonnees : telephone, WhatsApp, e-mails, adresse, horaires. */
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
                className="mt-1 block text-lg break-words text-graphite hover:underline"
              >
                {r.value}
              </a>
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

/** Carte Google Maps (chargement differe). */
export function MapEmbed({ title }: { title: string }) {
  return (
    <div className="overflow-hidden border border-mist bg-tint">
      <iframe
        title={title}
        src={`https://maps.google.com/maps?q=${encodeURIComponent(site.mapQuery)}&z=15&output=embed`}
        className="block h-80 w-full lg:h-[26rem]"
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
    <section id="contact" className="border-t border-mist bg-white py-24 lg:py-36">
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

/** Encadre « Besoin d'un devis ? ». */
export function CtaPanel({ locale, t }: { locale: Locale; t: Dictionary }) {
  const c = t.contact;
  return (
    <div className="border border-mist bg-tint p-8 sm:p-12">
      <h3 className="display text-3xl text-graphite sm:text-4xl">{c.quoteTitle}</h3>
      <p className="mt-4 text-stone">{c.quoteText}</p>
      <Link href={href(locale, "quote")} className="btn btn-dark mt-8 w-full sm:w-auto">
        {c.quoteCta}
        <ArrowRight className="arrow size-4" aria-hidden />
      </Link>
    </div>
  );
}

/** En-tete des pages interieures. */
export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-mist bg-white pt-16 pb-16 lg:pt-28 lg:pb-24">
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

/** Bandeau d'appel a l'action en bas de page. */
export function CtaBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="border-t border-mist bg-white py-20 lg:py-28">
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-2xl">
          <h2 className="display text-4xl text-graphite sm:text-5xl">{t.services.ctaTitle}</h2>
          <p className="mt-5 text-lg text-stone">{t.services.ctaText}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href={href(locale, "quote")} className="btn btn-dark">
            {t.nav.cta}
            <ArrowRight className="arrow size-4" aria-hidden />
          </Link>
          <a href={site.phoneHref} className="btn btn-outline-dark">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
