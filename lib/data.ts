import { getSupabase } from "./supabase";

export const fallbackServices = [
  { id: "1", name: "Construction", description: "Conception et réalisation de bâtiments modernes et durables.", icon: "▦" },
  { id: "2", name: "Rénovation", description: "Transformation, modernisation et valorisation de vos espaces.", icon: "↗" },
  { id: "3", name: "Aménagement", description: "Des espaces pensés pour le confort, la fonctionnalité et l'élégance.", icon: "⌂" },
  { id: "4", name: "Finition", description: "Des finitions soignées pour donner du caractère à chaque projet.", icon: "✦" },
  { id: "5", name: "Aluminium & Bois", description: "Menuiserie aluminium et bois sur mesure pour vos projets.", icon: "◇" },
  { id: "6", name: "Ascenseurs", description: "Solutions d'élévation adaptées aux bâtiments résidentiels et professionnels.", icon: "↕" },
  { id: "7", name: "Immobilier", description: "Accompagnement dans la recherche, la vente et la valorisation de biens.", icon: "⌂" },
  { id: "8", name: "Décoration", description: "Une approche contemporaine pour créer des intérieurs distinctifs.", icon: "◈" }
];

export const fallbackProperties = [
  { id: "demo-1", title: "Résidence Horizon", location: "Dakar, Sénégal", type: "Villa", status: "À vendre", price: 185000000, bedrooms: 5, bathrooms: 4, area_m2: 420, image_url: null },
  { id: "demo-2", title: "Appartement Signature", location: "Almadies, Dakar", type: "Appartement", status: "À vendre", price: 95000000, bedrooms: 3, bathrooms: 2, area_m2: 185, image_url: null },
  { id: "demo-3", title: "Villa Émeraude", location: "Saly, Sénégal", type: "Villa", status: "À louer", price: 850000, bedrooms: 4, bathrooms: 3, area_m2: 300, image_url: null }
];

export const fallbackProjects = [
  { id: "p1", title: "Projet résidentiel contemporain", category: "Construction", location: "Dakar", description: "Architecture moderne, finitions premium et espaces pensés pour la vie familiale.", image_url: null },
  { id: "p2", title: "Rénovation & aménagement", category: "Rénovation", location: "Thiès", description: "Transformation complète d'un espace avec une identité contemporaine.", image_url: null },
  { id: "p3", title: "Aménagement intérieur", category: "Décoration", location: "Dakar", description: "Un intérieur élégant associant fonctionnalité, matériaux et lumière.", image_url: null }
];

export async function getServices() {
  const db = getSupabase();
  if (!db) return fallbackServices;
  const { data } = await db.from("services").select("*").eq("is_active", true).order("sort_order");
  return data?.length ? data : fallbackServices;
}

export async function getProperties() {
  const db = getSupabase();
  if (!db) return fallbackProperties;
  const { data } = await db.from("properties").select("*").eq("is_published", true).order("created_at", { ascending: false }).limit(6);
  return data?.length ? data : fallbackProperties;
}

export async function getProjects() {
  const db = getSupabase();
  if (!db) return fallbackProjects;
  const { data } = await db.from("projects").select("*").eq("is_published", true).order("created_at", { ascending: false }).limit(6);
  return data?.length ? data : fallbackProjects;
}