import Image from "next/image";

/**
 * Logo officiel, affiché tel quel depuis public/brand/logo.png (320 × 190, fond transparent).
 * Ne jamais lui appliquer de filtre, de mode de fusion, d'opacité ou de recoloration.
 * Son texte est noir : sur le site sombre, il est toujours posé sur son cartouche blanc.
 */
export default function Logo({ className = "h-12 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <span className="inline-flex items-center rounded-md bg-white px-2.5 py-1.5 shadow-[0_8px_24px_-12px_rgba(0,0,0,0.6)]">
      <Image src="/brand/logo.png" alt="Arrow Home Group" width={320} height={190} priority={priority} className={className} />
    </span>
  );
}
