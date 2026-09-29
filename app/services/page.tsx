import { getServices } from "../../lib/data";
export default async function ServicesPage(){
 const services=await getServices();
 return <main><section className="page-hero"><div className="container"><span className="kicker">Notre savoir-faire</span><h1>Des solutions de A à Z.</h1><p>Arrow Home réunit les compétences nécessaires pour donner vie à vos projets immobiliers, architecturaux et d’aménagement.</p></div></section><section className="section"><div className="container"><div className="services-grid">{services.map((s:any)=><article className="service" key={s.id}><div className="service-icon">{s.icon}</div><h3>{s.name}</h3><p>{s.description}</p></article>)}</div></div></section></main>
}