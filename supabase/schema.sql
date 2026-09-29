-- Arrow Home Group — schéma initial Supabase
create extension if not exists "pgcrypto";

create table if not exists public.services (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  icon text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  location text not null,
  type text not null,
  status text not null default 'À vendre',
  price numeric not null default 0,
  bedrooms int,
  bathrooms int,
  area_m2 numeric,
  image_url text,
  description text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  location text,
  description text,
  image_url text,
  is_published boolean default true,
  created_at timestamptz default now()
);

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  service text,
  message text,
  status text not null default 'nouveau',
  created_at timestamptz default now()
);

alter table public.services enable row level security;
alter table public.properties enable row level security;
alter table public.projects enable row level security;
alter table public.leads enable row level security;

drop policy if exists "public read services" on public.services;
create policy "public read services" on public.services for select using (is_active = true);

drop policy if exists "public read properties" on public.properties;
create policy "public read properties" on public.properties for select using (is_published = true);

drop policy if exists "public read projects" on public.projects;
create policy "public read projects" on public.projects for select using (is_published = true);

drop policy if exists "public create leads" on public.leads;
create policy "public create leads" on public.leads for insert to anon, authenticated with check (true);

insert into public.services (name, description, icon, sort_order) values
('Construction','Conception et réalisation de bâtiments modernes et durables.','▦',1),
('Rénovation','Transformation, modernisation et valorisation de vos espaces.','↗',2),
('Aménagement','Des espaces pensés pour le confort, la fonctionnalité et l’élégance.','⌂',3),
('Finition','Des finitions soignées pour donner du caractère à chaque projet.','✦',4),
('Aluminium & Bois','Menuiserie aluminium et bois sur mesure pour vos projets.','◇',5),
('Ascenseurs','Solutions d’élévation adaptées aux bâtiments résidentiels et professionnels.','↕',6),
('Immobilier','Accompagnement dans la recherche, la vente et la valorisation de biens.','⌂',7),
('Décoration','Une approche contemporaine pour créer des intérieurs distinctifs.','◈',8)
on conflict do nothing;