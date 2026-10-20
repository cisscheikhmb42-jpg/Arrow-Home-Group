# Arrow Home : site web

Site vitrine d'**ARROW HOME Group** (construction, rénovation, immobilier, ascenseurs, projets hôteliers), à Dakar, au Sénégal.

## Stack
- Next.js 15.5 (App Router, `src/`), React 19, TypeScript, Tailwind CSS v4 (thème dans `src/app/globals.css`)
- Icônes : lucide-react. Police : Manrope (paquet `@fontsource-variable/manrope`, pas Google Fonts)
- Hébergement : Vercel, projet `arrow-home` → https://arrow-home.vercel.app
- Base de données prévue : Supabase (organisation « Arrow Home »)

## Charte
- Bleu du logo `#004f86` (`brand-600`), vert `#97c02b` (`accent-500`), texte `#0f1720`
- Logo : `public/brand/logo.png`. Le « A » est redessiné en SVG dans `src/components/BrandMark.tsx`
- Tout le contenu de l'entreprise (coordonnées, services, étapes) est centralisé dans `src/lib/site.ts`

## Structure
- `src/app/page.tsx` : page d'accueil (diaporama, bandeau défilant, services, à propos, étapes, réalisations, immobilier, contact)
- `src/components/` : Header, Footer, HeroSlider, Marquee, Reveal (apparition au scroll), ScrollCarousel, Blueprint (illustrations en attendant les photos), WhatsAppButton
- Les diapositives acceptent `image: "/photos/xxx.jpg"`. Sans photo, une illustration s'affiche

## À faire
1. Page `/devis` : formulaire de demande de devis (pré-rempli via `?service=slug`), enregistré dans Supabase, avec notification
2. Page `/immobilier` : liste de biens avec filtres (ville, type, vente/location, prix), données Supabase
3. Espace admin protégé (Supabase Auth) pour gérer demandes et biens
4. Photos réelles de chantiers (diaporama et galerie réalisations)
5. Relier le projet Vercel au dépôt GitHub `cisscheikhmb42-jpg/Arrow-Home-Group`, puis supprimer les 5 anciens projets Vercel arrow-home-* (avec l'accord de l'utilisateur)
6. Nom de domaine définitif (remplacer `site.url` dans `src/lib/site.ts`)

## Règles de contenu
- Ne pas inventer de chiffres, de projets ou de témoignages. Les infos de l'ancien site (50+ projets, 100 % satisfaits, 90 jours, garantie 1 an, ingénierie chinoise, projets Almadies/Plateau, etc.) sont à confirmer par l'utilisateur avant d'être ajoutées
- Ne pas afficher d'année de création
- Le site doit fonctionner parfaitement sur téléphone, tablette et ordinateur
