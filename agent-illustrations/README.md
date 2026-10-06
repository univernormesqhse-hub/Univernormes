# Agent illustrations

Agent de recherche d'illustrations pour les vidéos de motion design QHSE UNIVERSNORMES.

À partir d'un script ou d'un texte de voix off, l'agent :

1. lit le script ;
2. le découpe en scènes visuelles ;
3. génère pour chaque scène une requête de recherche (concepts QHSE traduits en anglais) ;
4. interroge l'API officielle [Pexels](https://www.pexels.com/api/) ;
5. propose plusieurs images (ou vidéos) par scène ;
6. enregistre les propositions dans `recherches/<projet>/` ;
7. télécharge les propositions choisies dans `images/<projet>/` ;
8. conserve pour chaque fichier : scène, description, mot-clé, URL, auteur, source (et licence).

Le dossier `video/` du dépôt n'est pas modifié.

## Dossiers

| Dossier | Contenu |
| --- | --- |
| `scripts/` | Code de l'agent |
| `recherches/<projet>/` | `resultats.json` (toutes les propositions) et `propositions.md` (aperçu lisible avec vignettes) |
| `images/<projet>/` | Fichiers téléchargés, `images.csv` (s'ouvre dans Excel) et `images.json` |
| `exemples/` | Script de voix off d'exemple |

## Fichiers de `scripts/`

| Fichier | Rôle |
| --- | --- |
| `agent.py` | Point d'entrée : commandes `rechercher`, `telecharger` et `lancer` |
| `decoupage.py` | Découpe le script en scènes (paragraphes, phrases, marqueurs `SCÈNE`) |
| `requetes.py` | Transforme chaque scène en requête de recherche |
| `dictionnaire_qhse.json` | Concepts QHSE français et leurs requêtes anglaises (modifiable) |
| `pexels.py` | Client de l'API Pexels et téléchargement des fichiers |
| `test_agent.py` | Tests hors ligne avec des réponses Pexels simulées |

## Installation

Il faut seulement **Python 3.9 ou plus récent**. L'agent n'utilise que la bibliothèque standard : il n'y a
aucune dépendance à installer (`pip install` n'est pas nécessaire).

```bash
python3 --version
```

Sous Windows, remplacez `python3` par `py` dans toutes les commandes.

## Clé API Pexels

1. Créez un compte gratuit sur <https://www.pexels.com/api/> et copiez votre clé.
2. Donnez-la à l'agent avec la variable d'environnement `PEXELS_API_KEY`, au choix :

   **Dans le terminal (pour la session en cours)**

   ```bash
   # macOS / Linux
   export PEXELS_API_KEY="votre_cle"
   ```

   ```powershell
   # Windows PowerShell
   $env:PEXELS_API_KEY = "votre_cle"
   ```

   **Ou dans un fichier `.env`** (lu automatiquement, ignoré par Git)

   ```bash
   cp agent-illustrations/.env.example agent-illustrations/.env
   # puis éditez agent-illustrations/.env : PEXELS_API_KEY=votre_cle
   ```

La clé n'est jamais écrite dans le code ni dans les fichiers de résultats.

## Utilisation

Toutes les commandes se lancent depuis la racine du dépôt.

**Tout en une fois** (recherche, puis téléchargement de la 1re proposition de chaque scène) :

```bash
python3 agent-illustrations/scripts/agent.py lancer agent-illustrations/exemples/voix-off-travail-en-hauteur.txt --orientation portrait
```

**En deux temps** (recommandé : on regarde les propositions avant de télécharger) :

```bash
# 1. Rechercher 5 propositions par scène
python3 agent-illustrations/scripts/agent.py rechercher mon-script.txt --projet travail-hauteur --orientation portrait

# 2. Ouvrir agent-illustrations/recherches/travail-hauteur/propositions.md, puis télécharger les choix
#    (scène 1 → proposition 2, scène 3 → propositions 1 et 4)
python3 agent-illustrations/scripts/agent.py telecharger --projet travail-hauteur --choix 1:2 3:1,4

#    ou choisir scène par scène dans le terminal
python3 agent-illustrations/scripts/agent.py telecharger --projet travail-hauteur --interactif
```

Options utiles :

| Option | Effet |
| --- | --- |
| `--orientation portrait` | Images verticales pour les capsules 1080×1920 (`landscape` pour le 16:9, `square`) |
| `--type video` | Cherche des vidéos Pexels (MP4 jusqu'à 1920 px) au lieu de photos |
| `--propositions 8` | Nombre de propositions par scène (5 par défaut) |
| `--projet nom` | Nom du dossier de résultats (par défaut : nom du fichier script) |

## Préparer le script

- Un paragraphe (séparé par une ligne vide) devient une scène ; un paragraphe trop long est coupé en
  plusieurs scènes, et une phrase très courte (« Bonjour à tous. ») rejoint la scène suivante.
- Pour imposer le découpage, commencez une ligne par `SCÈNE 2 : titre` ou `# titre`.
- Si une scène ne donne pas de bonnes images, ajoutez ou complétez un concept dans
  `scripts/dictionnaire_qhse.json` : `fr` liste les expressions à reconnaître (sans accents),
  `en` les requêtes à envoyer à Pexels, la première étant la principale.

## Exemple

Avec `exemples/voix-off-travail-en-hauteur.txt`, l'agent produit 5 scènes :

| Scène | Début du texte | Requête Pexels |
| --- | --- | --- |
| 1 | « Bonjour à tous. Aujourd'hui, on va décortiquer… le travail en hauteur » | `worker safety harness at height` |
| 2 | « Avant de monter, le technicien vérifie son harnais… » | `fall protection` |
| 3 | « Sur le chantier, la protection collective passe en premier… » | `guardrail construction site` |
| 4 | « Chaque intervention commence par une analyse des risques… » | `risk assessment` |
| 5 | « Enfin, si quelque chose vous semble dangereux… » | `worker stop hand gesture` |

Deux scènes sur le même thème reçoivent des requêtes différentes, et une même image n'est jamais
proposée à deux scènes.

## Licence des images

Les images et vidéos Pexels sont utilisables gratuitement, y compris commercialement, sans attribution
obligatoire ([licence Pexels](https://www.pexels.com/license/)). Créditer l'auteur reste apprécié : les
noms et liens sont dans `images/<projet>/images.csv`. Vérifiez toujours qu'une image ne montre pas de
marque, de logo ou de personne identifiable dans un contexte gênant, et que les EPI visibles sont adaptés.

## Tests

```bash
python3 -m unittest discover -s agent-illustrations/scripts -v
```

Les tests n'appellent pas Internet : les réponses de Pexels sont simulées.
