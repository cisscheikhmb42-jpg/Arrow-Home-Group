/** Bandeau de texte qui défile en continu. */
export default function Marquee({ items }: { items: string[] }) {
  const row = (hidden: boolean) => (
    <ul aria-hidden={hidden} className="flex shrink-0 items-center gap-10 pr-10">
      {items.map((t) => (
        <li key={t} className="flex items-center gap-10 whitespace-nowrap">
          <span className="text-lg font-extrabold tracking-tight text-brand-950 sm:text-xl">{t}</span>
          <svg viewBox="0 0 20 18" className="size-4 shrink-0" aria-hidden>
            <path d="M10 0 L20 18 H0 Z" fill="#004f86" />
          </svg>
        </li>
      ))}
    </ul>
  );
  return (
    <div className="group relative flex overflow-hidden bg-accent-500 py-5" aria-label="Nos métiers">
      <div className="flex animate-[ah-marquee_40s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {row(false)}
        {row(true)}
      </div>
    </div>
  );
}
