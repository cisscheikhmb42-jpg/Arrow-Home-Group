# Sécurité : mesures en place et limites

Aucun site n'est invulnérable. Ce document décrit les protections réellement mises en place et vérifiées, et ce qui reste à faire.

## Mesures en place

| Domaine | Mesure | Fichier |
|---|---|---|
| Secrets | Clés Supabase et Resend lues uniquement côté serveur (pas de `NEXT_PUBLIC_`), modules marqués `server-only` | `src/lib/leads/*` |
| Secrets | `.env*` ignorés par Git ; `.env.example` sans valeur réelle | `.gitignore`, `.env.example` |
| Base de données | Table `website_leads` avec RLS activé et **aucune** politique ; droits retirés à `anon` et `authenticated` ; contraintes de longueur et de valeurs | `supabase/migrations/…sql` |
| Validation | Schéma zod côté serveur : types, longueurs, formats (téléphone, e-mail), listes fermées (prestation, budget, langue), consentement obligatoire ; seuls les champs attendus sont lus, un fichier envoyé est rejeté | `src/lib/leads/schema.ts`, `src/app/actions/lead.ts` |
| Taille des requêtes | Server Actions limitées à 64 Ko | `next.config.ts` |
| CSRF | Server Actions Next.js : contrôle automatique de l'en-tête Origin | (Next.js) |
| Anti-spam | Champ piège invisible, délai minimal de 2,5 s, limitation à 3 envois / 15 min par empreinte IP (comptage en base, donc partagé entre toutes les instances Vercel) | `src/lib/leads/rate-limit.ts` |
| Vie privée | L'adresse IP n'est jamais stockée, seulement une empreinte SHA-256 salée | `rate-limit.ts` |
| Injection | Requêtes REST paramétrées (pas de SQL construit) ; e-mail de notification en texte brut ; sujet nettoyé des retours à la ligne ; JSON-LD échappé | `store.ts`, `notify.ts`, `[locale]/layout.tsx` |
| Erreurs | Messages génériques traduits côté visiteur ; journaux serveur sans données personnelles | `actions/lead.ts` |
| En-têtes HTTP | CSP, HSTS (production), `X-Content-Type-Options`, `Referrer-Policy`, `X-Frame-Options: DENY` + `frame-ancestors 'none'`, `Permissions-Policy`, COOP ; en-tête `X-Powered-By` supprimé | `next.config.ts` |
| Surface d'attaque | Aucun espace d'administration ni compte utilisateur créé ; aucune route API publique | — |

### Content-Security-Policy : compromis assumé
`script-src` contient `'unsafe-inline'`, car Next.js insère des scripts en ligne pour l'hydratation. Une CSP à nonce l'éviterait, mais obligerait à rendre chaque page dynamiquement (plus lent, plus coûteux). Le risque est limité : le site n'affiche aucun contenu saisi par des visiteurs. Toutes les autres sources sont restreintes à `'self'`, sauf la carte Google Maps (`frame-src`).

## Vérifications effectuées (20 octobre 2026)

- Tests navigateur automatisés (53/53 réussis) : validation, messages d'erreur traduits, champ piège, envoi trop rapide, limitation de fréquence (4ᵉ envoi bloqué), absence de fausse confirmation sans base configurée, aucune erreur JavaScript ni violation CSP dans la console.
- En-têtes HTTP contrôlés sur le serveur de production local.
- Recherche de secrets dans les fichiers suivis par Git : aucun trouvé.
- `npm audit --omit=dev` : voir ci-dessous.

Les tests d'enregistrement ont utilisé une **simulation** de l'API Supabase : l'écriture dans la vraie base n'a pas pu être testée, car le projet Supabase est en pause et aucune clé n'est configurée.

## Dépendances

- `sharp` (traitement d'images) : vulnérabilités corrigées par `npm audit fix` (mise à jour mineure).
- `postcss` embarqué par Next.js 15.5.28 : avis de sécurité dont la correction n'existe que dans Next.js 16 (version majeure). Ces failles concernent le traitement de fichiers CSS au moment de la compilation, pas les données des visiteurs. **Recommandation** : planifier la migration vers Next.js 16 dans une branche dédiée, avec tests.
- Avis restants sur des outils de développement uniquement (ESLint) : sans effet sur le site en ligne.

## À faire avant / après la mise en ligne

1. Générer un `LEAD_IP_SALT` aléatoire (`openssl rand -hex 32`) dans Vercel.
2. Ne jamais copier la clé `service_role` ailleurs que dans les variables Vercel. En cas de doute sur une fuite : la régénérer dans Supabase.
3. Activer l'authentification à deux facteurs sur les comptes GitHub, Vercel, Supabase et Resend.
4. Après déploiement, vérifier les en-têtes sur le domaine réel (par ex. securityheaders.com).
5. Prévoir une purge régulière des anciennes demandes, conformément à la politique de confidentialité.
