"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import type { Locale } from "@/i18n/config";
import { href, type RouteKey } from "@/i18n/routes";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { site } from "@/lib/site";
import LanguageSwitcher from "./LanguageSwitcher";
import Logo from "./Logo";

const items: { key: RouteKey; label: keyof Dictionary["nav"] }[] = [
  { key: "home", label: "home" },
  { key: "services", label: "services" },
  { key: "projects", label: "projects" },
  { key: "about", label: "about" },
  { key: "process", label: "process" },
  { key: "contact", label: "contact" },
];

export default function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const pathname = usePathname() || "";
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isActive = (key: RouteKey) => {
    const target = href(locale, key);
    return key === "home" ? pathname === target : pathname === target || pathname.startsWith(`${target}/`);
  };

  return (
    <>
    <header
      className={`sticky top-0 z-50 border-b bg-white/95 backdrop-blur-md transition-[border-color,box-shadow] duration-300 ${
        scrolled ? "border-mist shadow-[0_10px_30px_-20px_rgba(23,25,28,0.35)]" : "border-transparent"
      }`}
    >
      <div className="container-x flex h-[4.5rem] items-center justify-between gap-6 lg:h-24">
        <Link href={href(locale, "home")} className="flex shrink-0 items-center" aria-label={t.homeLabel}>
          <Logo priority className="h-12 w-auto lg:h-16" />
        </Link>

        <nav aria-label={t.mainNav} className="hidden xl:block">
          <ul className="flex items-center gap-5 2xl:gap-8">
            {items.map((item) => {
              const active = isActive(item.key);
              return (
                <li key={item.key}>
                  <Link
                    href={href(locale, item.key)}
                    aria-current={active ? "page" : undefined}
                    className={`relative py-2 text-[13px] font-semibold whitespace-nowrap tracking-[0.1em] uppercase transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-champagne after:transition-transform after:duration-300 lang-zh:tracking-normal ${
                      active ? "text-graphite after:scale-x-100" : "text-stone after:scale-x-0 hover:text-graphite hover:after:scale-x-100"
                    }`}
                  >
                    {t[item.label]}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-4">
          <LanguageSwitcher locale={locale} label={t.language} className="hidden md:flex" />
          <Link href={href(locale, "quote")} className="btn btn-dark hidden min-h-11 px-5 py-2.5 text-xs whitespace-nowrap sm:inline-flex xl:hidden wide:inline-flex">
            {t.cta}
          </Link>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="inline-flex size-11 items-center justify-center text-graphite xl:hidden"
            aria-label={t.openMenu}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu className="size-6" strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </header>

      {open && (
        <div id="mobile-menu" className="fixed inset-0 z-[60] xl:hidden" role="dialog" aria-modal="true" aria-label={t.menu}>
          <div className="absolute inset-0 bg-graphite/60" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 flex w-[min(26rem,100vw)] flex-col bg-white">
            <div className="flex h-[4.5rem] items-center justify-between border-b border-mist px-5">
              <Logo className="h-11 w-auto" />
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="inline-flex size-11 items-center justify-center text-graphite"
                aria-label={t.closeMenu}
                autoFocus
              >
                <X className="size-6" strokeWidth={1.5} />
              </button>
            </div>
            <nav aria-label={t.mobileNav} className="flex-1 overflow-y-auto px-5 py-6">
              <ul className="divide-y divide-mist">
                {items.map((item) => {
                  const active = isActive(item.key);
                  return (
                    <li key={item.key}>
                      <Link
                        href={href(locale, item.key)}
                        onClick={() => setOpen(false)}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between py-4 text-lg ${active ? "font-semibold text-graphite" : "text-anthracite"}`}
                      >
                        {t[item.label]}
                        {active && <span aria-hidden className="h-px w-8 bg-champagne" />}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <LanguageSwitcher locale={locale} label={t.language} className="mt-6 -ml-2" onNavigate={() => setOpen(false)} />
            </nav>
            <div className="space-y-3 border-t border-mist p-5">
              <Link href={href(locale, "quote")} onClick={() => setOpen(false)} className="btn btn-dark w-full">
                {t.cta}
                <ArrowRight className="arrow size-4" aria-hidden />
              </Link>
              <a href={site.phoneHref} className="btn btn-outline-dark w-full">
                <Phone className="size-4" aria-hidden />
                {site.phone}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
