/** Le "A" du logo Arrow Home, redessiné en SVG pour les décors. */
export default function BrandMark({ className = "", mono = false }: { className?: string; mono?: boolean }) {
  return (
    <svg viewBox="0 0 600 520" className={className} aria-hidden>
      <path d="M303 0 L600 505 L475 508 L302 210 L218 352 L100 352 Z" fill={mono ? "currentColor" : "#004f86"} />
      <path d="M309 350 L398 508 L10 508 L63 415 L270 415 Z" fill={mono ? "currentColor" : "#97c02b"} />
    </svg>
  );
}
