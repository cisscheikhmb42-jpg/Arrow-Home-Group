import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import Blueprint from "@/components/Blueprint";
import BrandMark from "@/components/BrandMark";
import HeroSlider, { type Slide } from "@/components/HeroSlider";
import Icon, { InstagramIcon, WhatsAppIcon } from "@/components/Icon";
import Marquee from "@/components/Marquee";
import Reveal from "@/components/Reveal";
import ScrollCarousel from "@/components/ScrollCarousel";
import { services, site, steps, strengths, whatsappLink } from "@/lib/site";

const slides: Slide[] = [
  {
    eyebrow: "Construction & BTP",
    title: "Nous bâtissons vos projets",
    highlight: "avec exigence.",
    text: "Villas, immeubles, bâtiments commerciaux : de l'étude au gros œuvre, nous livrons des constructions solides et soignées, partout au Sénégal.",
    cta: { label: "Demander un devis gratuit", href: "/devis?service=construction-btp" },
  },
  {
    eyebrow: "Rénovation & aménagement intérieur",
    title: "Donnez une nouvelle vie",
    highlight: "à vos espaces.",
    text: "Rénovation complète, finitions haut de gamme, menuiserie aluminium et bois, décoration : nous transformons villas, appartements et bureaux.",
    cta: { label: "Rénover mon espace", href: "/devis?service=renovation" },
  },
  {
    eyebrow: "Immobilier",
    title: "Trouvez le bien",
    highlight: "qui vous ressemble.",
    text: "Terrains, villas, appartements et locaux à vendre ou à louer à Dakar et dans les régions, avec un accompagnement de la visite à la signature.",
    cta: { label: "Voir les biens disponibles", href: "/immobilier" },
  },
  {
    eyebrow: "Hôtels & ascenseurs",
    title: "Des solutions complètes",
    highlight: "pour les grands projets.",
    text: "Projets hôteliers, résidences, immeubles : construction, aménagement, ascenseurs et espaces extérieurs coordonnés par une seule équipe.",
    cta: { label: "Présenter mon projet", href: "/devis?service=projets-hoteliers" },
  },
];

export default function Home() {
  return (
    <>
      <HeroSlider slides={slides} />
      <Marquee items={services.map((s) => s.title)} />

      {/* ───────────── INTRO + ENGAGEMENTS ───────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_1fr] lg:items-end lg:gap-20">
            <Reveal>
              <p className="eyebrow">Arrow Home Group</p>
              <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight text-balance sm:text-5xl">
                Un seul partenaire, de la première pierre à la remise des clés.
              </h2>
            </Reveal>
            <Reveal delay={150}>
              <p className="text-lg leading-relaxed text-slate-600">
                Basés à la Médina, à Dakar, nous réunissons dans une même entreprise la construction, la rénovation, les
                finitions, la menuiserie, les ascenseurs et l&apos;immobilier. Résultat : moins d&apos;intermédiaires, des
                délais maîtrisés et un interlocuteur unique qui répond de la qualité de bout en bout.
              </p>
            </Reveal>
          </div>

          <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {strengths.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 100} className="rounded-2xl border border-slate-200 p-6 sm:p-7">
                <span className="inline-flex size-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={s.icon} className="size-6" />
                </span>
                <h3 className="mt-5 text-lg font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── SERVICES ───────────── */}
      <section id="services" className="bg-slate-50 py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Nos métiers</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">9 expertises au service de vos projets</h2>
            </div>
            <Link
              href="/devis"
              className="focus-ring inline-flex items-center gap-2 self-start rounded-lg bg-brand-600 px-6 py-3.5 font-bold text-white hover:bg-brand-700 lg:self-auto"
            >
              Demander un devis
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Reveal>

          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal
                as="li"
                key={s.slug}
                delay={(i % 3) * 120}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 hover:!-translate-y-1 hover:border-brand-200 hover:shadow-2xl hover:shadow-brand-900/10"
              >
                <span className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-accent-500 transition-transform duration-500 group-hover:scale-x-100" aria-hidden />
                <div className="flex items-start justify-between">
                  <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-brand-600 text-white transition-colors duration-300 group-hover:bg-brand-900">
                    <Icon name={s.icon} className="size-7" />
                  </span>
                  <span className="text-sm font-extrabold text-slate-300 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{s.short}</p>
                <ul className="mt-5 space-y-2 border-t border-slate-100 pt-5 text-sm text-slate-700">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <CheckCircle2 className="size-4 shrink-0 text-accent-600" aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link
                  href={`/devis?service=${s.slug}`}
                  className="focus-ring mt-7 inline-flex items-center gap-1.5 self-start rounded text-sm font-bold text-brand-600 after:absolute after:inset-0 group-hover:text-brand-800"
                >
                  Demander un devis
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── À PROPOS ───────────── */}
      <section id="apropos" className="relative overflow-hidden bg-brand-950 py-20 text-white lg:py-28">
        <BrandMark className="pointer-events-none absolute -right-32 -bottom-24 w-[34rem] opacity-[0.06]" mono />
        <div className="container-x relative grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <p className="eyebrow eyebrow-light">À propos</p>
            <h2 className="mt-4 text-3xl leading-tight font-extrabold tracking-tight sm:text-5xl">
              Bâtir, transformer et valoriser vos espaces.
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-brand-100">
              <p>
                Arrow Home Group accompagne particuliers, entreprises et investisseurs dans leurs projets de construction,
                de rénovation, d&apos;aménagement et d&apos;immobilier.
              </p>
              <p>
                Nous intervenons à Dakar et dans la plupart des régions du Sénégal, avec une même promesse : un travail
                soigné, livré dans les délais convenus et au prix annoncé.
              </p>
            </div>
            <Link
              href="/devis"
              className="focus-ring mt-9 inline-flex items-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold text-brand-950 hover:bg-accent-400"
            >
              Parler de votre projet
              <ArrowRight className="size-5" aria-hidden />
            </Link>
          </Reveal>

          <ul className="grid gap-4 sm:grid-cols-2">
            {[
              ["Écoute", "Chaque projet commence par une visite et une vraie compréhension de vos besoins."],
              ["Transparence", "Un devis détaillé, des étapes claires et des points d'avancement réguliers."],
              ["Exigence", "Des matériaux choisis avec soin et un contrôle qualité à chaque étape."],
              ["Engagement", "Nous restons à vos côtés après la livraison de votre projet."],
            ].map(([t, d], i) => (
              <Reveal
                as="li"
                key={t}
                delay={i * 120}
                className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur sm:p-7"
              >
                <span className="text-sm font-extrabold text-accent-400 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                <p className="mt-3 text-xl font-bold">{t}</p>
                <p className="mt-2 text-[15px] leading-relaxed text-brand-100">{d}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* ───────────── PROCESSUS ───────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Notre méthode</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Votre projet en 4 étapes</h2>
          </Reveal>
          <ol className="relative mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            <span className="absolute top-7 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-brand-200 via-accent-500 to-brand-200 lg:block" aria-hidden />
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 150} className="relative text-center">
                <span className="relative mx-auto flex size-14 items-center justify-center rounded-full bg-brand-600 text-lg font-extrabold text-white ring-8 ring-white">
                  {i + 1}
                </span>
                <h3 className="mt-6 text-xl font-bold">{s.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-[15px] leading-relaxed text-slate-600">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ───────────── RÉALISATIONS ───────────── */}
      <section id="realisations" className="overflow-hidden bg-slate-50 py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl">
              <p className="eyebrow">Réalisations</p>
              <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Nos chantiers en images</h2>
              <p className="mt-4 text-lg text-slate-600">
                Notre galerie de projets arrive très bientôt. Suivez nos chantiers au quotidien sur Instagram.
              </p>
            </div>
            <a
              href={site.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="focus-ring inline-flex items-center gap-2 self-start rounded-lg border border-slate-300 bg-white px-5 py-3 font-bold text-slate-800 hover:border-brand-600 hover:text-brand-600 sm:self-auto"
            >
              <InstagramIcon className="size-5" />
              @arrowhome_group
            </a>
          </Reveal>

          <div className="mt-6">
            <ScrollCarousel label="Catégories de réalisations">
              {[
                ["Construction", "Villas et immeubles", 0],
                ["Rénovation", "Villas et appartements", 2],
                ["Aménagement intérieur", "Salons, cuisines, bureaux", 1],
                ["Projets hôteliers", "Hôtels et résidences", 3],
                ["Menuiserie", "Aluminium et bois", 2],
                ["Aménagement extérieur", "Façades et terrasses", 0],
              ].map(([t, sub, v]) => (
                <li key={t as string} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[31%]">
                  <div className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-2xl bg-[radial-gradient(ellipse_at_70%_30%,#0a64a4_0%,#002f52_55%,#001526_100%)] p-6 text-white">
                    <Blueprint variant={v as number} className="absolute inset-0 h-full w-full opacity-60 transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-950 via-brand-950/30 to-transparent" />
                    <div className="relative">
                      <p className="inline-block rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-wider uppercase backdrop-blur">
                        Photos à venir
                      </p>
                      <p className="mt-3 text-2xl font-extrabold">{t}</p>
                      <p className="mt-1 text-brand-100">{sub}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ScrollCarousel>
          </div>
        </div>
      </section>

      {/* ───────────── IMMOBILIER ───────────── */}
      <section className="py-20 lg:py-28">
        <div className="container-x">
          <Reveal className="relative overflow-hidden rounded-3xl bg-brand-900 text-white">
            <div className="grid lg:grid-cols-2">
              <div className="relative px-6 py-14 sm:px-12 lg:px-16 lg:py-20">
                <p className="eyebrow eyebrow-light">Immobilier</p>
                <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">
                  Terrain, villa ou appartement ?
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-brand-100">
                  Découvrez nos biens à vendre et à louer à Dakar et dans les régions, et faites-vous accompagner de la
                  recherche jusqu&apos;à la signature.
                </p>
                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                  <Link
                    href="/immobilier"
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold text-brand-950 hover:bg-accent-400"
                  >
                    Voir les biens
                    <ArrowRight className="size-5" aria-hidden />
                  </Link>
                  <a
                    href={whatsappLink("Bonjour Arrow Home, je cherche un bien immobilier.")}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-white/25 px-7 py-4 font-bold hover:bg-white/10"
                  >
                    Confier ma recherche
                  </a>
                </div>
              </div>
              <div className="relative hidden min-h-80 lg:block">
                <Blueprint variant={2} className="absolute inset-0 h-full w-full" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ───────────── CONTACT ───────────── */}
      <section id="contact" className="border-t border-slate-100 py-20 lg:py-28">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-5xl">Parlons de votre projet</h2>
            <p className="mt-4 text-lg text-slate-600">
              Appelez-nous, écrivez-nous sur WhatsApp ou passez à notre bureau. La consultation est gratuite.
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              {[
                { href: site.phoneHref, label: "Téléphone", value: site.phone, icon: <Phone className="size-5" aria-hidden />, bg: "bg-brand-600" },
                { href: whatsappLink(), label: "WhatsApp", value: site.phone, icon: <WhatsAppIcon className="size-5" />, bg: "bg-[#25D366]", ext: true },
                { href: `mailto:${site.email}`, label: "Email", value: site.email, icon: <Mail className="size-5" aria-hidden />, bg: "bg-brand-600" },
                { label: "Bureau", value: site.address, icon: <MapPin className="size-5" aria-hidden />, bg: "bg-brand-600" },
              ].map((c) => {
                const inner = (
                  <>
                    <span className={`inline-flex size-11 shrink-0 items-center justify-center rounded-lg text-white ${c.bg}`}>{c.icon}</span>
                    <span className="min-w-0">
                      <span className="block text-sm text-slate-500">{c.label}</span>
                      <span className="block truncate font-bold">{c.value}</span>
                    </span>
                  </>
                );
                return (
                  <li key={c.label}>
                    {c.href ? (
                      <a
                        href={c.href}
                        {...(c.ext ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="focus-ring flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition-colors hover:border-brand-200 hover:bg-brand-50/50"
                      >
                        {inner}
                      </a>
                    ) : (
                      <div className="flex items-center gap-4 rounded-xl border border-slate-200 p-4">{inner}</div>
                    )}
                  </li>
                );
              })}
              <li className="flex items-start gap-4 rounded-xl border border-slate-200 p-4 sm:col-span-2 lg:col-span-1">
                <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white">
                  <Clock className="size-5" aria-hidden />
                </span>
                <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
                  {site.hours.map((h) => (
                    <div key={h.days} className="contents">
                      <dt className="text-slate-500">{h.days}</dt>
                      <dd className="font-bold">{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </li>
            </ul>
          </Reveal>

          <Reveal delay={150} className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
              <iframe
                title="Plan d'accès : Avenue Malick Sy, Médina, Dakar"
                src="https://maps.google.com/maps?q=Avenue%20Malick%20Sy%2C%20M%C3%A9dina%2C%20Dakar&z=15&output=embed"
                className="block h-72 w-full lg:h-96"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div className="relative overflow-hidden rounded-2xl bg-brand-900 p-8 text-white sm:p-10">
              <BrandMark className="absolute -right-8 -bottom-10 w-48 opacity-20" />
              <h3 className="relative text-2xl font-extrabold sm:text-3xl">Besoin d&apos;un devis ?</h3>
              <p className="relative mt-2 text-brand-100">Décrivez votre projet en 2 minutes. Nous vous recontactons rapidement.</p>
              <Link
                href="/devis"
                className="focus-ring relative mt-6 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold text-brand-950 hover:bg-accent-400 sm:w-auto"
              >
                Demander un devis gratuit
                <ArrowRight className="size-5" aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
