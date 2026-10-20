# Arrow Home : site web

Site corporate multilingue d'**ARROW HOME GROUP** (construction, rénovation, aménagement, finition, aluminium, bois, ascenseurs, immobilier, décoration), à Dakar, au Sénégal.

## Stack
- Next.js 15.5 (App Router, `src/`), React 19, TypeScript, Tailwind CSS v4 (thème dans `src/app/globals.css`, classes maison dans `@layer components`)
- Polices : Cormorant Garamond (titres) + Manrope (texte), paquets @fontsource ; en chinois, polices système CJK
- zod (validation serveur uniquement, ne jamais l'importer dans un composant client)
- Hébergement : Vercel, projet `arrow-home`. Base : Supabase, projet « Arrow Home » (en pause au 20/10/2026)

## Langues
- FR (défaut), EN, ZH (`zh-Hans`). Une seule app : `src/app/[locale]/…`, dossiers internes en anglais (`projects`, `quote`…)
- URL publiques traduites dans `src/i18n/routes.ts` ; `src/middleware.ts` réécrit l'URL publique vers le dossier interne et redirige `/`, les anciens liens (`/devis`, `/immobilier`) et les slugs non traduits
- Textes : `src/i18n/dictionaries/{fr,en,zh}.ts` (fr définit le type). Aucun texte en dur dans les composants

## Charte
- Design : graphite `#17191C`, champagne `#C2A878` (texte sur fond clair : `champagne-700` `#7D6438`), blanc cassé `#F5F3EE`, anthracite `#34383D`, gris clair `#E7E5E0`
- LOGO : `public/brand/logo.png`, original (SHA-256 71d70061…68390), via `src/components/Logo.tsx`. Jamais de filtre, d'opacité, de recoloration ni de version redessinée. Texte noir → toujours sur fond clair
- Coordonnées : `src/lib/site.ts` (e-mail principal info@arrowhome.cc, secondaire arrowhome.senegal@gmail.com)

## Contenu
- Réalisations réelles : `src/content/portfolio.ts` (`projects`, vide pour l'instant ; les illustrations au trait sont signalées « Illustration »)
- Témoignages et biens : `src/content/trust.ts` (vides ; sections masquées tant qu'ils sont vides)
- Ne pas inventer de chiffres, projets, témoignages, certifications, dates. Ne pas afficher d'année de création
- Infos de l'ancien site (50+ projets, 100 % satisfaits, 90 jours, garantie 1 an, ingénierie chinoise, projets Almadies/Plateau…) : à confirmer par l'utilisateur avant ajout

## Formulaires
- `src/app/actions/lead.ts` (Server Action) → `src/lib/leads/` (schema zod, store Supabase REST côté serveur, notify Resend, rate-limit)
- Table `website_leads` : `supabase/migrations/20261020000000_website_leads.sql` (RLS sans politique, écriture via service_role)
- Variables : voir `.env.example`. Sans configuration, le formulaire affiche « indisponible » (jamais de fausse confirmation)

## À faire
1. Relancer le projet Supabase, exécuter la migration, renseigner les variables dans Vercel ; tester un envoi réel
2. Photos réelles (diaporama, expertises, réalisations) avec droits d'usage
3. Pousser ce code sur GitHub `cisscheikhmb42-jpg/Arrow-Home-Group` (contient une ancienne version), relier Vercel, déployer en Preview puis production ; puis supprimer les 5 anciens projets Vercel arrow-home-* (avec accord)
4. Nom de domaine définitif → `NEXT_PUBLIC_SITE_URL`
5. Mentions légales : ajouter RCCM, NINEA, responsable de publication quand fournis
6. Migration Next.js 16 (avis de sécurité postcss) dans une branche dédiée
7. Espace admin (Supabase Auth) seulement si nécessaire

## Règles
- Le site doit fonctionner parfaitement sur téléphone, tablette et ordinateur (tester 375 / 768 / 1440 px)
- Le menu mobile est rendu HORS du `<header>` (son backdrop-filter piégerait le `position: fixed`)
