/** Illustrations architecturales en traits fins, utilisées tant que les photos ne sont pas fournies. */
export default function Blueprint({ variant = 0, className = "" }: { variant?: number; className?: string }) {
  const stroke = "rgba(255,255,255,0.55)";
  const soft = "rgba(255,255,255,0.18)";
  const green = "#a8cf45";

  const common = (
    <>
      <defs>
        <pattern id={`g${variant}`} width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M24 0H0V24" fill="none" stroke={soft} strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="640" height="520" fill={`url(#g${variant})`} />
    </>
  );

  if (variant === 1) {
    // Intérieur : salon en perspective
    return (
      <svg viewBox="0 0 640 520" className={className} aria-hidden fill="none" strokeLinecap="round">
        {common}
        <g stroke={stroke} strokeWidth="1.6">
          <path d="M80 60 L230 160 L410 160 L560 60" />
          <path d="M80 460 L230 360 L410 360 L560 460" />
          <path d="M230 160 V360 M410 160 V360" />
          <rect x="260" y="190" width="120" height="110" />
          <path d="M320 190 V300 M260 245 H380" />
          <path d="M150 330 h120 v40 h-120z M140 330 v-40 h140 v40" />
          <path d="M440 300 h60 v70 h-60z M470 300 v-30" />
          <circle cx="470" cy="262" r="10" />
          <path d="M320 160 v18" />
          <path d="M300 178 h40 l-8 12 h-24z" />
        </g>
        <path d="M120 400 H520" stroke={green} strokeWidth="2.4" strokeDasharray="6 8" />
        <g fill={green}>
          <circle cx="120" cy="400" r="4" />
          <circle cx="520" cy="400" r="4" />
        </g>
      </svg>
    );
  }

  if (variant === 2) {
    // Villa : maison contemporaine
    return (
      <svg viewBox="0 0 640 520" className={className} aria-hidden fill="none" strokeLinecap="round">
        {common}
        <g stroke={stroke} strokeWidth="1.6">
          <path d="M60 420 H580" />
          <path d="M110 420 V250 H330 V420" />
          <path d="M90 250 H350" strokeWidth="3" />
          <path d="M330 420 V170 H540 V420" />
          <path d="M310 170 H560" strokeWidth="3" />
          <rect x="140" y="290" width="70" height="90" />
          <rect x="235" y="290" width="70" height="130" />
          <rect x="360" y="200" width="150" height="70" />
          <path d="M435 200 V270" />
          <rect x="360" y="300" width="60" height="120" />
          <rect x="445" y="300" width="65" height="70" />
        </g>
        <path d="M330 140 H540" stroke={green} strokeWidth="2.4" />
        <path d="M330 132 v16 M540 132 v16" stroke={green} strokeWidth="2.4" />
        <path d="M60 460 C160 440 220 470 320 455 S500 440 580 460" stroke={soft} strokeWidth="1.4" />
      </svg>
    );
  }

  if (variant === 3) {
    // Hôtel / immeuble avec ascenseur
    return (
      <svg viewBox="0 0 640 520" className={className} aria-hidden fill="none" strokeLinecap="round">
        {common}
        <g stroke={stroke} strokeWidth="1.6">
          <path d="M60 460 H580" />
          <rect x="150" y="70" width="230" height="390" />
          {Array.from({ length: 8 }).map((_, r) =>
            Array.from({ length: 4 }).map((__, c) => (
              <rect key={`${r}-${c}`} x={170 + c * 52} y={92 + r * 42} width="34" height="24" />
            )),
          )}
          <rect x="245" y="420" width="40" height="40" />
          <rect x="410" y="150" width="120" height="310" />
          <path d="M470 150 V460" />
        </g>
        <g stroke={green} strokeWidth="2.4">
          <rect x="440" y="250" width="60" height="70" />
          <path d="M470 180 V250 M470 320 V430" strokeDasharray="4 6" />
          <path d="M458 270 l12 -10 12 10 M458 300 l12 10 12 -10" />
        </g>
      </svg>
    );
  }

  // Variante 0 : chantier / immeuble en construction avec grue
  return (
    <svg viewBox="0 0 640 520" className={className} aria-hidden fill="none" strokeLinecap="round">
      {common}
      <g stroke={stroke} strokeWidth="1.6">
        <path d="M40 460 H600" />
        <path d="M120 460 V40 M140 460 V40" />
        {Array.from({ length: 14 }).map((_, i) => (
          <path key={i} d={`M120 ${460 - i * 30} L140 ${430 - i * 30}`} />
        ))}
        <path d="M80 40 H560 M130 40 L110 20 M130 40 L330 20 L560 40" />
        <path d="M80 40 v24 h40" />
        <path d="M430 40 V170" strokeDasharray="5 6" />
        <rect x="410" y="170" width="40" height="22" />
        <rect x="230" y="200" width="300" height="260" />
        {[0, 1, 2, 3].map((r) => (
          <path key={r} d={`M230 ${265 + r * 65} H530`} />
        ))}
        {[0, 1, 2, 3, 4].map((c) => (
          <path key={c} d={`M${230 + c * 75} 200 V460`} />
        ))}
      </g>
      <path d="M230 185 H530" stroke={green} strokeWidth="2.4" />
      <path d="M230 177 v16 M530 177 v16" stroke={green} strokeWidth="2.4" />
    </svg>
  );
}
