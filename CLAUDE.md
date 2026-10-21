# Arrow Home : site web

Site corporate multilingue d'**ARROW HOME GROUP** (construction, rénovation, aménagement, finition, aluminium, bois, ascenseurs, décoration). L'IMMOBILIER A ÉTÉ RETIRÉ du site à la demande du client : ne pas le remettre, à Dakar, au Sénégal.

## Stack
- Next.js 15.5 (App Router, `src/`), React 19, TypeScript, Tailwind CSS v4 (thème dans `src/app/globals.css`, classes maison dans `@layer components`)
- Polices : Cormorant Garamond (titres) + Manrope (texte), paquets @fontsource ; en chinois, polices système CJK
- zod (validation serveur uniquement, ne jamais l'importer dans un composant client)
- Hébergement : Vercel, projet `arrow-home`. Base : Supabase, projet « Arrow Home » (en pause au 20/10/2026)

## Langues
- FR (défaut), EN, ZH (`zh-Hans`). Une seule app : `src/app/[locale]/…`, dossiers internes en anglais (`projects`, `quote`…)
- URL publiques traduites dans `src/i18n/routes.ts` ; `src/middleware.ts` réécrit l'URL publique vers le dossier interne et redirige `/`, les anciens liens (`/devis`), les pages supprimées (`/immobilier` → accueil) et les slugs non traduits
- Textes : `src/i18n/dictionaries/{fr,en,zh}.ts` (fr définit le type). Aucun texte en dur dans les composants

## Charte
- Design (demande du client) : FOND BLANC partout, TEXTES EN BLEU du logo `#004E85` (jeton `graphite`), texte secondaire bleu `#3D6D96` (`stone`), bordures `#DCE6EF` (`mist`), encadrés `#F3F7FB` (`tint`). Vert du logo `#95BE29` (`champagne`) seulement pour de fins traits décoratifs ; petits sur-titres en vert foncé `#4A7A12` (`champagne-700`). Les noms de jetons historiques sont conservés
- AUCUN DESSIN / ILLUSTRATION : le client les a refusés. Sans photo, afficher un encadré sobre « Photos à venir » (PortfolioCard) ou une icône (expertises). Les vraies photos arriveront plus tard
- LOGO : `public/brand/logo.png`, original (SHA-256 71d70061…68390), via `src/components/Logo.tsx`. Jamais de filtre, d'opacité, de recoloration ni de version redessinée. Texte noir → toujours sur fond clair
- Coordonnées : `src/lib/site.ts` (e-mail unique : info@arrowhome.cc ; l'adresse gmail a été retirée à la demande du client)

## Contenu
- Réalisations réelles : `src/content/portfolio.ts` (`projects`, vide pour l'instant ; encadrés « Photos à venir » via `placeholders`)
- Témoignages : `src/content/trust.ts` (vide ; section masquée tant qu'elle est vide)
- Ne pas inventer de chiffres, projets, témoignages, certifications, dates. Ne pas afficher d'année de création
- Infos de l'ancien site (50+ projets, 100 % satisfaits, 90 jours, garantie 1 an, ingénierie chinoise, projets Almadies/Plateau…) : à confirmer par l'utilisateur avant ajout

## Formulaires
- `src/app/actions/lead.ts` (Server Action) → `src/lib/leads/` (schema zod, store Supabase REST côté serveur, notify Resend, rate-limit)
- Table `website_leads` : `supabase/migrations/20261020000000_website_leads.sql` (RLS sans politique)
- Écriture uniquement via la fonction `submit_website_lead` (`20261021000000_submit_website_lead.sql`) : clé publique + jeton secret `LEAD_RPC_TOKEN`, limitation 3/15 min par IP et 60/h au total dans la base. Plus de clé service_role
- Conversion : `QuickQuote` (choix de prestation → devis pré-rempli), `MobileActionBar` (Appeler / WhatsApp / Devis sur mobile), case d'appel dans `ServicesGrid`
- Variables : voir `.env.example`. Sans configuration, le formulaire affiche « indisponible » (jamais de fausse confirmation)

## À faire
1. Supabase « Arrow Home » relancé le 21/10/2026 (AYZORA AI mis en pause à la demande du client). Migrations appliquées, empreinte du jeton enregistrée, variables Vercel (Production + Preview) : SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY, LEAD_RPC_TOKEN, LEAD_IP_SALT. Reste : confirmer un envoi réel depuis le site
2. Photos réelles (diaporama, expertises, réalisations) avec droits d'usage
3. Pousser ce code sur GitHub `cisscheikhmb42-jpg/Arrow-Home-Group` (contient une ancienne version), relier Vercel, déployer en Preview puis production ; puis supprimer les 5 anciens projets Vercel arrow-home-* (avec accord)
4. Nom de domaine définitif → `NEXT_PUBLIC_SITE_URL`
5. Mentions légales : ajouter RCCM, NINEA, responsable de publication quand fournis
6. Migration Next.js 16 (avis de sécurité postcss) dans une branche dédiée
7. Espace admin (Supabase Auth) seulement si nécessaire

## Règles
- Le site doit fonctionner parfaitement sur téléphone, tablette et ordinateur (tester 375 / 768 / 1440 px)
- Le menu mobile est rendu HORS du `<header>` (son backdrop-filter piégerait le `position: fixed`)
