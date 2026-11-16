"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { fill } from "@/i18n/fill";

type Photo = { src: string; alt: string };
type Chapter = { title?: string; photos: Photo[] };
type Labels = { open: string; close: string; prev: string; next: string; counter: string; chapters: string; photoCount: string };

/**
 * Galerie d'une fiche projet : chapitres numérotés (étapes du chantier) ou simple grille,
 * photos légendées et visionneuse plein écran qui parcourt toutes les photos dans l'ordre (clavier, flèches, Échap).
 */
export default function ProjectGallery({ chapters, labels }: { chapters: Chapter[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const flat = chapters.flatMap((c) => c.photos.map((p) => ({ ...p, chapter: c.title })));
  const total = flat.length;
  const titled = chapters.length > 1 && chapters.every((c) => c.title);

  const open = (i: number) => {
    setIndex(i);
    setIsOpen(true);
    dialog.current?.showModal();
    document.documentElement.style.overflow = "hidden";
  };
  const go = useCallback((step: number) => setIndex((i) => (i + step + total) % total), [total]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const onClose = () => {
      setIsOpen(false);
      document.documentElement.style.overflow = "";
    };
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [go]);

  const photo = flat[index];
  const navBtn =
    "inline-flex size-12 items-center justify-center border border-ink/25 bg-canvas/80 text-ink transition-colors hover:border-accent hover:text-accent";
  let offset = 0;

  return (
    <>
      {titled && (
        <nav aria-label={labels.chapters} className="scroller -mx-5 mt-10 flex gap-2 overflow-x-auto px-5 pb-2 sm:mx-0 sm:flex-wrap sm:px-0">
          {chapters.map((c, i) => (
            <a
              key={c.title}
              href={`#etape-${i + 1}`}
              className="inline-flex min-h-11 shrink-0 items-center gap-2 border border-line bg-surface px-4 text-[13px] font-medium whitespace-nowrap text-ink transition-colors hover:border-accent"
            >
              <span className="text-accent tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              {c.title}
            </a>
          ))}
        </nav>
      )}

      <div className={titled ? "mt-6 space-y-20 lg:space-y-24" : "mt-8"}>
        {chapters.map((c, ci) => {
          const start = offset;
          offset += c.photos.length;
          return (
            <section key={c.title ?? ci} id={titled ? `etape-${ci + 1}` : undefined} className="scroll-mt-28">
              {titled && (
                <header className="flex flex-wrap items-baseline gap-x-5 gap-y-2 border-t border-line pt-8">
                  <span className="display text-3xl text-accent tabular-nums sm:text-4xl">{String(ci + 1).padStart(2, "0")}</span>
                  <h3 className="display text-2xl text-ink sm:text-3xl">{c.title}</h3>
                  <span className="text-xs font-medium tracking-[0.18em] text-muted uppercase">
                    {fill(labels.photoCount, { n: c.photos.length })}
                  </span>
                </header>
              )}
              <ul className={`grid gap-6 sm:grid-cols-2 ${titled ? "mt-8 lg:grid-cols-3" : ""}`}>
                {c.photos.map((p, pi) => {
                  // Lignes toujours pleines : la 1re photo (et au besoin la dernière) passe en format panoramique.
                  const n = c.photos.length;
                  const wideSm = titled && n % 2 === 1 && pi === 0;
                  const wideLg = titled && ((n % 3 === 2 && pi === 0) || (n % 3 === 1 && n > 1 && (pi === 0 || pi === n - 1)));
                  return (
                  <li key={p.src} className={`${wideSm ? "sm:col-span-2" : ""} ${wideLg ? "lg:col-span-2" : titled ? "lg:col-span-1" : ""}`}>
                    <figure>
                      <button
                        type="button"
                        onClick={() => open(start + pi)}
                        className={`group relative block aspect-[4/3] w-full overflow-hidden bg-surface ${wideSm ? "sm:aspect-[8/3]" : ""} ${
                          wideLg ? "lg:aspect-[11/4]" : titled ? "lg:aspect-[4/3]" : ""
                        }`}
                        aria-label={`${labels.open} : ${p.alt}`}
                      >
                        <Image
                          src={p.src}
                          alt={p.alt}
                          fill
                          sizes={
                            wideLg || wideSm
                              ? "(min-width:1024px) 66vw, 100vw"
                              : titled
                                ? "(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                                : "(min-width:640px) 50vw, 100vw"
                          }
                          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                        />
                        <span
                          className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center bg-canvas/80 text-ink opacity-90 transition-colors group-hover:text-accent"
                          aria-hidden
                        >
                          <Expand className="size-4" />
                        </span>
                      </button>
                      <figcaption className="mt-3 text-sm leading-relaxed text-muted">{p.alt}</figcaption>
                    </figure>
                  </li>
                  );
                })}
              </ul>
            </section>
          );
        })}
      </div>

      <dialog
        ref={dialog}
        aria-label={photo?.alt}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-deep/95 p-0 text-ink backdrop:bg-deep/90"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        {isOpen && photo && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase tabular-nums" aria-live="polite">
                {fill(labels.counter, { n: index + 1, total })}
                {photo.chapter && <span className="ml-3 hidden text-accent sm:inline">{photo.chapter}</span>}
              </p>
              <button type="button" onClick={() => dialog.current?.close()} className={navBtn} aria-label={labels.close} autoFocus>
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <div className="relative min-h-0 flex-1">
              <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="100vw" className="object-contain" />
            </div>
            <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
              <button type="button" onClick={() => go(-1)} className={navBtn} aria-label={labels.prev}>
                <ChevronLeft className="size-5" aria-hidden />
              </button>
              <p className="max-w-2xl text-center text-sm leading-relaxed text-muted">{photo.alt}</p>
              <button type="button" onClick={() => go(1)} className={navBtn} aria-label={labels.next}>
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
