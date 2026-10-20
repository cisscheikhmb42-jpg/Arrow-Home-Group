# Rapport de refonte : 20 octobre 2026

## Ce qui a été réalisé

- **Bug corrigé** : les boutons du diaporama « Demander un devis », « Rénover mon espace », « Voir les biens disponibles » et « Présenter mon projet » menaient à des pages inexistantes (`/devis`, `/immobilier` → 404). Ces pages existent désormais dans les 3 langues, et les anciens liens redirigent vers elles.
- **E-mail** : `info@arrowhome.cc` est l'adresse principale (contact, pied de page, mentions légales, données structurées). L'ancienne adresse `arrowhome.senegal@gmail.com` est conservée et affichée en second.
- **Site en 3 langues** (FR par défaut, EN, 简体中文) : 11 pages × 3 langues, URL traduites, sélecteur FR · EN · 中文 qui conserve la page, les filtres, le service pré-sélectionné et la saisie en cours dans un formulaire.
- **Direction artistique** : graphite, champagne, blanc cassé ; titres en Cormorant Garamond, texte en Manrope ; angles nets, fines lignes champagne, sections claires et sombres alternées.
- **Pages** : accueil (diaporama, bandeau, 8 expertises, portfolio horizontal, à propos, méthode en 5 étapes, immobilier, contact), expertises détaillées, réalisations (défilement horizontal + grille filtrable par 8 catégories), fiche projet (prête, générée dès qu'un projet réel est ajouté), à propos, méthode, contact (formulaire), devis (formulaire pré-rempli), immobilier, mentions légales, confidentialité, page 404 traduite.
- **Formulaires sécurisés** : validation serveur, anti-spam, limitation de fréquence, enregistrement Supabase, e-mail facultatif.
- **SEO** : titres et descriptions uniques et traduits, balises canoniques, hreflang `fr` / `en` / `zh-Hans` / `x-default`, sitemap multilingue, robots.txt, Open Graph, données structurées `GeneralContractor`.

## Logo

Fichier original `public/brand/logo.png` conservé tel quel (empreinte SHA-256 identique avant/après : `71d70061e43c8e71a010eeba5fe37f3a6dc71813de8a47ea18d1f16aa3068390`). Couleurs mesurées dans le fichier : bleu `#004E85`, vert `#95BE29`.
Le composant `BrandMark` (un « A » redessiné en SVG, affiché recoloré et en transparence) a été supprimé, car il contrevenait à la règle du logo.
Test automatique : aucun filtre, aucun mode de fusion, opacité 1, proportions identiques (rapport 1,684), dans l'en-tête comme dans le pied de page.

## Résultats des tests (exécutés sur un serveur de production local)

| Test | Résultat |
|---|---|
| Compilation `next build` | Réussie, 39 pages statiques |
| Vérification TypeScript | Sans erreur |
| Tests navigateur automatisés (Playwright) | **53/53 réussis** (détail : `docs/tests-navigateur.txt`) |
| Les 5 boutons du diaporama → pages valides | OK |
| 33 URL (3 langues) + redirections + 404 | OK |
| Détection de langue (navigateur, cookie) | OK |
| Absence de français sur les pages EN/ZH | OK (seuls restent « Français » dans le sélecteur, le nom de ville « Thiès » et le nom officiel de la CDP) |
| Pas de débordement horizontal à 375, 768 et 1440 px | OK |
| Menu mobile visible, cliquable, fermeture avec Échap | OK |
| Clavier : lien d'évitement, focus visible, portfolio au clavier | OK |
| Formulaires : erreurs traduites FR/EN/ZH, champ piège, envoi trop rapide, limitation (4ᵉ envoi bloqué), confirmation uniquement après enregistrement | OK, **avec une base Supabase simulée** |
| En-têtes de sécurité | OK |
| Secrets dans les fichiers du dépôt | Aucun |
| Lighthouse `/fr` mobile | Performance 94, Accessibilité 100, Bonnes pratiques 96, SEO 100 |
| Lighthouse `/fr` ordinateur | 100 / 100 / 96 / 100 |
| Lighthouse `/zh/projects` mobile | 99 / 100 / 100 / 100 |

Les scores Lighthouse ont été mesurés en local : ils seront différents en ligne (réseau réel, CDN). Le point « Bonnes pratiques » à 96 venait d'un signalement CSP lié à zod, corrigé ensuite (zod n'est plus envoyé au navigateur) ; Lighthouse n'a pas été relancé après cette correction.

## Non testé / non réalisable ici

- **Enregistrement dans la vraie base Supabase** : le projet « Arrow Home » est en pause et aucune clé n'est disponible.
- **Envoi d'e-mails** : aucun compte Resend configuré.
- **Carte Google Maps** et **site de référence** : inaccessibles depuis l'environnement de travail (réseau restreint). Le site de référence n'a donc pas pu être analysé.
- **Vrais appareils iPhone/Android** : tests faits par émulation de tailles d'écran dans Chromium.
- **Déploiement** : non effectué (ni GitHub ni Vercel n'étaient accessibles en écriture depuis cette session).

## Éléments de contenu à fournir

1. Photos de chantiers et de réalisations (avec droits d'usage), et une photo forte pour l'accueil.
2. Réalisations : nom, catégorie, lieu, description, prestations, en 3 langues (ou en français : la traduction peut être faite ensuite).
3. Témoignages clients authentiques (avec accord écrit).
4. Biens immobiliers disponibles, si vous souhaitez les publier.
5. Mentions légales : RCCM, NINEA, nom du responsable de la publication.
6. Confirmation des informations de l'ancien site avant publication (50+ projets, garanties, délais, partenaires…).
7. Nom de domaine définitif.
8. Relecture du chinois par un locuteur natif (recommandée pour un usage commercial).
