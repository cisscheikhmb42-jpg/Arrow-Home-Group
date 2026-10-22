// Plus Jakarta Sans : uniquement Regular (400), Medium (500) et Bold (700).
import "@fontsource/plus-jakarta-sans/400.css";
import "@fontsource/plus-jakarta-sans/500.css";
import "@fontsource/plus-jakarta-sans/700.css";
import "./globals.css";

/** 404 hors des pages localisées (ex. fichier inexistant). Les 404 des pages ont leur version traduite. */
export default function GlobalNotFound() {
  return (
    <html lang="fr">
      <body className="flex min-h-dvh items-center justify-center bg-white p-6 font-sans text-graphite">
        <main className="max-w-md text-center">
          <p className="eyebrow justify-center">404</p>
          <h1 className="display mt-6 text-5xl text-graphite">Page introuvable</h1>
          <p className="mt-4 text-stone" lang="en">Page not found · 页面不存在</p>
          <a href="/fr" className="btn btn-dark mt-10">Accueil</a>
        </main>
      </body>
    </html>
  );
}
