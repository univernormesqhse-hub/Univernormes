#!/usr/bin/env python3
"""Agent d'illustrations UNIVERSNORMES : script de voix off -> scènes -> recherche Pexels -> images.

Commandes :
  rechercher  SCRIPT   découpe le script en scènes et cherche des propositions pour chacune
  telecharger          télécharge les propositions choisies d'un projet déjà recherché
  lancer      SCRIPT   les deux à la suite (télécharge la 1re proposition de chaque scène)

Exemples :
  python3 agent-illustrations/scripts/agent.py lancer agent-illustrations/exemples/voix-off-travail-en-hauteur.txt
  python3 agent-illustrations/scripts/agent.py telecharger --projet voix-off-travail-en-hauteur --choix 1:2 3:1
"""
import argparse
import csv
import datetime
import json
import os
import re
import sys

import decoupage
import pexels
import requetes

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DOSSIER_RECHERCHES = os.path.join(RACINE, 'recherches')
DOSSIER_IMAGES = os.path.join(RACINE, 'images')

CHAMPS_METADONNEES = [
    'scene', 'description', 'mot_cle', 'url_image', 'auteur', 'source',
    'texte_scene', 'type', 'fichier', 'url_page', 'url_auteur', 'licence', 'id_pexels', 'telecharge_le',
]


def slug(texte):
    texte = requetes.normaliser(texte)
    return re.sub(r'[^a-z0-9]+', '-', texte).strip('-')[:60] or 'projet'


def chemin_resultats(projet):
    return os.path.join(DOSSIER_RECHERCHES, projet, 'resultats.json')


# ---------------------------------------------------------------- recherche

def varier_requetes(scenes):
    """Deux scènes sur le même thème ne reçoivent pas la même requête principale."""
    deja = set()
    for s in scenes:
        toutes = [s['requete']] + s['requetes_secours']
        libre = next((r for r in toutes if r not in deja), toutes[0])
        s['requete'], s['requetes_secours'] = libre, [r for r in toutes if r != libre]
        deja.add(libre)


def rechercher_scene(scene, type_media, nombre, orientation, chercher, vus):
    """Interroge la source pour une scène : requête principale puis requêtes de secours si besoin.

    vus contient les identifiants déjà proposés à une scène précédente, pour ne pas répéter une image.
    """
    propositions = []
    for requete in [scene['requete']] + scene['requetes_secours']:
        if len(propositions) >= nombre:
            break
        for r in chercher(requete, type_media=type_media, nombre=nombre, orientation=orientation, langue=scene['langue']):
            if r['id'] not in vus:
                vus.add(r['id'])
                propositions.append({**r, 'mot_cle': requete})
    for i, p in enumerate(propositions[:nombre]):
        p['numero'] = i + 1
    return propositions[:nombre]


def charger_env(chemin=os.path.join(RACINE, '.env')):
    """Lit agent-illustrations/.env (lignes CLE=valeur) sans écraser une variable déjà définie."""
    if not os.path.exists(chemin):
        return
    with open(chemin, encoding='utf-8') as f:
        for ligne in f:
            ligne = ligne.strip()
            if ligne and not ligne.startswith('#') and '=' in ligne:
                cle, valeur = ligne.split('=', 1)
                cle = cle.strip().removeprefix('export ').strip()
                if not os.environ.get(cle):
                    os.environ[cle] = valeur.strip().strip('"').strip("'")


def rechercher(script, projet, type_media='photo', nombre=5, orientation=None, chercher=None):
    if chercher is None:
        pexels.cle_api()  # vérifie la clé avant de commencer
        chercher = pexels.rechercher
    with open(script, encoding='utf-8') as f:
        texte = f.read()
    concepts = requetes.charger_dictionnaire()
    scenes = [requetes.generer(s, concepts) for s in decoupage.decouper(texte)]
    if not scenes:
        raise SystemExit('Le script est vide : aucune scène à illustrer.')

    varier_requetes(scenes)
    vus = set()
    for s in scenes:
        print(f"Scène {s['numero']:>2} · « {s['requete']} » ({', '.join(s['concepts']) or 'mots du texte'})")
        s['propositions'] = rechercher_scene(s, type_media, nombre, orientation, chercher, vus)
        print(f"          {len(s['propositions'])} proposition(s)")

    resultats = {
        'projet': projet,
        'script': os.path.abspath(script),
        'type': type_media,
        'orientation': orientation,
        'source': pexels.SOURCE,
        'date': datetime.datetime.now().isoformat(timespec='seconds'),
        'scenes': scenes,
    }
    dossier = os.path.join(DOSSIER_RECHERCHES, projet)
    os.makedirs(dossier, exist_ok=True)
    with open(chemin_resultats(projet), 'w', encoding='utf-8') as f:
        json.dump(resultats, f, ensure_ascii=False, indent=2)
    ecrire_propositions_md(resultats, os.path.join(dossier, 'propositions.md'))
    print(f"\nRésultats : {os.path.relpath(chemin_resultats(projet))}")
    print(f"Aperçu lisible : {os.path.relpath(os.path.join(dossier, 'propositions.md'))}")
    return resultats


def ecrire_propositions_md(resultats, chemin):
    lignes = [f"# Propositions d'illustrations · {resultats['projet']}", '',
              f"Source : {resultats['source']} · type : {resultats['type']} · {resultats['date']}", '',
              'Pour choisir : `agent.py telecharger --projet %s --choix SCENE:PROPOSITION ...`' % resultats['projet'], '']
    for s in resultats['scenes']:
        titre = f" · {s['titre']}" if s.get('titre') else ''
        lignes += [f"## Scène {s['numero']}{titre}", '', f"> {s['texte']}", '',
                   f"Requête : `{s['requete']}`" + (f" · concepts : {', '.join(s['concepts'])}" if s['concepts'] else ''), '']
        if not s['propositions']:
            lignes += ['_Aucun résultat : reformulez la scène ou ajoutez un concept au dictionnaire._', '']
        for p in s['propositions']:
            lignes.append(f"{p['numero']}. [![{p['description'] or 'aperçu'}]({p['apercu']})]({p['url_page']}) "
                          f"{p['description'] or '(sans description)'} · {p['largeur']}×{p['hauteur']} · "
                          f"par [{p['auteur']}]({p['url_auteur']}) · mot-clé `{p['mot_cle']}`")
        lignes.append('')
    with open(chemin, 'w', encoding='utf-8') as f:
        f.write('\n'.join(lignes))


# ------------------------------------------------------------- téléchargement

def lire_choix(choix, scenes):
    """« 1:2 3:1 3:4 » -> {1: [2], 3: [1, 4]} ; sans choix, la 1re proposition de chaque scène."""
    if not choix:
        return {s['numero']: [1] for s in scenes if s['propositions']}
    selection = {}
    for c in choix:
        m = re.fullmatch(r'(\d+):(\d+(?:,\d+)*)', c.strip())
        if not m:
            raise SystemExit(f"Choix « {c} » invalide : attendu SCENE:PROPOSITION, par exemple 2:3 ou 2:1,3.")
        selection.setdefault(int(m.group(1)), []).extend(int(n) for n in m.group(2).split(','))
    return selection


def choix_interactif(scenes):
    selection = {}
    for s in scenes:
        if not s['propositions']:
            continue
        print(f"\nScène {s['numero']} : {s['texte'][:110]}…")
        for p in s['propositions']:
            print(f"  {p['numero']}. {p['description'] or '(sans description)'} · {p['auteur']} · {p['url_page']}")
        reponse = input('  Numéros à télécharger (Entrée = 1, 0 = aucun) : ').strip() or '1'
        numeros = [int(n) for n in re.findall(r'\d+', reponse) if int(n) > 0]
        if numeros:
            selection[s['numero']] = numeros
    return selection


def extension(url, type_media):
    ext = os.path.splitext(url.split('?')[0])[1].lower()
    return ext if ext in ('.jpg', '.jpeg', '.png', '.webp', '.mp4', '.mov') else ('.mp4' if type_media == 'video' else '.jpg')


def telecharger(projet, choix=None, interactif=False, telecharger_fichier=None):
    telecharger_fichier = telecharger_fichier or pexels.telecharger_fichier
    if not os.path.exists(chemin_resultats(projet)):
        raise SystemExit(f"Aucune recherche pour « {projet} ». Lancez d'abord : agent.py rechercher SCRIPT --projet {projet}")
    with open(chemin_resultats(projet), encoding='utf-8') as f:
        resultats = json.load(f)
    scenes = {s['numero']: s for s in resultats['scenes']}
    selection = choix_interactif(resultats['scenes']) if interactif else lire_choix(choix, resultats['scenes'])

    dossier = os.path.join(DOSSIER_IMAGES, projet)
    os.makedirs(dossier, exist_ok=True)
    nouvelles = []
    for num_scene, numeros in sorted(selection.items()):
        scene = scenes.get(num_scene)
        if not scene:
            print(f"Scène {num_scene} inexistante : ignorée.")
            continue
        for n in numeros:
            p = next((p for p in scene['propositions'] if p['numero'] == n), None)
            if not p:
                print(f"Scène {num_scene} : proposition {n} inexistante, ignorée.")
                continue
            nom = f"scene-{num_scene:02d}_{n}_{slug(p['mot_cle'])[:30]}_pexels-{p['id']}{extension(p['url_fichier'], p['type'])}"
            chemin = os.path.join(dossier, nom)
            if not os.path.exists(chemin):
                telecharger_fichier(p['url_fichier'], chemin)
            print(f"ok  {os.path.relpath(chemin)}  ({p['auteur']})")
            nouvelles.append({
                'scene': num_scene,
                'description': p['description'],
                'mot_cle': p['mot_cle'],
                'url_image': p['url_fichier'],
                'auteur': p['auteur'],
                'source': p['source'],
                'texte_scene': scene['texte'],
                'type': p['type'],
                'fichier': nom,
                'url_page': p['url_page'],
                'url_auteur': p['url_auteur'],
                'licence': p['licence'],
                'id_pexels': p['id'],
                'telecharge_le': datetime.datetime.now().isoformat(timespec='seconds'),
            })
    enregistrer_metadonnees(dossier, nouvelles)
    print(f"\n{len(nouvelles)} fichier(s) dans {os.path.relpath(dossier)}")
    print(f"Informations : {os.path.relpath(os.path.join(dossier, 'images.csv'))} et images.json")
    return nouvelles


def enregistrer_metadonnees(dossier, nouvelles):
    """Complète images.json et images.csv du projet (une ligne par fichier, sans doublon)."""
    chemin_json = os.path.join(dossier, 'images.json')
    existantes = []
    if os.path.exists(chemin_json):
        with open(chemin_json, encoding='utf-8') as f:
            existantes = json.load(f)
    par_fichier = {e['fichier']: e for e in existantes}
    for n in nouvelles:
        par_fichier[n['fichier']] = n
    toutes = sorted(par_fichier.values(), key=lambda e: (e['scene'], e['fichier']))
    with open(chemin_json, 'w', encoding='utf-8') as f:
        json.dump(toutes, f, ensure_ascii=False, indent=2)
    # utf-8-sig : le CSV s'ouvre correctement dans Excel (accents compris).
    with open(os.path.join(dossier, 'images.csv'), 'w', encoding='utf-8-sig', newline='') as f:
        w = csv.DictWriter(f, fieldnames=CHAMPS_METADONNEES, delimiter=';')
        w.writeheader()
        w.writerows(toutes)


# ------------------------------------------------------------------- CLI

def main(argv=None):
    ap = argparse.ArgumentParser(description="Agent d'illustrations UNIVERSNORMES (Pexels).")
    sous = ap.add_subparsers(dest='commande', required=True)

    def options_recherche(p):
        p.add_argument('script', help='fichier texte du script ou de la voix off (UTF-8)')
        p.add_argument('--projet', help='nom du projet (par défaut : nom du fichier script)')
        p.add_argument('--type', choices=['photo', 'video'], default='photo', help='photos ou vidéos (défaut : photo)')
        p.add_argument('--propositions', type=int, default=5, help='propositions par scène (défaut : 5)')
        p.add_argument('--orientation', choices=['portrait', 'landscape', 'square'],
                       help='portrait pour les capsules verticales 1080×1920, landscape pour le 16:9')

    options_recherche(sous.add_parser('rechercher', help='découper le script et chercher des propositions'))
    lancer = sous.add_parser('lancer', help='rechercher puis télécharger')
    options_recherche(lancer)
    lancer.add_argument('--interactif', action='store_true', help='choisir les propositions une par une')

    tel = sous.add_parser('telecharger', help='télécharger les propositions choisies')
    tel.add_argument('--projet', required=True)
    tel.add_argument('--choix', nargs='*', help='SCENE:PROPOSITION, ex. 1:2 3:1,4 (défaut : 1re de chaque scène)')
    tel.add_argument('--interactif', action='store_true', help='choisir les propositions une par une')

    a = ap.parse_args(argv)
    charger_env()
    try:
        if a.commande in ('rechercher', 'lancer'):
            projet = slug(a.projet or os.path.splitext(os.path.basename(a.script))[0])
            rechercher(a.script, projet, a.type, a.propositions, a.orientation)
            if a.commande == 'lancer':
                print()
                telecharger(projet, interactif=a.interactif)
        else:
            telecharger(slug(a.projet), a.choix, a.interactif)
    except pexels.ErreurPexels as e:
        print(f'Erreur : {e}', file=sys.stderr)
        return 1
    return 0


if __name__ == '__main__':
    sys.exit(main())
