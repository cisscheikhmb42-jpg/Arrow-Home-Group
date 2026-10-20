import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href, type RouteKey } from "@/i18n/routes";
import { serviceSlugs } from "@/content/services";
import { site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./Icon";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

export default function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const f = t.footer;
  const socials = [
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ];
  const navLinks: { key: RouteKey; label: string }[] = [
    { key: "home", label: t.nav.home },
    { key: "services", label: t.nav.services },
    { key: "projects", label: t.nav.projects },
    { key: "real-estate", label: t.nav.realEstate },
    { key: "about", label: t.nav.about },
    { key: "process", label: t.nav.process },
    { key: "contact", label: t.nav.contact },
    { key: "quote", label: t.nav.cta },
  ];

  return (
    <footer className="on-dark bg-graphite text-ash">
      <div className="container-x grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr] lg:gap-10 lg:py-20">
        <div>
          {/* Le logo (texte noir) est posé sur un fond blanc cassé pour rester lisible sans être modifié. */}
          <Link href={href(locale, "home")} aria-label={t.nav.homeLabel} className="inline-block bg-ivory px-5 py-3">
            <Logo className="h-14 w-auto" />
          </Link>
          <p className="mt-6 max-w-xs text-sm leading-relaxed">{f.about}</p>
          <ul className="mt-6 flex gap-2" aria-label={f.social}>
            {socials.map(({ href: url, label, Icon }) => (
              <li key={label}>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex size-11 items-center justify-center border border-white/15 text-white/80 transition-colors hover:border-champagne hover:text-champagne"
                >
                  <Icon className="size-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-champagne uppercase">{f.services}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {serviceSlugs.map((slug) => (
              <li key={slug}>
                <Link href={href(locale, "services", `#${slug}`)} className="transition-colors hover:text-white">
                  {t.services.items[slug].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-champagne uppercase">{f.navigation}</h2>
          <ul className="mt-5 space-y-3 text-sm">
            {navLinks.map((n) => (
              <li key={n.key}>
                <Link href={href(locale, n.key)} className="transition-colors hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-champagne uppercase">{f.contact}</h2>
          <ul className="mt-5 space-y-4 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
              <span>{t.contact.address}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-champagne" aria-hidden />
              <span className="flex flex-col gap-1">
                <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                  {site.email}
                </a>
                <a href={`mailto:${site.emailSecondary}`} className="break-all hover:text-white">
                  {site.emailSecondary}
                </a>
              </span>
            </li>
            <li>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 pl-7">
                {t.contact.hours.map((h) => (
                  <div key={h.days} className="contents">
                    <dt>{h.days}</dt>
                    <dd className="text-white">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-4 py-6 text-xs sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.legalName}. {f.rights}
          </p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link href={href(locale, "legal")} className="hover:text-white">
              {f.legal}
            </Link>
            <Link href={href(locale, "privacy")} className="hover:text-white">
              {f.privacy}
            </Link>
            <LanguageSwitcher locale={locale} label={t.nav.language} dark />
          </div>
        </div>
      </div>
    </footer>
  );
}
