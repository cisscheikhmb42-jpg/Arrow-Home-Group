"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

/**
 * Rangée horizontale : glisser au doigt, trackpad, molette + Maj, flèches du clavier (quand la liste a le focus)
 * ou boutons. Le défilement vertical de la page n'est jamais intercepté.
 */
export default function ScrollCarousel({
  children,
  label,
  prevLabel,
  nextLabel,
  dark = false,
}: {
  children: React.ReactNode;
  label: string;
  prevLabel: string;
  nextLabel: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 8 });
  }, []);

  useEffect(() => {
    update();
    const el = ref.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [update]);

  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    const card = el.querySelector("li");
    const step = card ? card.getBoundingClientRect().width + 24 : el.clientWidth * 0.8;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * step, behavior: reduce ? "auto" : "smooth" });
  };

  const btn = dark
    ? "border-white/25 text-white enabled:hover:border-champagne enabled:hover:text-champagne"
    : "border-graphite/25 text-graphite enabled:hover:border-graphite enabled:hover:bg-graphite enabled:hover:text-white";

  return (
    <div>
      <div className="mb-8 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => scroll(-1)}
          disabled={edges.start}
          aria-label={prevLabel}
          className={`inline-flex size-12 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${btn}`}
        >
          <ArrowLeft className="size-5" strokeWidth={1.5} />
        </button>
        <button
          type="button"
          onClick={() => scroll(1)}
          disabled={edges.end}
          aria-label={nextLabel}
          className={`inline-flex size-12 items-center justify-center rounded-full border transition-colors disabled:opacity-30 ${btn}`}
        >
          <ArrowRight className="size-5" strokeWidth={1.5} />
        </button>
      </div>
      <ul
        ref={ref}
        aria-label={label}
        tabIndex={0}
        className="scroller -mx-5 flex snap-x snap-mandatory scroll-px-5 gap-6 overflow-x-auto overscroll-x-contain scroll-smooth px-5 pb-2 sm:-mx-8 sm:scroll-px-8 sm:px-8 lg:mx-0 lg:scroll-px-0 lg:px-0 motion-reduce:scroll-auto"
      >
        {children}
      </ul>
    </div>
  );
}
