"use client";
import { FormEvent, useState } from "react";
import { getSupabase } from "../lib/supabase";

export default function ContactForm() {
  const [status, setStatus] = useState("");
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("Envoi en cours…");
    const form = new FormData(e.currentTarget);
    const db = getSupabase();
    if (!db) { setStatus("Formulaire prêt. Configurez Supabase pour enregistrer les demandes."); return; }
    const { error } = await db.from("leads").insert({
      full_name: String(form.get("full_name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      service: String(form.get("service") || ""),
      message: String(form.get("message") || "")
    });
    setStatus(error ? "Une erreur est survenue. Vérifiez la configuration Supabase." : "Merci. Votre demande a bien été envoyée.");
    if (!error) e.currentTarget.reset();
  }
  return (
    <form className="contact-form" onSubmit={submit}>
      <div className="form-grid">
        <label>Nom complet<input name="full_name" required placeholder="Votre nom" /></label>
        <label>Email<input type="email" name="email" required placeholder="vous@exemple.com" /></label>
        <label>Téléphone<input name="phone" placeholder="+221 …" /></label>
        <label>Besoin<select name="service" defaultValue="Immobilier"><option>Immobilier</option><option>Construction</option><option>Rénovation</option><option>Aménagement</option><option>Décoration</option><option>Autre</option></select></label>
      </div>
      <label>Votre projet<textarea name="message" required rows={6} placeholder="Décrivez votre projet…"></textarea></label>
      <button className="button button-dark" type="submit">Envoyer ma demande</button>
      {status && <p className="form-status">{status}</p>}
    </form>
  );
}