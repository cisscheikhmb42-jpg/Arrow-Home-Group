import type { PortfolioItem } from "@/content/portfolio-items";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import ScrollCarousel from "../ScrollCarousel";
import PortfolioCard from "./PortfolioCard";

/** Defilement horizontal des realisations. */
export default function PortfolioRail({ items, t }: { items: PortfolioItem[]; t: Dictionary }) {
  return (
    <ScrollCarousel label={t.portfolio.carouselLabel} prevLabel={t.portfolio.scrollLeft} nextLabel={t.portfolio.scrollRight}>
      {items.map((item) => (
        <li key={item.id} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]">
          <PortfolioCard
            item={item}
            tall
            placeholderLabel={t.portfolio.illustration}
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
          />
        </li>
      ))}
    </ScrollCarousel>
  );
}
