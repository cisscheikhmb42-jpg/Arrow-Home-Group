-- Arrow Home Group : demandes de devis et messages de contact reçus via le site.
-- Migration NON destructive : crée uniquement une nouvelle table.
--
-- Sécurité :
-- * RLS activé, AUCUNE politique : la table est inaccessible avec la clé publique (anon) ou un utilisateur connecté.
-- * Seul le serveur Next.js y écrit, avec la clé service_role conservée dans les variables Vercel.
-- * Lecture des demandes : depuis le tableau de bord Supabase (Table Editor), par les membres du projet.

create table if not exists public.website_leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  kind text not null check (kind in ('quote', 'contact')),
  locale text not null check (locale in ('fr', 'en', 'zh')),
  full_name text not null check (char_length(full_name) between 2 and 120),
  phone text not null check (char_length(phone) between 7 and 25),
  email text check (email is null or char_length(email) <= 160),
  service text check (service is null or char_length(service) <= 40),
  location text check (location is null or char_length(location) <= 160),
  budget text check (budget is null or budget in ('lt5', '5-20', '20-50', '50-100', 'gt100', 'unknown')),
  message text not null check (char_length(message) between 10 and 3000),
  consent boolean not null check (consent),
  ip_hash text not null check (char_length(ip_hash) = 64),
  status text not null default 'nouveau' check (status in ('nouveau', 'en_cours', 'traite', 'archive'))
);

alter table public.website_leads enable row level security;
revoke all on table public.website_leads from anon, authenticated;

-- Accélère la limitation de fréquence (comptage par empreinte IP sur une fenêtre de temps).
create index if not exists website_leads_ip_hash_created_at_idx on public.website_leads (ip_hash, created_at desc);
create index if not exists website_leads_created_at_idx on public.website_leads (created_at desc);

comment on table public.website_leads is 'Demandes reçues via les formulaires du site (devis, contact). Écriture serveur uniquement.';
