-- Arrow Home Group : enregistrement des demandes via une fonction verrouillée (moindre privilège).
-- Migration NON destructive : ajoute un schéma privé, une table de réglage et une fonction. Aucune donnée supprimée.
--
-- Pourquoi : le site n'a plus besoin de la clé service_role (qui contourne RLS sur toute la base).
-- Le serveur Next.js appelle seulement cette fonction, avec la clé publique (publishable/anon) et un jeton secret.
-- * public.website_leads reste en RLS sans aucune politique : ni lecture ni écriture directe possible.
-- * La fonction vérifie le jeton (dont seule l'empreinte SHA-256 est stockée), limite à 3 demandes / 15 min
--   par empreinte IP et à 60 demandes / heure au total, puis insère la ligne.
--
-- Après application : définir le jeton (valeur aléatoire, gardée uniquement dans Vercel → LEAD_RPC_TOKEN) :
--   insert into private.lead_settings (id, token_sha256)
--   values (1, encode(extensions.digest('<JETON>', 'sha256'), 'hex'))
--   on conflict (id) do update set token_sha256 = excluded.token_sha256;

create extension if not exists pgcrypto with schema extensions;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create table if not exists private.lead_settings (
  id smallint primary key default 1 check (id = 1),
  token_sha256 text not null check (char_length(token_sha256) = 64)
);
alter table private.lead_settings enable row level security;
revoke all on table private.lead_settings from public, anon, authenticated;

create or replace function public.submit_website_lead(
  p_token text,
  p_kind text,
  p_locale text,
  p_full_name text,
  p_phone text,
  p_email text,
  p_service text,
  p_location text,
  p_budget text,
  p_message text,
  p_ip_hash text
) returns text
language plpgsql
security definer
set search_path = ''
as $$
declare
  expected text;
begin
  select token_sha256 into expected from private.lead_settings where id = 1;
  if expected is null or p_token is null
     or encode(extensions.digest(p_token, 'sha256'), 'hex') <> expected then
    return 'forbidden';
  end if;

  if (select count(*) from public.website_leads
      where ip_hash = p_ip_hash and created_at >= now() - interval '15 minutes') >= 3 then
    return 'rate_limited';
  end if;

  if (select count(*) from public.website_leads where created_at >= now() - interval '1 hour') >= 60 then
    return 'rate_limited';
  end if;

  insert into public.website_leads
    (kind, locale, full_name, phone, email, service, location, budget, message, consent, ip_hash)
  values
    (p_kind, p_locale, p_full_name, p_phone, nullif(p_email, ''), nullif(p_service, ''),
     nullif(p_location, ''), nullif(p_budget, ''), p_message, true, p_ip_hash);

  return 'ok';
end;
$$;

revoke all on function public.submit_website_lead(text, text, text, text, text, text, text, text, text, text, text)
  from public, authenticated;
grant execute on function public.submit_website_lead(text, text, text, text, text, text, text, text, text, text, text)
  to anon;

comment on function public.submit_website_lead is
  'Point d''entrée unique des formulaires du site : jeton secret + limitation de fréquence + insertion. Aucune lecture possible.';
