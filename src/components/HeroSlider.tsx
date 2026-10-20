"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import Blueprint from "./Blueprint";
import { WhatsAppIcon } from "./Icon";
import { whatsappLink } from "@/lib/site";

export type Slide = {
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  cta: { label: string; href: string };
  /** Chemin d'une photo dans /public (ex. "/photos/chantier.jpg"). Sans photo, une illustration est affichée. */
  image?: string;
};

const DURATION = 6500;

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false);
  }, []);

  useEffect(() => {
    if (!playing || hover) return;
    const t = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(t);
  }, [index, playing, hover, go]);

  return (
    <section
      className="relative isolate overflow-hidden bg-brand-950 text-white"
      aria-roledescription="carrousel"
      aria-label="Présentation d'Arrow Home"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      {/* Arrière-plans */}
      {slides.map((s, i) => (
        <div
          key={i}
          aria-hidden
          className={`absolute inset-0 -z-10 transition-opacity duration-1000 ${i === index ? "opacity-100" : "opacity-0"}`}
        >
          {s.image ? (
            <>
              <Image
                src={s.image}
                alt=""
                fill
                priority={i === 0}
                sizes="100vw"
                className={`object-cover transition-transform duration-[7000ms] ease-out ${i === index ? "scale-105" : "scale-100"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950/95 via-brand-950/75 to-brand-950/30" />
            </>
          ) : (
            <>
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_75%_40%,#0a64a4_0%,#002f52_45%,#001526_100%)]" />
              <Blueprint
                variant={i % 4}
                className={`absolute top-1/2 right-[-12%] h-[115%] -translate-y-1/2 opacity-40 transition-transform duration-[7000ms] ease-out sm:right-[-6%] lg:right-[-7%] lg:h-[88%] lg:opacity-80 ${
                  i === index ? "scale-105" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-brand-950 via-brand-950/70 to-transparent lg:via-brand-950/60" />
            </>
          )}
        </div>
      ))}

      <div className="container-x relative flex min-h-[calc(100svh-4rem)] flex-col justify-center py-20 sm:min-h-[38rem] lg:min-h-[calc(100svh-5rem)] lg:max-h-[52rem] lg:py-24">
        <div className="relative max-w-2xl">
          {slides.map((s, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${count}`}
              aria-hidden={i !== index}
              className={`transition-all duration-700 ${
                i === index
                  ? "relative translate-y-0 opacity-100 delay-200"
                  : "pointer-events-none absolute inset-x-0 top-0 translate-y-6 opacity-0"
              }`}
            >
              <p className="eyebrow eyebrow-light">{s.eyebrow}</p>
              <h1 className="mt-5 text-[2.5rem] leading-[1.05] font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
                {s.title} <span className="text-accent-400">{s.highlight}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100 sm:text-xl">{s.text}</p>
              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  href={s.cta.href}
                  tabIndex={i === index ? 0 : -1}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg bg-accent-500 px-7 py-4 font-bold text-brand-950 transition-colors hover:bg-accent-400"
                >
                  {s.cta.label}
                  <ArrowRight className="size-5" aria-hidden />
                </Link>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  tabIndex={i === index ? 0 : -1}
                  className="focus-ring inline-flex items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/5 px-7 py-4 font-bold backdrop-blur transition-colors hover:bg-white/15"
                >
                  <WhatsAppIcon className="size-5" />
                  Écrire sur WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Contrôles */}
        <div className="mt-14 flex items-center gap-4 sm:mt-16">
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => go(index - 1)}
              className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
              aria-label="Diapositive précédente"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              className="focus-ring inline-flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:bg-white/10"
              aria-label="Diapositive suivante"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
          <ol className="flex flex-1 gap-2 sm:max-w-sm">
            {slides.map((s, i) => (
              <li key={i} className="flex-1">
                <button
                  type="button"
                  onClick={() => go(i)}
                  className="focus-ring group block w-full rounded py-3"
                  aria-label={`Aller à la diapositive ${i + 1} : ${s.eyebrow}`}
                  aria-current={i === index}
                >
                  <span className="block h-1 overflow-hidden rounded-full bg-white/20">
                    <span
                      key={`${index}-${playing && !hover}`}
                      className="block h-full rounded-full bg-accent-400"
                      style={{
                        width: i < index ? "100%" : i === index ? undefined : "0%",
                        animation:
                          i === index && playing && !hover ? `ah-progress ${DURATION}ms linear forwards` : undefined,
                        ...(i === index && (!playing || hover) ? { width: "100%" } : {}),
                      }}
                    />
                  </span>
                </button>
              </li>
            ))}
          </ol>
          <button
            type="button"
            onClick={() => setPlaying((p) => !p)}
            className="focus-ring inline-flex size-11 items-center justify-center rounded-full text-white/70 hover:text-white"
            aria-label={playing ? "Mettre en pause le défilement" : "Relancer le défilement"}
          >
            {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
          </button>
          <p className="hidden text-sm font-semibold text-white/60 tabular-nums sm:block">
            {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
