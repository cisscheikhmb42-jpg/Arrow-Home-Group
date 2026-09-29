import Link from "next/link";

export default function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Arrow Home">
          <img src="/arrow-home-logo.png" alt="Arrow Home" />
        </Link>
        <nav className="nav">
          <Link href="/">Accueil</Link>
          <Link href="/services">Services</Link>
          <Link href="/immobilier">Immobilier</Link>
          <Link href="/realisations">Réalisations</Link>
          <Link href="/contact" className="nav-cta">Parler à un conseiller</Link>
        </nav>
      </div>
    </header>
  );
}