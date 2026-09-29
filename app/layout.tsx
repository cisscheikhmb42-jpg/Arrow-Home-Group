import "./globals.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  title: "Arrow Home Group | Immobilier, Construction & Rénovation",
  description: "Arrow Home accompagne vos projets immobiliers, de construction, rénovation, aménagement et décoration au Sénégal."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="fr"><body><Header />{children}<Footer /></body></html>;
}