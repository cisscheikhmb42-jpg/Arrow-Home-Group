import Link from "next/link";
import { FileText, Phone } from "lucide-react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { href } from "@/i18n/routes";
import { site, whatsappLink } from "@/lib/site";
import { WhatsAppIcon } from "./Icon";

/** Barre d'actions fixée en bas de l'écran sur téléphone et tablette : appeler, WhatsApp, devis. */
export default function MobileActionBar({ locale, t }: { locale: Locale; t: Dictionary }) {
  const m = t.hero.mobileBar;
  const item = "flex flex-1 flex-col items-center justify-center gap-1 py-2.5 text-[11px] font-medium tracking-[0.08em] uppercase";
  return (
    <nav
      aria-label={m.label}
      className="fixed inset-x-0 bottom-0 z-40 flex border-t border-line bg-canvas/90 pb-[env(safe-area-inset-bottom)] shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.5)] backdrop-blur lg:hidden"
    >
      <a href={site.phoneHref} className={`${item} text-ink`}>
        <Phone className="size-5" strokeWidth={1.75} aria-hidden />
        {m.call}
      </a>
      <a
        href={whatsappLink(t.contact.whatsappMsg)}
        target="_blank"
        rel="noopener noreferrer"
        className={`${item} border-x border-line text-[#25d366]`}
      >
        <WhatsAppIcon className="size-5" />
        {m.whatsapp}
      </a>
      <Link href={href(locale, "quote")} className={`${item} bg-accent text-on-accent`}>
        <FileText className="size-5" strokeWidth={1.75} aria-hidden />
        {m.quote}
      </Link>
    </nav>
  );
}
