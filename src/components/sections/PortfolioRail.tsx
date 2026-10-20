import type { PortfolioItem } from "@/content/portfolio-items";
import type { Dictionary } from "@/i18n/dictionaries/fr";
import { fill } from "@/i18n/fill";
import ScrollCarousel from "../ScrollCarousel";
import PortfolioCard from "./PortfolioCard";

/** Défilement horizontal des réalisations (ou des illustrations en attendant les photos). */
export default function PortfolioRail({ items, t }: { items: PortfolioItem[]; t: Dictionary }) {
  return (
    <ScrollCarousel label={t.portfolio.carouselLabel} prevLabel={t.portfolio.scrollLeft} nextLabel={t.portfolio.scrollRight}>
      {items.map((item, i) => (
        <li
          key={item.id}
          className={`shrink-0 snap-start ${i % 3 === 1 ? "w-[82%] sm:w-[55%] lg:w-[44%]" : "w-[82%] sm:w-[46%] lg:w-[34%]"}`}
        >
          <PortfolioCard
            item={item}
            tall={i % 3 !== 1}
            illustrationLabel={t.portfolio.illustration}
            illustrationAlt={fill(t.common.illustrationAlt, { name: item.title })}
            sizes="(min-width: 1024px) 40vw, (min-width: 640px) 50vw, 82vw"
          />
        </li>
      ))}
    </ScrollCarousel>
  );
}
