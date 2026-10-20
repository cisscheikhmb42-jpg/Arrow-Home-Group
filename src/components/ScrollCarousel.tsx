"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

/** Rangée de cartes qui défile horizontalement (glisser au doigt, ou flèches). */
export default function ScrollCarousel({
  children,
  label,
  dark = false,
}: {
  children: React.ReactNode;
  label: string;
  dark?: boolean;
}) {
  const ref = useRef<HTMLUListElement>(null);
  const scroll = (dir: number) => {
    const el = ref.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  };
  const btn = dark
    ? "border-white/25 text-white hover:bg-white/10"
    : "border-slate-300 bg-white text-slate-800 hover:border-brand-600 hover:text-brand-600";

  return (
    <div>
      <div className="mb-6 flex justify-end gap-2">
        <button type="button" onClick={() => scroll(-1)} aria-label="Défiler vers la gauche" className={`focus-ring inline-flex size-11 items-center justify-center rounded-full border transition-colors ${btn}`}>
          <ChevronLeft className="size-5" />
        </button>
        <button type="button" onClick={() => scroll(1)} aria-label="Défiler vers la droite" className={`focus-ring inline-flex size-11 items-center justify-center rounded-full border transition-colors ${btn}`}>
          <ChevronRight className="size-5" />
        </button>
      </div>
      <ul
        ref={ref}
        aria-label={label}
        className="scroller -mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:px-0"
      >
        {children}
      </ul>
    </div>
  );
}
