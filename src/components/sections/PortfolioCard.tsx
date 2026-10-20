import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/content/portfolio-items";
import Blueprint from "../Blueprint";

export default function PortfolioCard({
  item,
  illustrationLabel,
  illustrationAlt,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw",
  tall = false,
}: {
  item: PortfolioItem;
  illustrationLabel: string;
  illustrationAlt: string;
  sizes?: string;
  tall?: boolean;
}) {
  const body = (
    <>
      <div className={`relative overflow-hidden bg-graphite ${tall ? "aspect-[4/5]" : "aspect-[4/3]"}`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div role="img" aria-label={illustrationAlt} className="absolute inset-0">
            <Blueprint
              variant={item.variant}
              className="absolute inset-0 h-full w-full transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
            />
          </div>
        )}
        {item.illustration && (
          <span className="absolute top-4 left-4 bg-graphite/80 px-3 py-1.5 text-[11px] font-semibold tracking-[0.18em] text-champagne uppercase backdrop-blur">
            {illustrationLabel}
          </span>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-champagne-700 uppercase">{item.caption}</p>
          <h3 className="display mt-2 text-2xl text-graphite sm:text-3xl">{item.title}</h3>
        </div>
        {item.href && (
          <ArrowUpRight
            className="mt-1 size-5 shrink-0 text-graphite transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            strokeWidth={1.5}
            aria-hidden
          />
        )}
      </div>
    </>
  );
  return item.href ? (
    <Link href={item.href} className="group block">
      {body}
    </Link>
  ) : (
    <div className="group">{body}</div>
  );
}
