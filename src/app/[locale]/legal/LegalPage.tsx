import { PageHero } from "@/components/sections/Blocks";

export default function LegalPage({ eyebrow, title, sections }: { eyebrow: string; title: string; sections: { heading: string; body: string[] }[] }) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} />
      <section className="bg-canvas py-20 lg:py-24">
        <div className="container-x max-w-3xl space-y-12">
          {sections.map((s) => (
            <div key={s.heading}>
              <h2 className="display text-3xl text-ink">{s.heading}</h2>
              <div className="mt-4 space-y-4 leading-relaxed text-ink">
                {s.body.map((p) => <p key={p}>{p}</p>)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
