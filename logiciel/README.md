# UNIVERSNORMES — Logiciel QHSE

Application web de management QHSE : santé-sécurité, qualité et environnement. Elle fonctionne sans serveur,
sans compte et sans connexion, et s'installe sur un ordinateur ou un téléphone.

## Lancer

```bash
cd logiciel
python3 -m http.server 8000      # puis ouvrir http://localhost:8000
```

Pour la mettre en ligne, il suffit de copier le dossier `logiciel/` tel quel sur n'importe quel hébergement statique
(GitHub Pages, Netlify, OVH…). Au premier lancement, un jeu de démonstration s'affiche (3 sites en Côte d'Ivoire).
On peut le vider dans **Données**.

## Modules

| Module | Ce qu'il fait |
|---|---|
| Tableau de bord | Jours sans accident, TF et TG, actions en retard, score des audits, conformité réglementaire, matrice des risques, pyramide de Bird |
| Événements | Accidents, presqu'accidents, situations dangereuses, incidents, non-conformités, réclamations. Fiche détaillée avec **5 pourquoi**, **Ishikawa 5M** et cause racine (enregistrement automatique) |
| Risques | Évaluation G × P (4 × 4), risque brut et résiduel, matrice cliquable qui filtre la liste |
| Audits et inspections | Réalisation sur tablette question par question (C / NC / N/A), score en %. **Chaque NC devient automatiquement une action corrective** à la clôture |
| Plan d'actions | Actions correctives, préventives et d'amélioration reliées à leur origine, échéances, retards, vérification de l'efficacité |
| Documents | Maîtrise documentaire : code, version, circuit de validation, date de revue, pièce jointe ou lien, historique des versions |
| Veille réglementaire | Exigences légales, évaluation de la conformité, preuves, actions |
| Personnel et formations | Habilitations, visites médicales, certificats avec alerte d'expiration à 60 jours |
| Indicateurs | TF, TG et accidents par mois, origine des actions, charge par responsable, scores d'audit, export CSV |
| Alertes 🔔 | Actions en retard, habilitations expirées, documents à revoir, audits non réalisés, risques critiques sans action, événements non analysés après 7 jours |

Vous pouvez aussi filtrer par site, exporter chaque liste en CSV (pour Excel), imprimer les fiches et les rapports
d'audit, sauvegarder et restaurer toutes les données en JSON, et modifier les grilles d'audit (ISO 9001, 45001, 14001
et visite de sécurité sont fournies).

## Fichiers

```
index.html             structure de la page
styles.css             charte UNIVERSNORMES (couleurs et polices de la brochure)
app.js                 toute la logique : stockage, schémas des modules, écrans, données de démonstration
sw.js, manifest.webmanifest   installation et fonctionnement hors ligne
assets/                logo, icônes, polices (licence OFL)
```

Pour ajouter un champ ou un module simple, il suffit de modifier l'objet `MODULES` dans `app.js` : le formulaire,
le tableau, les filtres et l'export CSV se génèrent à partir de ce schéma.

## Limites actuelles et suite possible

- Les données restent **dans le navigateur de chaque poste**. Aujourd'hui, le partage entre plusieurs utilisateurs
  passe par l'export et l'import. La prochaine étape est d'ajouter un serveur avec une base de données, des comptes,
  des rôles et une synchronisation.
- Pièces jointes limitées à 1 Mo : au-delà, mettez plutôt un lien vers Drive ou SharePoint.
- À venir : notifications par e-mail ou WhatsApp, photos prises depuis le téléphone lors des inspections,
  signature électronique des documents.
