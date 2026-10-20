import Reveal from "../Reveal";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  dark = false,
  center = false,
  as: Tag = "h2",
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle?: string;
  dark?: boolean;
  center?: boolean;
  as?: "h1" | "h2";
  children?: React.ReactNode;
}) {
  return (
    <Reveal
      className={`flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between ${center ? "items-center text-center lg:flex-col lg:items-center" : ""}`}
    >
      <div className={`max-w-3xl ${center ? "mx-auto" : ""}`}>
        <p className={`eyebrow ${dark ? "eyebrow-light" : ""}`}>{eyebrow}</p>
        <Tag className={`display mt-6 text-4xl sm:text-5xl lg:text-6xl ${dark ? "text-white" : "text-graphite"}`}>{title}</Tag>
        {subtitle && (
          <p className={`mt-6 max-w-2xl text-lg leading-relaxed ${center ? "mx-auto" : ""} ${dark ? "text-ash" : "text-stone"}`}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </Reveal>
  );
}
