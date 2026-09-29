import { getProperties } from "../../lib/data";
import PropertyCard from "../../components/PropertyCard";
export default async function ImmobilierPage(){
 const properties=await getProperties();
 return <main><section className="page-hero"><div className="container"><span className="kicker">Immobilier</span><h1>Des adresses à votre mesure.</h1><p>Découvrez une sélection de biens et échangez avec notre équipe pour préciser votre projet d’achat, de vente ou de location.</p></div></section><section className="section"><div className="container"><div className="properties-grid">{properties.map((p:any)=><PropertyCard key={p.id} p={p}/>)}</div></div></section></main>
}