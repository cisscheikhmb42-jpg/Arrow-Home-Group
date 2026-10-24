"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fill } from "@/i18n/fill";

export type Slide = {
  eyebrow: string;
  title: string;
  highlight: string;
  text: string;
  cta: { label: string; href: string };
  secondary: { label: string; href: string };
  /** Photo dans /public (ex. "/photos/hero/facade.jpg"), affichée a droite du texte. A ajouter des reception des photos. */
  image?: string;
};

const DURATION = 7000;

export default function HeroSlider({
  slides,
  t,
  aside,
}: {
  slides: Slide[];
  t: Dictionary["hero"];
  /** Encadré affiché à droite sur grand écran quand il n'y a pas de photo (ex. choix rapide de prestation). */
  aside?: React.ReactNode;
}) {
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;
  const hasImages = slides.some((s) => s.image);

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
      className="hero-glow relative isolate overflow-hidden border-b border-line text-ink"
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
      {hasImages &&
        slides.map((s, i) =>
          s.image ? (
            <div
              key={i}
              aria-hidden
              className={`absolute inset-y-0 right-0 -z-10 hidden w-[45%] transition-opacity duration-1000 lg:block ${i === index ? "opacity-100" : "opacity-0"}`}
            >
              <Image src={s.image} alt="" fill priority={i === 0} sizes="45vw" className="object-cover" />
            </div>
          ) : null,
        )}

      <div
        className={`container-x relative grid min-h-[34rem] items-center gap-12 pt-14 pb-28 lg:min-h-[44rem] lg:pt-16 ${
          aside && !hasImages ? "lg:grid-cols-[minmax(0,1fr)_25rem] xl:gap-20" : ""
        }`}
      >
        <div className={`relative ${hasImages ? "max-w-2xl lg:max-w-[50%]" : "max-w-4xl"}`}>
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
              <p className="eyebrow">{s.eyebrow}</p>
              {i === 0 ? (
                <h1 className="display mt-7 text-[2.5rem] sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]">
                  <span className="block">{s.title}</span>
                  <span className="block text-sky">{s.highlight}</span>
                </h1>
              ) : (
                <p className="display mt-7 text-[2.5rem] sm:text-6xl lg:text-[3.75rem] xl:text-[4.25rem]">
                  <span className="block">{s.title}</span>
                  <span className="block text-sky">{s.highlight}</span>
                </p>
              )}
              <p className="mt-8 max-w-2xl text-base leading-relaxed text-ink sm:text-lg">{s.text}</p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
                <Link href={s.cta.href} className="btn btn-primary">
                  {s.cta.label}
                  <ArrowRight className="arrow size-4" aria-hidden />
                </Link>
                <Link href={s.secondary.href} className="btn btn-outline">
                  {s.secondary.label}
                </Link>
              </div>
            </div>
          ))}
          <ul className="mt-10 grid gap-3 border-t border-line pt-7 text-sm text-ink sm:grid-cols-3 sm:gap-5">
            {t.trust.map((item) => (
              <li key={item} className="flex items-start gap-2.5 leading-snug">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" strokeWidth={2.25} aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {aside && !hasImages && <div className="hidden lg:block">{aside}</div>}

        <div className="absolute inset-x-0 bottom-0 pb-8">
          <div className="container-x flex items-center gap-4">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => go(index - 1)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-accent"
                aria-label={t.prev}
              >
                <ChevronLeft className="size-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                onClick={() => go(index + 1)}
                className="inline-flex size-11 items-center justify-center rounded-full border border-ink/25 transition-colors hover:border-accent"
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
                    <span className="block h-0.5 overflow-hidden bg-line">
                      <span
                        key={`${index}-${running}`}
                        className="block h-full bg-accent"
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
              className="inline-flex size-11 items-center justify-center rounded-full text-muted hover:text-ink"
              aria-label={playing ? t.pause : t.play}
            >
              {playing ? <Pause className="size-4" /> : <Play className="size-4" />}
            </button>
            <p className="hidden text-xs font-medium tracking-[0.2em] text-muted tabular-nums sm:block">
              {String(index + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
