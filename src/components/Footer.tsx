import Image from "next/image";
import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { nav, services, site } from "@/lib/site";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "./Icon";

export default function Footer() {
  const socials = [
    { href: site.social.facebook, label: "Facebook", Icon: FacebookIcon },
    { href: site.social.instagram, label: "Instagram", Icon: InstagramIcon },
    { href: site.social.linkedin, label: "LinkedIn", Icon: LinkedinIcon },
  ];

  return (
    <footer className="bg-brand-950 text-slate-300">
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:py-16">
        <div>
          <span className="inline-block rounded-xl bg-white px-4 py-2.5"><Image src="/brand/logo.png" alt="Arrow Home" width={320} height={190} className="h-14 w-auto" /></span>
          <p className="mt-5 text-sm leading-relaxed text-slate-400">
            Construction, rénovation, aménagement et immobilier à Dakar et dans les régions du Sénégal.
          </p>
          <ul className="mt-6 flex gap-2">
            {socials.map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="focus-ring inline-flex size-10 items-center justify-center rounded-lg bg-white/5 text-slate-200 transition-colors hover:bg-accent-500 hover:text-brand-950"
                >
                  <Icon className="size-5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Services</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {services.slice(0, 6).map((s) => (
              <li key={s.slug}>
                <Link href="/#services" className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Navigation</h2>
          <ul className="mt-4 space-y-2.5 text-sm">
            {nav.map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/devis" className="hover:text-white">
                Demander un devis
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-sm font-bold tracking-wider text-white uppercase">Contact</h2>
          <ul className="mt-4 space-y-3.5 text-sm">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden />
              {site.address}
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden />
              <a href={site.phoneHref} className="hover:text-white">
                {site.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden />
              <a href={`mailto:${site.email}`} className="break-all hover:text-white">
                {site.email}
              </a>
            </li>
            <li className="flex gap-3">
              <Clock className="mt-0.5 size-4 shrink-0 text-accent-400" aria-hidden />
              <span>
                Lun – Ven : 9h – 17h
                <br />
                Sam : 9h – 13h
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-x flex flex-col gap-2 py-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.legalName}. Tous droits réservés.</p>
          <p>Dakar, Sénégal</p>
        </div>
      </div>
    </footer>
  );
}
