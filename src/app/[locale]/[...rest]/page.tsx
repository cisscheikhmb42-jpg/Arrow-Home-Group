import { notFound } from "next/navigation";

/** Toute adresse inconnue sous /fr, /en ou /zh affiche la page 404 traduite. */
export default function CatchAll() {
  notFound();
}
