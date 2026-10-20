"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fill } from "@/i18n/fill";
import Blueprint from "./Blueprint";

export type Slide = {
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Illustration affichée tant qu'aucune photo n'est fournie. */
  variant: number;
  /** Photo dans /public (ex. "/photos/hero/facade.jpg"), à utiliser uniquement avec des images dont les droits sont acquis. */
  image?: string;
};

const DURATION = 7000;

export default function HeroSlider({ slides, t }: { slides: Slide[]; t: Dictionary["hero"] }) {
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
    const timer = setTimeout(() => go(index + 1), DURATION);
    return () => clearTimeout(timer);
  }, [index, playing, hover, go]);

  const running = playing && !hover;

  return (
    <section
      className="on-dark relative isolate overflow-hidden bg-graphite text-white"
      aria-roledescription="carousel"
      aria-label={t.carousel}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onFocusCapture={() => setHover(true)}
      onBlurCapture={() => setHover(false)}
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
                className={`object-cover transition-transform duration-[8000ms] ease-out ${i === index ? "scale-105" : "scale-100"}`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-graphite/95 via-graphite/75 to-graphite/30" />
            </>
          ) : (
            <>
              <Blueprint
                variant={s.variant}
                className={`absolute inset-y-0 right-0 h-full w-full opacity-35 transition-transform duration-[8000ms] ease-out lg:w-[62%] lg:opacity-90 ${
                  i === index ? "scale-[1.04]" : "scale-100"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-graphite via-graphite/85 to-graphite/10 lg:via-graphite/70" />
            </>
          )}
        </div>
      ))}

      <div className="container-x relative flex min-h-[calc(100svh-4.5rem)] flex-col justify-center pt-16 pb-28 sm:min-h-[40rem] lg:min-h-[calc(100svh-6rem)] lg:max-h-[56rem] lg:pt-20">
        <div className="relative max-w-3xl">
          {slides.map((s, i) => (
            <div
              key={i}
              role="group"
              aria-roledescription={t.slide}
              aria-label={fill(t.slideOf, { n: i + 1, total: count })}
              aria-hidden={i !== index}
              inert={i !== index}
              className={`transition-all duration-700 ${
                i === index
                  ? "relative translate-y-0 opacity-100 delay-200"
                  : "pointer-events-none absolute inset-x-0 top-0 translate-y-5 opacity-0"
              }`}
            >
              <p className="eyebrow eyebrow-light">{s.eyebrow}</p>
              {i === 0 ? (
                <h1 className="display mt-7 text-[2.75rem] sm:text-7xl lg:text-[5.5rem]">
                  <span className="block">{s.title}</span>
                  <span className="block text-champagne italic lang-zh:not-italic">{s.highlight}</span>
                </h1>
              ) : (
                <p className="display mt-7 text-[2.75rem] sm:text-7xl lg:text-[5.5rem]">
                  <span className="block">{s.title}</span>
                  <span className="block text-champagne italic lang-zh:not-italic">{s.highlight}</span>
                </p>
              )}
              <p className="mt-8 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg">{s.text}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href={s.cta.href} className="btn btn-champagne">
                  {s.cta.label}
                  <ArrowRight className="arrow size-4" aria-hidden />
                </Link>
                <Link href={s.secondary.href} className="btn btn-outline-light">
                  {s.secondary.label}
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Commandes */}
        <div className="absolute inset-x-0 bottom-0 pb-8">
          <div className="container-x flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-champagne hover:text-champagne"
                aria-label={t.prev}
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-white/25 transition-colors hover:border-champagne hover:text-champagne"
                aria-label={t.next}
              >
                <ChevronRight className="size-5" strokeWidth={1.5} />
              </button>
            </div>
            <ol className="flex flex-1 gap-2 sm:max-w-xs">
              {slides.map((s, i) => (
                <li key={i} className="flex-1">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    className="block w-full py-4"
                    aria-label={fill(t.goTo, { n: i + 1, name: s.eyebrow })}
                    aria-current={i === index ? "true" : undefined}
                  >
                    <span className="block h-px overflow-hidden bg-white/25">
                      <span
                        key={`${index}-${running}`}
                        className="block h-full bg-champagne"
                        style={{
                          width: i < index || (i === index && !running) ? "100%" : i === index ? undefined : "0%",
                          animation: i === index && running ? `ah-progress ${DURATION}ms linear forwards` : undefined,
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
              className="inline-flex size-11 items-center justify-center rounded-full text-white/70 hover:text-white"
              aria-label={playing ? t.pause : t.play}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <p className="hidden text-xs font-semibold tracking-[0.2em] text-white/60 tabular-nums sm:block">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
            <a href="#contenu-suite" className="ml-auto hidden items-center gap-3 text-xs tracking-[0.2em] text-white/60 uppercase hover:text-white lg:flex">
              {t.scroll}
              <span aria-hidden className="relative block h-10 w-px overflow-hidden bg-white/20">
                <span className="absolute inset-x-0 top-0 h-1/2 animate-[ah-scroll-cue_2.2s_ease-in-out_infinite] bg-champagne motion-reduce:animate-none" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
