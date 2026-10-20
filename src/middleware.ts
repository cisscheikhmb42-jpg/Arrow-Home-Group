import { NextResponse, type NextRequest } from "next/server";
import { defaultLocale, isLocale, LOCALE_COOKIE, type Locale } from "@/i18n/config";
import { href, keyFromInternal, keyFromSlug } from "@/i18n/routes";

/** Langue préférée du visiteur : cookie choisi sur le site, sinon en-tête Accept-Language, sinon français. */
function preferredLocale(req: NextRequest): Locale {
  const cookie = req.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;
  const header = req.headers.get("accept-language") ?? "";
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { lang: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .filter((x) => x.lang && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);
  for (const { lang } of ranked) if (isLocale(lang)) return lang;
  return defaultLocale;
}

/** Pages supprimees (anciens liens) : renvoi vers l'accueil de la langue. */
const REMOVED = new Set(["immobilier", "real-estate"]);

export function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const parts = pathname.split("/").filter(Boolean);
  const [first, seg, ...rest] = parts;
  const tail = rest.length ? `/${rest.join("/")}` : "";

  const redirect = (to: string, status = 308) => {
    const url = req.nextUrl.clone();
    url.pathname = to;
    url.search = search;
    return NextResponse.redirect(url, status);
  };

  // Racine : redirection (temporaire, car elle dépend du visiteur) vers sa langue.
  if (!first) return redirect(`/${preferredLocale(req)}`, 307);

  // Chemin sans langue (ex. anciens liens /devis?service=… ou /immobilier) : version française.
  if (!isLocale(first)) {
    const key = keyFromSlug(defaultLocale, first) ?? keyFromInternal(first);
    return redirect(key ? href(defaultLocale, key, [seg, ...rest].filter(Boolean).map((s) => `/${s}`).join("")) : `/${defaultLocale}${pathname}`);
  }

  const locale = first;
  if (!seg) return NextResponse.next();
  if (REMOVED.has(seg)) return redirect(`/${locale}`);

  // URL publique traduite → dossier interne.
  const key = keyFromSlug(locale, seg);
  if (key) {
    if (key === seg) return NextResponse.next();
    const url = req.nextUrl.clone();
    url.pathname = `/${locale}/${key}${tail}`;
    return NextResponse.rewrite(url);
  }

  // Nom interne ou slug d'une autre langue utilisé par erreur (ex. /fr/projects) → URL canonique.
  const internal = keyFromInternal(seg);
  if (internal) return redirect(href(locale, internal, tail));

  return NextResponse.next();
}

export const config = {
  // Tout sauf les fichiers statiques, les ressources Next.js et les fichiers de métadonnées.
  matcher: ["/((?!_next/|api/|brand/|photos/|favicon.ico|icon.svg|robots.txt|sitemap.xml|.*\\.[a-zA-Z0-9]+$).*)"],
};
