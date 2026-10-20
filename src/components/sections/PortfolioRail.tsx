import type { PortfolioItem } from "@/content/portfolio-items";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fill } from "@/i18n/fill";
import ScrollCarousel from "../ScrollCarousel";
import PortfolioCard from "./PortfolioCard";

/** Défilement horizontal des réalisations (ou des illustrations en attendant les photos). */
export default function PortfolioRail({ items, t }: { items: PortfolioItem[]; t: Dictionary }) {
  return (
    <ScrollCarousel label={t.portfolio.carouselLabel} prevLabel={t.portfolio.scrollLeft} nextLabel={t.portfolio.scrollRight}>
      {items.map((item) => (
        <li
          key={item.id}
          className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-[31%]"
        >
          <PortfolioCard
            item={item}
            tall
            illustrationLabel={t.portfolio.illustration}
            illustrationAlt={fill(t.common.illustrationAlt, { name: item.title })}
            sizes="(min-width: 1024px) 31vw, (min-width: 640px) 46vw, 82vw"
          />
        </li>
      ))}
    </ScrollCarousel>
  );
}
