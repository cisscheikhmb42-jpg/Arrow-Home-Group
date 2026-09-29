type Property = {
  id: string; title: string; location: string; type: string; status: string;
  price: number; bedrooms?: number; bathrooms?: number; area_m2?: number; image_url?: string | null;
};

const money = (n: number) => new Intl.NumberFormat("fr-FR").format(n) + " FCFA";

export default function PropertyCard({ p }: { p: Property }) {
  return (
    <article className="property-card">
      <div className="property-media">
        {p.image_url ? <img src={p.image_url} alt={p.title} /> : <div className="property-placeholder"><span>ARROW HOME</span><strong>{p.type}</strong></div>}
        <span className="badge">{p.status}</span>
      </div>
      <div className="property-body">
        <div className="eyebrow">{p.type} · {p.location}</div>
        <h3>{p.title}</h3>
        <div className="specs"><span>{p.bedrooms ?? "—"} chambres</span><span>{p.bathrooms ?? "—"} salles de bain</span><span>{p.area_m2 ?? "—"} m²</span></div>
        <div className="price">{money(p.price)}</div>
      </div>
    </article>
  );
}