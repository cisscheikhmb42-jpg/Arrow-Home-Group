import { useId } from "react";

/**
 * Illustrations architecturales au trait, affichées tant que les vraies photos ne sont pas fournies.
 * Elles sont toujours présentées comme des illustrations, jamais comme des réalisations.
 */
export default function Blueprint({
  variant = 0,
  tone = "dark",
  className = "",
}: {
  variant?: number;
  /** "dark" : traits clairs pour un fond graphite. "light" : traits graphite pour un fond clair. */
  tone?: "dark" | "light";
  className?: string;
}) {
  const id = useId().replace(/:/g, "");
  const stroke = tone === "dark" ? "rgba(255,255,255,0.5)" : "rgba(23,25,28,0.55)";
  const soft = tone === "dark" ? "rgba(255,255,255,0.07)" : "rgba(23,25,28,0.07)";
  const accent = tone === "dark" ? "#c2a878" : "#9a7f50";

  const svg = (children: React.ReactNode) => (
    <svg
      viewBox="0 0 640 520"
      className={className}
      aria-hidden
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      preserveAspectRatio="xMidYMid slice"
    >
      <defs>
        <pattern id={`g${id}`} width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke={soft} strokeWidth="0.8" />
        </pattern>
      </defs>
      <rect width="640" height="520" fill={`url(#g${id})`} />
      {children}
    </svg>
  );

  switch (variant % 8) {
    case 1: // Aménagement : intérieur en perspective
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
            <path d="M80 60 L230 160 L410 160 L560 60" />
            <path d="M80 460 L230 360 L410 360 L560 460" />
            <path d="M230 160 V360 M410 160 V360" />
            <rect x="260" y="190" width="120" height="110" />
            <path d="M320 190 V300 M260 245 H380" />
            <path d="M150 330 h120 v40 h-120z M140 330 v-40 h140 v40" />
            <path d="M440 300 h60 v70 h-60z M470 300 v-30" />
            <circle cx="470" cy="262" r="10" />
            <path d="M320 160 v18 M300 178 h40 l-8 12 h-24z" />
          </g>
          <path d="M120 410 H520" stroke={accent} strokeWidth="1.6" />
          <path d="M120 402 v16 M520 402 v16" stroke={accent} strokeWidth="1.6" />
        </>,
      );
    case 2: // Immobilier : villa contemporaine
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
            <path d="M60 420 H580" />
            <path d="M110 420 V250 H330 V420" />
            <path d="M90 250 H350" strokeWidth="2.6" />
            <path d="M330 420 V170 H540 V420" />
            <path d="M310 170 H560" strokeWidth="2.6" />
            <rect x="140" y="290" width="70" height="90" />
            <rect x="235" y="290" width="70" height="130" />
            <rect x="360" y="200" width="150" height="70" />
            <path d="M435 200 V270" />
            <rect x="360" y="300" width="60" height="120" />
            <rect x="445" y="300" width="65" height="70" />
          </g>
          <path d="M330 140 H540 M330 132 v16 M540 132 v16" stroke={accent} strokeWidth="1.6" />
        </>,
      );
    case 3: // Immeuble avec gaine d'ascenseur
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
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
          <g stroke={accent} strokeWidth="1.6">
            <rect x="440" y="250" width="60" height="70" />
            <path d="M470 180 V250 M470 320 V430" strokeDasharray="4 6" />
            <path d="M458 270 l12 -10 12 10 M458 300 l12 10 12 -10" />
          </g>
        </>,
      );
    case 4: // Aluminium : façade vitrée et menuiseries
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
            <path d="M60 460 H580" />
            <rect x="140" y="80" width="360" height="380" />
            {[0, 1, 2, 3].map((c) => (
              <path key={c} d={`M${140 + (c + 1) * 72} 80 V460`} />
            ))}
            {[0, 1, 2, 3, 4].map((r) => (
              <path key={r} d={`M140 ${80 + (r + 1) * 63} H500`} />
            ))}
            <path d="M152 92 l48 48 M224 92 l48 48 M368 218 l48 48 M296 344 l48 48" strokeOpacity="0.5" />
          </g>
          <g stroke={accent} strokeWidth="1.6">
            <rect x="284" y="332" width="72" height="128" />
            <path d="M320 332 V460 M310 396 h-6 M330 396 h6" />
          </g>
        </>,
      );
    case 5: // Bois : escalier et claustra à lames
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
            <path d="M60 460 H580" />
            {Array.from({ length: 14 }).map((_, i) => (
              <path key={i} d={`M${340 + i * 16} 90 V460`} />
            ))}
            <path d="M330 90 H570" />
            {Array.from({ length: 8 }).map((_, i) => (
              <path key={i} d={`M${90 + i * 28} ${460 - i * 36} h28 v-36`} />
            ))}
            <path d="M90 460 V430 M314 172 V460" />
            <path d="M100 400 L316 112" />
          </g>
          <path d="M110 380 L316 106" stroke={accent} strokeWidth="1.6" />
          <path d="M110 380 v28 M316 106 v28" stroke={accent} strokeWidth="1.6" />
        </>,
      );
    case 6: // Rénovation : maison avec échafaudage
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
            <path d="M60 460 H580" />
            <path d="M150 460 V220 L320 110 L490 220 V460" />
            <rect x="200" y="270" width="70" height="70" />
            <rect x="370" y="270" width="70" height="70" />
            <rect x="285" y="360" width="70" height="100" />
            <path d="M235 270 V340 M200 305 H270 M405 270 V340 M370 305 H440" />
          </g>
          <g stroke={accent} strokeWidth="1.6">
            <path d="M510 460 V160 M560 460 V160 M510 160 H560" />
            {[0, 1, 2, 3, 4].map((i) => (
              <path key={i} d={`M510 ${400 - i * 60} H560 M510 ${400 - i * 60} L560 ${340 - i * 60}`} />
            ))}
          </g>
        </>,
      );
    case 7: // Décoration : salon, suspension et plante
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
            <path d="M60 440 H580" />
            <path d="M140 440 v-20 h240 v20 M150 420 v-70 q0 -14 14 -14 h192 q14 0 14 14 v70" />
            <path d="M170 400 h180" />
            <rect x="100" y="110" width="140" height="170" />
            <path d="M120 250 l40 -50 30 30 30 -40" />
            <path d="M440 440 v-60 h60 v60 M470 380 c-30 -40 -10 -100 0 -120 c10 20 30 80 0 120" />
            <path d="M300 60 V160" />
          </g>
          <path d="M270 190 q30 -40 60 0 z" stroke={accent} strokeWidth="1.6" />
          <path d="M300 200 v8 M280 196 l-6 6 M320 196 l6 6" stroke={accent} strokeWidth="1.6" />
        </>,
      );
    default: // Construction : immeuble en chantier avec grue
      return svg(
        <>
          <g stroke={stroke} strokeWidth="1.3">
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
          <path d="M230 185 H530 M230 177 v16 M530 177 v16" stroke={accent} strokeWidth="1.6" />
        </>,
      );
  }
}
