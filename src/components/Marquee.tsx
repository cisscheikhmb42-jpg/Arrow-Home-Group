/** Bandeau éditorial qui défile lentement (en pause au survol, immobile si l'utilisateur réduit les animations). */
export default function Marquee({ items, label }: { items: string[]; label: string }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
      {items.map((t) => (
        <li key={t} className="flex items-center whitespace-nowrap">
          <span className="display px-8 text-3xl text-graphite italic sm:px-12 sm:text-4xl lang-zh:not-italic">{t}</span>
          <span aria-hidden className="h-px w-10 bg-champagne sm:w-16" />
        </li>
      ))}
    </ul>
  );
  return (
    <section aria-label={label} className="group relative flex overflow-hidden border-y border-mist bg-white py-7 sm:py-9">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
        {row(true)}
        {row(true)}
      </div>
    </section>
  );
}
