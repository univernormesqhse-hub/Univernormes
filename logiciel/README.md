# UNIVERSNORMES — Logiciel QHSE

Application web de management QHSE : santé-sécurité, qualité et environnement. Elle fonctionne sur ordinateur, tablette
et téléphone, même sans connexion. Elle existe en deux modes :

| | **Mode local** | **Mode serveur (multi-utilisateurs)** |
|---|---|---|
| Pour qui | Une personne seule, démonstration | Une équipe, plusieurs sites |
| Où sont les données | Dans le navigateur de l'appareil | Sur le serveur (base SQLite + dossier de photos) |
| Comptes et rôles | — | Administrateur, Responsable QHSE, Contributeur terrain, Lecteur |
| Photos | Oui, peu nombreuses (espace limité) | Oui, sans limite pratique |
| Alertes e-mail / WhatsApp | — | Oui |
| Journal « qui a fait quoi » | — | Oui |
| Hors ligne | Oui | Oui : les saisies attendent sur l'appareil et partent au retour du réseau |

L'application choisit le mode toute seule : servie par le serveur QHSE, elle passe en mode serveur, sinon elle reste en
mode local.

> **Sans budget ?** La **version gratuite** fait tourner le mode serveur sur un compte Gmail : Google Apps Script
> pour le serveur, Google Sheets pour les données, Drive pour les photos, Gmail pour les alertes. Elle ne demande
> ni carte bancaire ni machine à entretenir. Voir [`gas/INSTALLATION.md`](gas/INSTALLATION.md).

## Démarrer

**Mode local** : il suffit de servir le dossier `logiciel/` (par exemple `python3 -m http.server 8000`) ou de le
déposer sur n'importe quel hébergement de fichiers.

**Mode serveur** : il faut Node.js 22.13 ou plus récent.

```bash
cd logiciel/serveur
npm install            # une seule dépendance : nodemailer (e-mails)
cp .env.exemple .env   # puis remplir ce qui vous concerne
npm start              # http://localhost:3000
```

Au premier lancement, un écran **Installation** permet de créer le compte administrateur. On choisit alors de
partir d'une base vide (les grilles d'audit ISO 9001, 14001 et 45001 sont fournies), de la démonstration, ou de
**reprendre les fiches déjà saisies dans ce navigateur en mode local**.

**Avec Docker** (serveur, VPS, Render, Railway…) :

```bash
cd logiciel
docker build -t universnormes-qhse .
docker run -d --name qhse -p 3000:3000 -v qhse-donnees:/data --env-file serveur/.env universnormes-qhse
```

Mettez un proxy HTTPS devant (Caddy, Nginx, ou le HTTPS fourni par l'hébergeur), puis renseignez `APP_URL`
dans `.env` pour que les liens des e-mails pointent au bon endroit.

### Sauvegardes

Tout se trouve dans le dossier de données : `serveur/donnees/`, ou `/data` avec Docker. Il contient `qhse.sqlite`
et le sous-dossier `fichiers/` (photos et pièces jointes). Copiez ce dossier chaque nuit. L'écran
**Administration → Sauvegarde** permet aussi d'exporter toutes les fiches en JSON.

## Comptes et rôles

| Rôle | Peut |
|---|---|
| Administrateur | Tout, y compris créer les comptes, réinitialiser les mots de passe et régler les alertes |
| Responsable QHSE | Créer, modifier et supprimer toutes les fiches ; voir le journal et les envois d'alertes |
| Contributeur terrain | Déclarer des événements, réaliser des audits, mettre à jour les actions. Ne supprime rien |
| Lecteur | Tout consulter, sans rien modifier (direction, auditeur externe…) |

Les droits sont vérifiés par le serveur, pas seulement par l'affichage. Reliez chaque compte à sa fiche
**Personnel** : la personne voit alors le filtre « Mes actions », retrouve son nom et son site déjà remplis quand
elle déclare un événement, et reçoit ses alertes.

Sécurité : mots de passe hachés (scrypt), session par cookie HttpOnly, protection CSRF, blocage après 8 essais de
mot de passe ratés, les fichiers envoyés ne sont jamais exécutés par le navigateur, et le code du serveur n'est pas
téléchargeable.

## Alertes par e-mail et WhatsApp

- **Récapitulatif quotidien**, du lundi au vendredi à 7 h (réglable). Chaque personne reçoit **ses** alertes :
  actions en retard, habilitations qui expirent, documents à revoir, audits non réalisés. Les administrateurs et
  responsables QHSE reçoivent la liste complète.
- **Alertes immédiates** : quand une action est confiée à quelqu'un, et dès qu'un accident de travail ou un
  événement grave est déclaré.
- Les destinataires sont les comptes utilisateurs et les fiches **Personnel** qui ont un e-mail ou un numéro WhatsApp.
- **Administration → Alertes** affiche l'état de la configuration, envoie un message de test, déclenche le
  récapitulatif à la demande et montre l'historique des envois avec les éventuelles erreurs.

### E-mail

Renseignez `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` et `SMTP_FROM` dans `.env`. Tout service SMTP
convient : Brevo (gratuit jusqu'à 300 e-mails par jour), Gmail ou Google Workspace (avec un « mot de passe
d'application »), Outlook / Microsoft 365, OVH, ou le serveur de messagerie de l'entreprise.

### WhatsApp

Le logiciel utilise l'**API WhatsApp Cloud** de Meta (l'API officielle) :

1. Créez une application sur developers.facebook.com, ajoutez le produit **WhatsApp** et un numéro d'entreprise.
2. Générez un jeton permanent (utilisateur système), puis renseignez `WHATSAPP_TOKEN` et `WHATSAPP_PHONE_ID`.
3. Créez et faites approuver un **modèle de message** en français, de catégorie « Utilitaire », dont le corps
   contient une variable `{{1}}`, par exemple `Alerte QHSE : {{1}}`. Indiquez son nom dans `WHATSAPP_TEMPLATE`.
   Sans modèle, WhatsApp ne délivre les messages qu'aux personnes qui ont écrit au numéro de l'entreprise dans
   les dernières 24 heures.
4. Saisissez les numéros au format international, par exemple `+225 07 01 02 03 04`. En Côte d'Ivoire, le 0
   initial fait partie du numéro. Sans `+`, l'indicatif `WHATSAPP_INDICATIF` est ajouté (225 par défaut).

Meta facture les messages de modèle (quelques francs CFA par message en Afrique de l'Ouest).

## Modules

| Module | Ce qu'il fait |
|---|---|
| Tableau de bord | Jours sans accident, TF et TG, actions en retard, score des audits, conformité réglementaire, matrice des risques, pyramide de Bird |
| Événements | Accidents, presqu'accidents, situations dangereuses, incidents, non-conformités, réclamations, **avec photos**. Fiche détaillée avec 5 pourquoi, Ishikawa 5M et cause racine |
| Risques | Évaluation G × P (4 × 4), risque brut et résiduel, matrice cliquable |
| Audits et inspections | Réponse C / NC / N/A question par question, sur tablette, avec **photo par question** et score en %. Chaque NC devient automatiquement une action corrective |
| Plan d'actions | Actions reliées à leur origine, échéances, retards, vérification de l'efficacité, **photos avant / après**, filtre « Mes actions » |
| Documents | Maîtrise documentaire : version, circuit de validation, revue, pièce jointe (10 Mo en mode serveur), historique |
| Veille réglementaire | Exigences légales, conformité, preuves, actions |
| Personnel et formations | Habilitations, visites médicales, certificats, alerte 60 jours avant expiration |
| Indicateurs | TF, TG, origine des actions, charge par responsable, scores d'audit, export CSV |
| Administration | Comptes, alertes, journal d'activité, sauvegarde (mode serveur) |

Les photos prises au téléphone sont réduites dans le navigateur avant l'envoi : une photo de 4 Mo pèse environ
300 Ko, ce qui compte sur les réseaux mobiles.

## Fonctionnement technique

```
index.html, styles.css         interface
regles.js                      règles métier partagées navigateur / serveur (alertes, échéances, scores, droits)
app.js                         application : stockage local ou synchronisé, écrans, formulaires, démonstration
sw.js, manifest.webmanifest    installation sur l'écran d'accueil et fonctionnement hors ligne
serveur/server.js              serveur HTTP + API (/api/session, /api/lot, /api/changements, /api/fichiers…)
serveur/base.js                base SQLite (module intégré à Node), journal, références, stockage des fichiers
serveur/auth.js                comptes, mots de passe, sessions
serveur/notifications.js       e-mails, WhatsApp, récapitulatif quotidien
serveur/test/                  tests de l'API (npm test)
gas/                           version gratuite Google Apps Script (src/, construire.js, dist/ à coller, test/)
Dockerfile                     image prête à déployer
```

**Synchronisation.** Chaque modification s'affiche tout de suite, entre dans une file d'attente gardée sur
l'appareil, puis part au serveur. Les modifications des collègues arrivent toutes les 30 secondes, et dès que
l'application reprend la main. Les références (EV-2026-014…) sont attribuées par le serveur, donc jamais en double.
Si deux personnes modifient **la même fiche** en même temps, c'est la dernière enregistrée qui l'emporte ; le
journal garde la trace des deux.

## Limites connues et suite possible

- Pas d'envoi par e-mail pour un mot de passe oublié : l'administrateur réinitialise le mot de passe.
- La dernière modification l'emporte sur une même fiche : il n'y a pas de fusion champ par champ.
- Pistes : signature électronique des documents, notifications sur le téléphone (push), tableau de bord par
  site envoyé chaque mois à la direction.
