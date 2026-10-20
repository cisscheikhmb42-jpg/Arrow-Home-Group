import Image from "next/image";

/**
 * Logo officiel, affiché tel quel depuis public/brand/logo.png (320 × 190, fond transparent).
 * Ne jamais lui appliquer de filtre, de mode de fusion, d'opacité ou de recoloration.
 * Son texte est noir : il doit toujours être posé sur un fond clair (blanc, blanc cassé).
 */
export default function Logo({ className = "h-12 w-auto", priority = false }: { className?: string; priority?: boolean }) {
  return (
    <Image src="/brand/logo.png" alt="Arrow Home Group" width={320} height={190} priority={priority} className={className} />
  );
}
