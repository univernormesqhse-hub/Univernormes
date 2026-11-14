"""Génération des requêtes de recherche d'images pour chaque scène.

1. On cherche dans le texte de la scène les expressions du dictionnaire QHSE (dictionnaire_qhse.json).
2. Le concept le plus présent donne la requête principale, en anglais (meilleurs résultats sur Pexels).
3. Sans concept reconnu, on garde les mots les plus significatifs de la scène et on cherche en français.
"""
import json
import os
import re
import unicodedata

DICTIONNAIRE = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dictionnaire_qhse.json')

MOTS_VIDES = set("""
a ai aie ainsi alors au aucun aussi autre aux avec avoir bien c ca car ce ceci cela celle celles celui ces cet cette
chaque chez comme comment d dans de des deux doit donc dont du elle elles en encore entre est et etre eu fait faire
faut il ils j je jamais juste l la le les leur leurs lui m ma mais me meme mes moi mon n ne ni non nos notre nous on
ou par parce pas peu peut plus pour pourquoi qu quand que quel quelle quelles quels qui sa sans se ses si son sont
sous sur ta te tes toi ton tous tout toute toutes tres tu un une vos votre vous y voici voila aujourd hui bonjour
ici la-bas cest cest-a-dire ont avez avons etait sera seront tant toujours souvent rien quelque chose fois
premier premiere ensuite enfin puis donc alors vraiment absolument essentiel simple simplement bref
""".split())


def normaliser(texte):
    """Minuscules, sans accents, apostrophes droites : « Équipement » -> « equipement »."""
    texte = texte.replace('’', "'").replace('‘', "'").lower()
    texte = unicodedata.normalize('NFD', texte)
    return ''.join(c for c in texte if unicodedata.category(c) != 'Mn')


def charger_dictionnaire(chemin=DICTIONNAIRE):
    with open(chemin, encoding='utf-8') as f:
        return json.load(f)['concepts']


def concepts_trouves(texte, concepts):
    """Concepts présents dans le texte, du plus pertinent au moins pertinent."""
    norm = normaliser(texte)
    resultats = []
    for c in concepts:
        score, premier, trouves = 0, len(norm), []
        for expr in c['fr']:
            occurrences = [m.start() for m in re.finditer(r'(?<![\w-])' + re.escape(normaliser(expr)) + r'(?![\w-])', norm)]
            if occurrences:
                # Une expression longue (« travail en hauteur ») pèse plus qu'un mot isolé (« norme »).
                score += len(occurrences) * len(expr.split())
                premier = min(premier, occurrences[0])
                trouves.append(expr)
        if score:
            resultats.append((score, -premier, c, trouves))
    resultats.sort(key=lambda r: (r[0], r[1]), reverse=True)
    return [{'concept': r[2], 'expressions': r[3]} for r in resultats]


def mots_cles(texte, n=4):
    """Mots les plus significatifs de la scène (hors mots vides), dans l'ordre d'apparition."""
    mots = re.findall(r"[a-z0-9]+(?:-[a-z0-9]+)*", normaliser(texte))
    vus = []
    for m in mots:
        if len(m) > 3 and m not in MOTS_VIDES and m not in vus:
            vus.append(m)
    vus.sort(key=len, reverse=True)
    gardes = set(vus[:n])
    return [m for m in dict.fromkeys(mots) if m in gardes]


def generer(scene, concepts):
    """Ajoute à la scène : requête principale, requêtes de secours, langue et concepts reconnus."""
    trouves = concepts_trouves(scene['texte'], concepts)
    if trouves:
        principal = trouves[0]['concept']
        requetes = list(principal['en'])
        for autre in trouves[1:3]:
            requetes.append(autre['concept']['en'][0])
        return {
            **scene,
            'concepts': [t['concept']['nom'] for t in trouves],
            'requete': requetes[0],
            'requetes_secours': requetes[1:],
            'langue': 'en-US',
        }
    mots = mots_cles(scene['texte'])
    return {
        **scene,
        'concepts': [],
        'requete': ' '.join(mots) or scene['texte'][:60],
        'requetes_secours': mots[:2],
        'langue': 'fr-FR',
    }
