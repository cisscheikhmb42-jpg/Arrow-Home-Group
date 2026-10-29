import Link from "next/link";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { testimonials } from "@/content/trust";
import { site, whatsappLink } from "@/lib/site";
import { InstagramIcon, TikTokIcon, WhatsAppIcon } from "../Icon";
import Reveal from "../Reveal";
import SectionHeading from "./SectionHeading";

/** Bandeau « en chiffres » : valeurs fournies par la direction (dictionnaires, clé `stats`). */
export function StatsBand({ t }: { t: Dictionary }) {
  const st = t.stats;
  return (
    <section aria-label={st.label} className="border-b border-line bg-surface">
      <ul className="container-x grid grid-cols-2 lg:grid-cols-4">
        {st.items.map((it, i) => (
          <Reveal
            as="li"
            key={it.label}
            delay={i * 90}
            className={`flex flex-col items-center justify-center px-2 py-10 text-center lg:py-14 ${i % 2 ? "border-l border-line" : ""} ${i > 1 ? "border-t border-line lg:border-t-0" : ""} ${i === 2 ? "lg:border-l" : ""}`}
          >
            <p className="display text-5xl text-accent tabular-nums lg:text-6xl">
              {it.value}
              <span className="text-2xl lg:text-3xl">{it.suffix}</span>
            </p>
            <p className="mt-3 text-xs font-medium tracking-[0.18em] text-muted uppercase">{it.label}</p>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

/** A propos : présentation, engagements et (page complète) valeurs. */
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
    <section className="border-t border-line bg-canvas py-24 lg:py-36">
      <div className="container-x grid gap-14 lg:grid-cols-[1.3fr_1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">{a.eyebrow}</p>
          <Title className="display mt-6 text-4xl text-ink sm:text-5xl lg:text-6xl">{full ? a.title : a.lead}</Title>
          {full && <p className="display mt-6 text-2xl text-sky">{a.lead}</p>}
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-muted">
            {(full ? a.paragraphs : a.paragraphs.slice(0, 2)).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
            <Link href={href(locale, "quote")} className="btn btn-primary">
              {a.cta}
              <ArrowRight className="arrow size-4" aria-hidden />
            </Link>
            {!full && (
              <Link href={href(locale, "about")} className="btn btn-outline">
                {a.more}
              </Link>
            )}
          </div>
        </Reveal>

        <Reveal delay={120} className="self-center">
          <h3 className="text-xs font-medium tracking-[0.2em] text-muted uppercase">{a.commitmentsLabel}</h3>
          <ul className="mt-5 divide-y divide-line border-y border-line">
            {a.commitments.map((c) => (
              <li key={c} className="flex items-center gap-4 py-5 text-[15px] font-medium text-ink sm:text-base">
                <span className="size-2 shrink-0 rounded-full bg-accent" aria-hidden />
                {c}
              </li>
            ))}
          </ul>
        </Reveal>

        {full && (
          <ul className="grid border-y border-line sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            {a.values.map((v, i) => (
              <Reveal as="li" key={v.title} delay={i * 100} className="py-8 sm:pr-8 lg:py-10">
                <span className="block h-0.5 w-10 bg-accent" aria-hidden />
                <h3 className="display mt-5 text-3xl text-ink">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-muted">{v.text}</p>
              </Reveal>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

/** Note sous « Nos réalisations » : photos à venir + liens Instagram et TikTok. */
export function FollowNote({ t, className = "" }: { t: Dictionary; className?: string }) {
  const p = t.portfolio;
  const link = "inline-flex items-center gap-1.5 font-medium text-ink underline decoration-accent underline-offset-4";
  return (
    <Reveal className={`max-w-3xl border-l border-accent pl-5 text-sm leading-relaxed text-muted ${className}`}>
      {p.illustrationNote} {p.followLead}{" "}
      <a href={site.social.instagram} target="_blank" rel="noopener noreferrer" className={link}>
        <InstagramIcon className="size-4" />
        Instagram
      </a>{" "}
      {p.followAnd}{" "}
      <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className={link}>
        <TikTokIcon className="size-4" />
        TikTok
      </a>
      {p.followTail}
    </Reveal>
  );
}

/** Bandeau « Nos chantiers en vidéo » : lien vers le compte TikTok (aucun script TikTok chargé sur le site). */
export function VideosBand({ t }: { t: Dictionary }) {
  const v = t.videos;
  return (
    <section className="border-t border-line bg-canvas py-16 lg:py-24">
      <div className="container-x">
        <Reveal className="hero-glow flex flex-col gap-8 border border-line p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="flex max-w-2xl items-start gap-5">
            <span className="inline-flex size-12 shrink-0 items-center justify-center bg-raised text-ink">
              <TikTokIcon className="size-6" />
            </span>
            <div>
              <h2 className="display text-3xl text-ink sm:text-4xl">{v.title}</h2>
              <p className="mt-4 text-lg leading-relaxed text-muted">{v.text}</p>
            </div>
          </div>
          <a href={site.social.tiktok} target="_blank" rel="noopener noreferrer" className="btn btn-primary shrink-0 self-start lg:self-auto">
            <TikTokIcon className="size-4" />
            {v.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Bloc diaspora : projet au Sénégal suivi depuis l'étranger, contact direct par WhatsApp. */
export function DiasporaBand({ t }: { t: Dictionary }) {
  const d = t.diaspora;
  return (
    <section className="border-t border-line bg-canvas py-16 lg:py-24">
      <div className="container-x">
        <Reveal className="flex flex-col gap-8 border border-line bg-surface p-7 sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
          <div className="max-w-2xl">
            <span className="block h-0.5 w-10 bg-accent" aria-hidden />
            <h2 className="display mt-6 text-3xl text-ink sm:text-4xl">{d.title}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{d.text}</p>
          </div>
          <a
            href={whatsappLink(t.contact.whatsappMsg)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary shrink-0 self-start lg:self-auto"
          >
            <WhatsAppIcon className="size-4" />
            {d.cta}
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/** Notre methode : chronologie horizontale sur grand ecran, verticale sur mobile. */
export function ProcessTimeline({ t, headingLevel = "h2" }: { t: Dictionary; headingLevel?: "h1" | "h2" }) {
  const p = t.process;
  return (
    <section className="border-t border-line bg-canvas py-24 lg:py-36">
      <div className="container-x">
        <SectionHeading eyebrow={p.eyebrow} title={p.title} subtitle={p.subtitle} as={headingLevel} />
        <ol className="relative mt-20 grid gap-0 lg:grid-cols-5 lg:gap-8">
          <span aria-hidden className="absolute top-0 bottom-0 left-[7px] w-px bg-line lg:top-[7px] lg:right-0 lg:bottom-auto lg:left-0 lg:h-px lg:w-auto" />
          {p.steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 120} className="relative pb-12 pl-12 last:pb-0 lg:pb-0 lg:pl-0">
              <span aria-hidden className="absolute top-0 left-0 size-[15px] rounded-full border border-accent bg-canvas lg:relative lg:block">
                <span className="absolute inset-[4px] rounded-full bg-accent" />
              </span>
              <p className="text-xs font-medium tracking-[0.2em] text-muted uppercase lg:mt-8">
                {p.step} {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="display mt-3 text-3xl text-ink">{s.title}</h3>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-muted">{s.text}</p>
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
    <section className="border-t border-line bg-canvas py-24 lg:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.testimonials.eyebrow} title={t.testimonials.title} />
        <ul className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((q) => (
            <li key={q.author} className="border-t-2 border-accent pt-8">
              <blockquote className="display text-2xl leading-snug text-ink">
                {locale === "fr" ? `« ${q.quote[locale]} »` : `“${q.quote[locale]}”`}
              </blockquote>
              <p className="mt-6 font-medium text-ink">{q.author}</p>
              <p className="text-sm text-muted">{q.context[locale]}</p>
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
      <ul className="divide-y divide-line border-y border-line">
        {rows.map((r) => (
          <li key={r.label} className="flex items-start gap-5 py-5">
            <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center border border-line bg-surface text-ink">
              {r.icon}
            </span>
            <span className="min-w-0">
              <span className="block text-xs font-medium tracking-[0.18em] text-muted uppercase">{r.label}</span>
              <a
                href={r.href}
                {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="mt-1 block text-lg break-words text-ink hover:underline"
              >
                {r.value}
              </a>
            </span>
          </li>
        ))}
        <li className="flex items-start gap-5 py-5">
          <span className="mt-0.5 inline-flex size-11 shrink-0 items-center justify-center border border-line bg-surface text-ink">
            <MapPin className="size-5" strokeWidth={1.5} aria-hidden />
          </span>
          <span>
            <span className="block text-xs font-medium tracking-[0.18em] text-muted uppercase">{c.office}</span>
            <span className="mt-1 block text-lg text-ink">{c.address}</span>
            <dl className="mt-4 grid grid-cols-[auto_1fr] gap-x-6 gap-y-1 text-sm">
              {c.hours.map((h) => (
                <div key={h.days} className="contents">
                  <dt className="text-muted">{h.days}</dt>
                  <dd className="font-medium text-ink">{h.time}</dd>
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
    <div className="overflow-hidden border border-line bg-surface">
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
    <section id="contact" className="border-t border-line bg-canvas py-24 lg:py-36">
      <div className="container-x grid gap-16 lg:grid-cols-2 lg:gap-24">
        <Reveal>
          <p className="eyebrow">{c.eyebrow}</p>
          <h2 className="display mt-6 text-4xl text-ink sm:text-5xl lg:text-6xl">{c.title}</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted">{c.text}</p>
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
    <div className="border border-line bg-surface p-8 sm:p-12">
      <h3 className="display text-3xl text-ink sm:text-4xl">{c.quoteTitle}</h3>
      <p className="mt-4 text-muted">{c.quoteText}</p>
      <Link href={href(locale, "quote")} className="btn btn-primary mt-8 w-full sm:w-auto">
        {c.quoteCta}
        <ArrowRight className="arrow size-4" aria-hidden />
      </Link>
    </div>
  );
}

/** En-tete des pages interieures. */
export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <section className="border-b border-line bg-canvas pt-16 pb-16 lg:pt-28 lg:pb-24">
      <div className="container-x">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display mt-6 text-5xl text-ink sm:text-6xl lg:text-7xl">{title}</h1>
          {text && <p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted sm:text-xl">{text}</p>}
        </Reveal>
      </div>
    </section>
  );
}

/** Bandeau d'appel a l'action en bas de page. */
export function CtaBand({ locale, t }: { locale: Locale; t: Dictionary }) {
  return (
    <section className="border-t border-line bg-canvas py-20 lg:py-28">
      <div className="container-x flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <Reveal className="max-w-2xl">
          <h2 className="display text-4xl text-ink sm:text-5xl">{t.services.ctaTitle}</h2>
          <p className="mt-5 text-lg text-muted">{t.services.ctaText}</p>
        </Reveal>
        <Reveal delay={120} className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link href={href(locale, "quote")} className="btn btn-primary">
            {t.nav.cta}
            <ArrowRight className="arrow size-4" aria-hidden />
          </Link>
          <a href={site.phoneHref} className="btn btn-outline">
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
        </Reveal>
      </div>
    </section>
  );
}
