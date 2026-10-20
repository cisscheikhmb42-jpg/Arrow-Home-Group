import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { CtaBand } from "@/components/sections/Blocks";
import { categoryService, projects } from "@/content/portfolio";
import { fill, getDictionary } from "@/i18n";
import { locales, type Locale } from "@/i18n/config";
import { href } from "@/i18n/routes";
import { pageMetadata } from "@/lib/seo";

/** Fiche projet : générée uniquement pour les réalisations réelles déclarées dans src/content/portfolio.ts. */
export const dynamicParams = false;
export function generateStaticParams() {
  // Next.js exige au moins une entrée en export statique ; un slug réservé renvoie une 404 tant qu'aucun projet n'existe.
  const list = projects.length ? projects : [{ slug: "_" }];
  return locales.flatMap((locale) => list.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale; slug: string }> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) return {};
  return pageMetadata(locale, "projects", { title: p.title[locale], description: p.summary[locale], rest: `/${slug}` });
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: Locale; slug: string }> }) {
  const { locale, slug } = await params;
  const p = projects.find((x) => x.slug === slug);
  if (!p) notFound();
  const t = getDictionary(locale);
  const d = t.portfolio.detail;
  const title = p.title[locale];

  return (
    <>
      <article>
        <header className="bg-ivory pt-12 pb-14 lg:pt-20">
          <div className="container-x">
            <Link href={href(locale, "projects")} className="link-line text-graphite">
              <ArrowLeft className="size-4" aria-hidden />
              {d.back}
            </Link>
            <p className="eyebrow mt-12">{t.portfolio.categories[p.category]}</p>
            <h1 className="display mt-6 max-w-4xl text-5xl text-graphite sm:text-6xl lg:text-7xl">{title}</h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone">{p.summary[locale]}</p>
          </div>
        </header>
        <div className="relative aspect-[16/9] max-h-[80vh] w-full bg-graphite">
          <Image src={p.cover} alt={fill(d.image, { title })} fill priority sizes="100vw" className="object-cover" />
        </div>
        <div className="container-x grid gap-14 py-20 lg:grid-cols-[1fr_2fr] lg:gap-24">
          <dl className="space-y-6 border-t border-graphite pt-6 text-sm">
            <div>
              <dt className="tracking-[0.18em] text-stone uppercase">{d.category}</dt>
              <dd className="mt-1 text-lg text-graphite">{t.portfolio.categories[p.category]}</dd>
            </div>
            {p.location && (
              <div>
                <dt className="tracking-[0.18em] text-stone uppercase">{d.location}</dt>
                <dd className="mt-1 text-lg text-graphite">{p.location[locale]}</dd>
              </div>
            )}
          </dl>
          <div className="space-y-12">
            {p.services.length > 0 && (
              <section>
                <h2 className="display text-3xl text-graphite">{d.services}</h2>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {p.services.map((s) => <li key={s.fr} className="border-b border-mist py-3">{s[locale]}</li>)}
                </ul>
              </section>
            )}
            {p.highlights.length > 0 && (
              <section>
                <h2 className="display text-3xl text-graphite">{d.highlights}</h2>
                <ul className="mt-5 space-y-3">
                  {p.highlights.map((s) => <li key={s.fr}>{s[locale]}</li>)}
                </ul>
              </section>
            )}
            <Link href={`${href(locale, "quote")}?service=${categoryService[p.category]}`} className="btn btn-dark">
              {d.cta}
              <ArrowRight className="arrow size-4" aria-hidden />
            </Link>
          </div>
        </div>
        {p.gallery.length > 0 && (
          <section className="container-x pb-24">
            <h2 className="display text-3xl text-graphite">{d.gallery}</h2>
            <ul className="mt-8 grid gap-6 sm:grid-cols-2">
              {p.gallery.map((src, i) => (
                <li key={src} className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image src={src} alt={`${fill(d.image, { title })} (${i + 2})`} fill sizes="(min-width:640px) 50vw, 100vw" className="object-cover" />
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
      <CtaBand locale={locale} t={t} />
    </>
  );
}
