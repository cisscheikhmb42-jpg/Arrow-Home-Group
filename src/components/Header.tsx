"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { nav, site } from "@/lib/site";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${
        scrolled ? "shadow-[0_1px_0_rgba(15,23,32,0.08),0_8px_24px_-12px_rgba(15,23,32,0.18)]" : ""
      }`}
    >
      <div className="container-x flex h-16 items-center justify-between gap-4 lg:h-20">
        <Link href="/" className="focus-ring flex shrink-0 items-center rounded" aria-label="Arrow Home, accueil">
          <Image src="/brand/logo.png" alt="Arrow Home" width={320} height={190} priority className="h-12 w-auto lg:h-16" />
        </Link>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring rounded-md px-3 py-2 text-[15px] font-semibold text-slate-700 transition-colors hover:text-brand-600"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={site.phoneHref}
            className="focus-ring hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-semibold text-brand-700 xl:flex"
          >
            <Phone className="size-4" aria-hidden />
            {site.phone}
          </a>
          <Link
            href="/devis"
            className="focus-ring hidden rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-brand-700 sm:inline-flex"
          >
            Demander un devis
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="focus-ring inline-flex size-11 items-center justify-center rounded-lg text-brand-800 lg:hidden"
            aria-label="Ouvrir le menu"
            aria-expanded={open}
          >
            <Menu className="size-6" />
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <div className="absolute inset-0 bg-brand-950/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[min(22rem,88vw)] flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b border-slate-100 px-4">
              <Image src="/brand/logo.png" alt="Arrow Home" width={320} height={190} className="h-10 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="focus-ring inline-flex size-11 items-center justify-center rounded-lg text-brand-800"
                aria-label="Fermer le menu"
              >
                <X className="size-6" />
              </button>
            </div>
            <nav aria-label="Navigation mobile" className="flex-1 overflow-y-auto px-2 py-4">
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="focus-ring block rounded-lg px-4 py-3.5 text-lg font-semibold text-slate-800 hover:bg-brand-50"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="space-y-3 border-t border-slate-100 p-4">
              <Link
                href="/devis"
                onClick={() => setOpen(false)}
                className="focus-ring flex w-full items-center justify-center rounded-lg bg-brand-600 px-5 py-3.5 font-bold text-white"
              >
                Demander un devis
              </Link>
              <a
                href={site.phoneHref}
                className="focus-ring flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 px-5 py-3.5 font-semibold text-brand-700"
              >
                <Phone className="size-4" aria-hidden />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
