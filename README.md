# Arrow Home Group

Application web professionnelle pour Arrow Home : immobilier, construction, rénovation, aménagement, finition, aluminium & bois, ascenseurs et décoration.

## Stack
- Next.js
- React
- Supabase
- Vercel
- TypeScript

## Installation
```bash
npm install
npm run dev
```

## Supabase
1. Créer un projet Supabase.
2. Ouvrir SQL Editor.
3. Exécuter `supabase/schema.sql`.
4. Copier les clés dans `.env.local` à partir de `.env.example`.

## Déploiement Vercel
Ajouter `NEXT_PUBLIC_SUPABASE_URL` et `NEXT_PUBLIC_SUPABASE_ANON_KEY` dans les variables d'environnement du projet Vercel.

> Ne jamais mettre une clé `service_role` dans le frontend ou dans GitHub.
