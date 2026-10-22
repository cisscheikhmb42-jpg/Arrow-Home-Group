import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { serviceMeta, serviceSlugs } from "@/content/services";
import { site, whatsappLink } from "@/lib/site";
import Icon, { WhatsAppIcon } from "./Icon";

/** Encadré « Quel est votre projet ? » : un clic ouvre le devis déjà rempli avec la prestation choisie. */
export default function QuickQuote({ locale, t }: { locale: Locale; t: Dictionary }) {
  const q = t.hero.quick;
  const quote = href(locale, "quote");
  return (
    <div className="border border-line bg-raised p-6 shadow-[0_24px_60px_-30px_rgba(0,0,0,0.6)] sm:p-8">
      <span className="block h-0.5 w-10 bg-accent" aria-hidden />
      <h2 className="display mt-5 text-2xl text-ink sm:text-3xl">{q.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{q.text}</p>
      <ul className="mt-6 grid grid-cols-2 gap-2">
        {serviceSlugs.map((slug) => (
          <li key={slug}>
            <Link
              href={`${quote}?service=${slug}`}
              className="flex h-full min-h-12 items-center gap-2.5 border border-line px-3 py-2.5 text-[13px] leading-tight font-medium text-ink transition-colors hover:border-accent hover:bg-raised focus-visible:border-accent"
            >
              <Icon name={serviceMeta[slug].icon} className="size-4 shrink-0" strokeWidth={1.75} />
              {t.services.items[slug].title}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={quote}
            className="flex h-full min-h-12 items-center justify-between gap-2 bg-accent px-3 py-2.5 text-[13px] leading-tight font-medium text-on-accent transition-colors hover:bg-accent-hover"
          >
            {q.other}
            <ArrowRight className="size-4 shrink-0" aria-hidden />
          </Link>
        </li>
      </ul>
      <p className="mt-6 text-xs font-medium tracking-[0.18em] text-muted uppercase">{q.or}</p>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <a href={site.phoneHref} className="btn btn-outline px-3">
          <Phone className="size-4" aria-hidden />
          {q.call}
        </a>
        <a
          href={whatsappLink(t.contact.whatsappMsg)}
          target="_blank"
          rel="noopener noreferrer"
          className="btn border-[#25d366] px-3 text-[#25d366] hover:bg-[#25d366] hover:text-canvas"
        >
          <WhatsAppIcon className="size-4" />
          {q.whatsapp}
        </a>
      </div>
    </div>
  );
}
