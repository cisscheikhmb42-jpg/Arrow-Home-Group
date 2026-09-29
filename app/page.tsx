import Link from "next/link";
import { getProperties, getServices } from "../lib/data";
import PropertyCard from "../components/PropertyCard";

export default async function Home() {
  const [services, properties] = await Promise.all([getServices(), getProperties()]);
  return <>
    <main>
      <section className="hero"><div className="container hero-grid">
        <div>
          <span className="kicker">Immobilier · Construction · Design</span>
          <h1>Construire des espaces qui ont du sens.</h1>
          <p>Arrow Home transforme vos ambitions en lieux durables, élégants et fonctionnels — de la conception immobilière aux finitions.</p>
          <div className="actions"><Link className="button button-dark" href="/immobilier">Découvrir l’immobilier</Link><Link className="button button-light" href="/contact">Parler de votre projet</Link></div>
        </div>
        <div className="hero-card"><div><span className="kicker" style={{color:"#b6d834"}}>Arrow Home Group</span><strong>Votre projet. Notre savoir-faire.</strong></div></div>
      </div></section>

      <section className="section"><div className="container">
        <div className="section-head"><div><span className="kicker">Notre expertise</span><h2>Un seul partenaire pour tout votre projet.</h2></div><p>Une approche intégrée pour concevoir, construire, rénover, aménager et valoriser des espaces résidentiels et professionnels.</p></div>
        <div className="services-grid">{services.slice(0,8).map((s:any)=><div className="service" key={s.id}><div className="service-icon">{s.icon}</div><h3>{s.name}</h3><p>{s.description}</p></div>)}</div>
      </div></section>

      <section className="section section-soft"><div className="container">
        <div className="section-head"><div><span className="kicker">Sélection immobilière</span><h2>Des biens à découvrir.</h2></div><Link className="button button-light" href="/immobilier">Voir tous les biens</Link></div>
        <div className="properties-grid">{properties.slice(0,3).map((p:any)=><PropertyCard key={p.id} p={p} />)}</div>
      </div></section>

      <section className="section"><div className="container"><div className="stats">
        <div className="stat"><strong>360°</strong><span>Accompagnement du projet</span></div>
        <div className="stat"><strong>8+</strong><span>Expertises intégrées</span></div>
        <div className="stat"><strong>1</strong><span>Partenaire de confiance</span></div>
      </div></div></section>
    </main>
  </>;
}