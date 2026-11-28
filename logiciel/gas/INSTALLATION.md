# Version gratuite : Google Apps Script

Le logiciel tourne gratuitement sur un compte Gmail, sans carte bancaire ni serveur à louer :

- **données** : un classeur Google Sheets créé automatiquement ;
- **photos et pièces jointes** : un dossier Google Drive, chaque fichier partagé uniquement par lien ;
- **alertes e-mail** : envoyées par Gmail (100 destinataires par jour) ;
- **WhatsApp** : boutons 📲 qui ouvrent WhatsApp avec le message déjà rédigé (gratuit, un appui sur Envoyer suffit).

Le guide illustré, avec un bouton « Copier » pour chaque fichier, est la page publiée par Claude. Le résumé suit.

## Fichiers à coller

Les fichiers sont dans `gas/dist/`, générés par `node gas/construire.js` :

| Fichier dans Apps Script | Contenu |
|---|---|
| `Code.gs` | `gas/dist/Code.gs` (règles métier + serveur) |
| `appsscript.json` | `gas/dist/appsscript.json` (fuseau Abidjan, moteur V8) |
| `Index` (fichier HTML) | `gas/dist/Index.html` (toute l'application en un fichier) |

## Étapes

1. Ouvrir script.google.com avec le compte Gmail de l'entreprise, cliquer sur **Nouveau projet** et le nommer
   « UNIVERSNORMES QHSE ».
2. Dans **Paramètres du projet**, cocher « Afficher le fichier manifeste appsscript.json ».
3. Coller `Code.gs` et `appsscript.json`, puis créer le fichier HTML `Index` et coller `Index.html`. Enregistrer.
4. Sélectionner la fonction `installer` et cliquer sur **Exécuter**, puis autoriser : « Paramètres avancés » →
   « Accéder à… ». L'avertissement est normal pour un script personnel.
5. **Déployer → Nouveau déploiement → Application Web**, avec « Exécuter en tant que : Moi » et « Qui a accès :
   Tout le monde ». Copier l'URL qui finit par `/exec`.
6. Ouvrir cette URL, puis créer le compte administrateur sur l'écran Installation.

Mise à jour : recoller les fichiers, puis **Déployer → Gérer les déploiements → crayon → Nouvelle version**.
L'adresse ne change pas.

## Différences avec le serveur Node

| | Apps Script (gratuit) | Serveur Node (`serveur/`) |
|---|---|---|
| Coût | 0 | Hébergement à payer |
| Session | Jeton gardé sur l'appareil | Cookie HttpOnly |
| Mots de passe | PBKDF2-HMAC-SHA256 (600 itérations) | scrypt |
| WhatsApp | Liens wa.me (envoi manuel en un appui) | Liens wa.me + API WhatsApp Cloud automatique |
| Ouverture sans réseau | Non : il faut du réseau pour ouvrir la page | Oui : application installable, fonctionne hors ligne |
| Saisie sans réseau, page ouverte | Oui (file d'attente) | Oui |
| Vitesse d'un enregistrement | 1 à 2 s, en arrière-plan | Immédiat |

L'application (`app.js`) est la même. Elle détecte `window.QHSE_GAS`, injecté par `doGet`, et passe alors par
`google.script.run`, ou par `fetch` si elle est servie ailleurs.

## Sécurité propre à Apps Script

- Toute fonction globale de `Code.gs` peut être appelée depuis la page. Les fonctions internes finissent donc
  par `_`, et un test vérifie que seules `doGet`, `doPost`, `api`, `installer` et `recapQuotidien` sont
  publiques.
- Les textes commençant par `=`, `+`, `-` ou `@` sont écrits avec une apostrophe : Sheets ne les prend jamais
  pour des formules.
- Les identifiants sont stockés au format texte, pour que Sheets ne les transforme pas en dates ou en nombres.

## Tests

```bash
node --test gas/test/gas.test.js     # exécute le vrai Code.gs dans un simulateur des services Google
```

Le simulateur (`gas/test/simulateur.js`) reproduit Sheets (limite de 50 000 caractères par cellule, formules),
Drive, Gmail (quota), les propriétés, le cache, les verrous et les déclencheurs. Il ne remplace pas un essai sur
un vrai compte Google : faites l'étape 6 avec les données de démonstration avant de saisir les vraies.
