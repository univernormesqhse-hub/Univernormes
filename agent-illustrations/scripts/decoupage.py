"""Découpage d'un script de voix off en scènes visuelles.

Règles :
- un paragraphe (bloc séparé par une ligne vide) = une scène ;
- un paragraphe trop long est coupé en plusieurs scènes, phrase par phrase ;
- une scène trop courte (« Bonjour à tous. ») est fusionnée avec la suivante ;
- une ligne « SCÈNE … » ou « # … » force le début d'une nouvelle scène et lui donne un titre.
"""
import re

MOTS_MAX_PAR_SCENE = 45
MOTS_MIN_PAR_SCENE = 6

_FIN_DE_PHRASE = re.compile(r'(?<=[.!?…])\s+')
_MARQUEUR = re.compile(r'^\s*(?:#+|sc[eè]ne\b\s*\d*\s*[:.\-–]?)\s*(.*)$', re.IGNORECASE)


def _nb_mots(texte):
    return len(texte.split())


def _blocs(texte):
    """Renvoie des couples (titre, texte) en suivant les lignes vides et les marqueurs de scène."""
    blocs, titre, lignes = [], None, []

    def fermer():
        nonlocal titre, lignes
        contenu = ' '.join(l.strip() for l in lignes if l.strip())
        if contenu:
            blocs.append((titre, contenu))
            titre = None
        lignes = []

    for ligne in texte.splitlines():
        marqueur = _MARQUEUR.match(ligne)
        if marqueur:
            fermer()
            titre = marqueur.group(1).strip() or None
        elif not ligne.strip():
            fermer()
        else:
            lignes.append(ligne)
    fermer()
    return blocs


def _couper(texte):
    """Coupe un paragraphe trop long en morceaux d'au plus MOTS_MAX_PAR_SCENE mots (phrases entières)."""
    if _nb_mots(texte) <= MOTS_MAX_PAR_SCENE:
        return [texte]
    morceaux, courant = [], []
    for phrase in _FIN_DE_PHRASE.split(texte):
        if courant and _nb_mots(' '.join(courant + [phrase])) > MOTS_MAX_PAR_SCENE:
            morceaux.append(' '.join(courant))
            courant = []
        courant.append(phrase)
    if courant:
        morceaux.append(' '.join(courant))
    return morceaux


def decouper(texte):
    """Découpe le script en une liste de scènes : [{'numero', 'titre', 'texte'}]."""
    brutes = []
    for titre, contenu in _blocs(texte):
        for i, morceau in enumerate(_couper(contenu)):
            brutes.append({'titre': titre if i == 0 else None, 'texte': morceau, 'force': titre is not None and i == 0})

    # Fusionne les scènes trop courtes avec la suivante, sauf si la suivante a un titre imposé.
    scenes = []
    report = None
    for s in brutes:
        if report:
            if s['force']:
                scenes.append(report)
            else:
                s = {**s, 'titre': report['titre'] or s['titre'], 'texte': report['texte'] + ' ' + s['texte']}
            report = None
        if _nb_mots(s['texte']) < MOTS_MIN_PAR_SCENE:
            report = s
        else:
            scenes.append(s)
    if report:
        if scenes:
            scenes[-1]['texte'] += ' ' + report['texte']
        else:
            scenes.append(report)

    return [{'numero': i + 1, 'titre': s['titre'], 'texte': s['texte']} for i, s in enumerate(scenes)]
