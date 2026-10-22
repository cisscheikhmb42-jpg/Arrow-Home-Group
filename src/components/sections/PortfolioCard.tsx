import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { PortfolioItem } from "@/content/portfolio-items";

/** Carte de realisation : photo reelle, ou encadre sobre « Photos a venir » tant que les photos ne sont pas fournies. */
export default function PortfolioCard({
  item,
  placeholderLabel,
  sizes = "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 85vw",
  tall = false,
}: {
  item: PortfolioItem;
  placeholderLabel: string;
  sizes?: string;
  tall?: boolean;
}) {
  const body = (
    <>
      <div className={`relative overflow-hidden ${tall ? "aspect-[4/5]" : "aspect-[4/3]"} ${item.image ? "" : "border border-mist bg-tint"}`}>
        {item.image ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes={sizes}
            className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-6 text-center">
            <span className="block h-0.5 w-10 bg-champagne" aria-hidden />
            <span className="text-xs font-medium tracking-[0.18em] text-stone uppercase">{placeholderLabel}</span>
          </div>
        )}
      </div>
      <div className="flex items-start justify-between gap-4 pt-5">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-stone uppercase">{item.caption}</p>
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
