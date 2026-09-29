export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <img className="footer-logo" src="/arrow-home-logo.png" alt="Arrow Home" />
          <p>Construction, immobilier, rénovation et aménagement. Des espaces conçus pour durer.</p>
        </div>
        <div><h4>Navigation</h4><a href="/services">Services</a><a href="/immobilier">Immobilier</a><a href="/realisations">Réalisations</a></div>
        <div><h4>Contact</h4><span>Dakar, Sénégal</span><span>+221 77 000 00 00</span><span>contact@arrowhome.sn</span></div>
      </div>
      <div className="container footer-bottom">© {new Date().getFullYear()} Arrow Home Group. Tous droits réservés.</div>
    </footer>
  );
}