"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { portfolioCategories, isPortfolioCategory } from "@/content/portfolio";
import type { PortfolioItem } from "@/content/portfolio-items";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fill } from "@/i18n/fill";
import PortfolioCard from "./PortfolioCard";

/** Grille filtrable. Le filtre est stocké dans l'URL (?cat=) : il est conservé au changement de langue et partageable. */
export default function PortfolioExplorer({ items, t }: { items: PortfolioItem[]; t: Dictionary["portfolio"] }) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const raw = params.get("cat");
  const active = isPortfolioCategory(raw) ? raw : "all";
  const shown = active === "all" ? items : items.filter((i) => i.category === active);

  const select = (cat: string) => {
    const next = new URLSearchParams(params.toString());
    if (cat === "all") next.delete("cat");
    else next.set("cat", cat);
    const qs = next.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <div>
      <div role="group" aria-label={t.filterLabel} className="scroller -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
        {portfolioCategories.map((cat) => {
          const on = cat === active;
          return (
            <button
              key={cat}
              type="button"
              aria-pressed={on}
              onClick={() => select(cat)}
              className={`min-h-11 shrink-0 border px-5 text-[13px] font-medium tracking-[0.08em] whitespace-nowrap uppercase transition-colors lang-zh:tracking-normal ${
                on ? "border-graphite bg-graphite text-white" : "border-mist bg-white text-graphite hover:border-graphite"
              }`}
            >
              {t.categories[cat]}
            </button>
          );
        })}
      </div>
      <p className="mt-6 text-sm text-stone" aria-live="polite">
        {fill(t.count, { n: shown.length })}
      </p>
      <ul className="mt-6 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
        {shown.map((item) => (
          <li key={item.id}>
            <PortfolioCard item={item} placeholderLabel={t.illustration} />
          </li>
        ))}
      </ul>
    </div>
  );
}
