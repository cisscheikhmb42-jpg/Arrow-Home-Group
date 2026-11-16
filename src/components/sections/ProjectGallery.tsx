"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { fill } from "@/i18n/fill";

type Photo = { src: string; alt: string };
type Labels = { open: string; close: string; prev: string; next: string; counter: string };

/** Galerie d'une fiche projet : grille de photos légendées + visionneuse plein écran (clavier, flèches, Échap). */
export default function ProjectGallery({ photos, labels }: { photos: Photo[]; labels: Labels }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);
  const total = photos.length;

  const open = (i: number) => {
    setIndex(i);
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
      document.documentElement.style.overflow = "";
    };
    d.addEventListener("keydown", onKey);
    d.addEventListener("close", onClose);
    return () => {
      d.removeEventListener("keydown", onKey);
      d.removeEventListener("close", onClose);
    };
  }, [go]);

  const photo = photos[index];
  const navBtn =
    "inline-flex size-12 items-center justify-center border border-ink/25 bg-canvas/80 text-ink transition-colors hover:border-accent hover:text-accent";

  return (
    <>
      <ul className="mt-8 grid gap-6 sm:grid-cols-2">
        {photos.map((p, i) => (
          <li key={p.src}>
            <figure>
              <button
                type="button"
                onClick={() => open(i)}
                className="group relative block aspect-[16/9] w-full overflow-hidden bg-surface"
                aria-label={`${labels.open} : ${p.alt}`}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  fill
                  sizes="(min-width:640px) 50vw, 100vw"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
                />
                <span className="absolute right-3 bottom-3 inline-flex size-10 items-center justify-center bg-canvas/80 text-ink opacity-90 transition-colors group-hover:text-accent" aria-hidden>
                  <Expand className="size-4" />
                </span>
              </button>
              <figcaption className="mt-3 text-sm leading-relaxed text-muted">{p.alt}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      <dialog
        ref={dialog}
        aria-label={photo?.alt}
        className="m-0 h-dvh max-h-none w-screen max-w-none bg-deep/95 p-0 text-ink backdrop:bg-deep/90"
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        {photo && (
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
              <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase tabular-nums" aria-live="polite">
                {fill(labels.counter, { n: index + 1, total })}
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
