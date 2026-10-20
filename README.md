# Arrow Home Group : site web

Site corporate multilingue (français, anglais, chinois simplifié) d'ARROW HOME GROUP : construction, rénovation, aménagement, finition, aluminium, bois, ascenseurs, immobilier et décoration, à Dakar (Sénégal).

- Next.js 15.5 (App Router, `src/`), React 19, TypeScript, Tailwind CSS v4
- Toutes les pages sont générées statiquement ; seul l'envoi des formulaires s'exécute côté serveur (Server Action)
- Hébergement prévu : Vercel. Enregistrement des demandes : Supabase. Notification e-mail facultative : Resend

## Lancer le projet en local

```bash
npm ci
cp .env.example .env.local   # puis renseigner les valeurs (voir plus bas)
npm run dev                  # http://localhost:3000 → redirige vers /fr, /en ou /zh
```

Version de production locale : `npm run build && npm start`.

## Pages (une seule application, URL traduites)

| Page | Français | English | 中文 |
|---|---|---|---|
| Accueil | `/fr` | `/en` | `/zh` |
| Expertises | `/fr/services` | `/en/services` | `/zh/services` |
| Réalisations | `/fr/realisations` | `/en/projects` | `/zh/projects` |
| Fiche projet | `/fr/realisations/<slug>` | `/en/projects/<slug>` | `/zh/projects/<slug>` |
| À propos | `/fr/a-propos` | `/en/about` | `/zh/about` |
| Méthode | `/fr/notre-methode` | `/en/our-process` | `/zh/process` |
| Contact | `/fr/contact` | `/en/contact` | `/zh/contact` |
| Devis | `/fr/devis` | `/en/quote` | `/zh/quote` |
| Immobilier | `/fr/immobilier` | `/en/real-estate` | `/zh/real-estate` |
| Mentions légales | `/fr/mentions-legales` | `/en/legal-notice` | `/zh/legal` |
| Confidentialité | `/fr/confidentialite` | `/en/privacy-policy` | `/zh/privacy` |

- `/` redirige vers la langue du visiteur (cookie de choix, sinon langue du navigateur, sinon français).
- Les anciens liens restent valides : `/devis?service=…` → `/fr/devis?service=…`, `/immobilier` → `/fr/immobilier`. Les anciens identifiants de services (`construction-btp`, `projets-hoteliers`, `menuiserie`…) pré-remplissent la bonne prestation.
- Le devis se pré-remplit avec `?service=construction|renovation|amenagement-finition|aluminium|bois|ascenseurs|immobilier|decoration`.

## Où modifier le contenu

| Quoi | Fichier |
|---|---|
| Tous les textes (3 langues) | `src/i18n/dictionaries/fr.ts`, `en.ts`, `zh.ts` (le français définit la structure ; TypeScript signale toute clé manquante) |
| Coordonnées, e-mails, réseaux sociaux | `src/lib/site.ts` |
| URL traduites des pages | `src/i18n/routes.ts` |
| Expertises : icône, illustration, photo | `src/content/services.ts` |
| Réalisations réelles + illustrations d'attente | `src/content/portfolio.ts` |
| Témoignages, biens immobiliers | `src/content/trust.ts` |
| Couleurs, typographie, boutons | `src/app/globals.css` |

### Ajouter les vraies photos
1. Déposer les fichiers dans `public/photos/…` (JPG/WebP, 2000 px de large environ). Uniquement des photos dont l'entreprise détient les droits.
2. Réalisation : ajouter un objet dans `projects` (`src/content/portfolio.ts`). Sa fiche est créée dans les 3 langues, le sitemap est mis à jour, et l'illustration de la catégorie disparaît automatiquement.
3. Expertise : renseigner `image` dans `serviceMeta` (`src/content/services.ts`).
4. Diaporama d'accueil : ajouter `image: "/photos/…"` à une diapositive dans `src/app/[locale]/page.tsx`.

Les témoignages et les biens immobiliers ne s'affichent que lorsqu'ils existent réellement : aucune donnée fictive n'est publiée.

## Logo

`public/brand/logo.png` est le fichier original (320 × 190, SHA-256 `71d70061…68390`). Il est affiché tel quel par `src/components/Logo.tsx` : aucun filtre, aucune opacité, aucune recoloration. Son texte étant noir, il est toujours posé sur un fond clair (y compris dans le pied de page, sur un encart blanc cassé).

## Formulaires (devis et contact)

Fonctionnement : validation côté serveur (zod) → champ piège anti-robot + délai minimum → limitation à 3 envois par 15 min et par adresse IP (empreinte hachée) → enregistrement Supabase → e-mail facultatif. La confirmation n'est affichée **que si** la demande a été enregistrée ou transmise par e-mail. Si rien n'est configuré, le visiteur voit un message l'invitant à appeler ou écrire sur WhatsApp.

### Activer l'enregistrement (Supabase)
1. Dans Supabase, projet « Arrow Home » (actuellement **en pause** : le relancer depuis le tableau de bord).
2. SQL Editor → exécuter `supabase/migrations/20261020000000_website_leads.sql` (crée seulement une nouvelle table, RLS activé, aucun accès public).
3. Dans Vercel → Settings → Environment Variables (Production et Preview) : `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `LEAD_IP_SALT`.
4. Les demandes se consultent dans Supabase → Table Editor → `website_leads`.

### Activer la notification e-mail (facultatif)
Créer un compte Resend, vérifier le domaine `arrowhome.cc`, puis renseigner `RESEND_API_KEY`, `LEAD_NOTIFY_FROM` (ex. `Site Arrow Home <site@arrowhome.cc>`) et `LEAD_NOTIFY_TO` (ex. `info@arrowhome.cc`).

## Déploiement (GitHub + Vercel)

1. Pousser ce dossier sur le dépôt GitHub `cisscheikhmb42-jpg/Arrow-Home-Group` (il contient aujourd'hui une ancienne version différente : utiliser une nouvelle branche puis une pull request).
2. Dans Vercel, projet `arrow-home` → Settings → Git → connecter ce dépôt. Framework : Next.js ; commande de build : `next build` (par défaut).
3. Ajouter les variables d'environnement ci-dessus, puis déployer d'abord en **Preview**, vérifier, et promouvoir en production.
4. Nom de domaine : l'ajouter dans Vercel → Domains, puis définir `NEXT_PUBLIC_SITE_URL` avec l'adresse définitive.

Sécurité, tests et points restants : voir `docs/SECURITE.md` et `docs/RAPPORT.md`.
