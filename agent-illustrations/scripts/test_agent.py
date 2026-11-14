"""Tests hors ligne : aucune requête réseau, les réponses Pexels sont simulées.

Lancer : python3 -m unittest discover -s agent-illustrations/scripts -v
"""
import csv
import json
import os
import tempfile
import unittest
from unittest import mock

import agent
import decoupage
import pexels
import requetes

EXEMPLE = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'exemples', 'voix-off-travail-en-hauteur.txt')


def fausse_photo(i, requete):
    """Une photo au format exact de l'API Pexels /v1/search."""
    return {
        'id': i, 'width': 4000, 'height': 6000, 'url': f'https://www.pexels.com/photo/{requete.replace(" ", "-")}-{i}/',
        'photographer': f'Auteur {i}', 'photographer_url': f'https://www.pexels.com/@auteur{i}', 'alt': f'Photo de {requete}',
        'src': {'original': f'https://images.pexels.com/photos/{i}/original.jpeg',
                'large2x': f'https://images.pexels.com/photos/{i}/pexels-photo-{i}.jpeg?auto=compress&h=1300',
                'medium': f'https://images.pexels.com/photos/{i}/medium.jpeg'},
    }


class FauxPexels:
    """Remplace l'appel HTTP : renvoie 3 photos par requête, avec des identifiants qui se recoupent."""

    def __init__(self):
        self.urls = []

    def __call__(self, url, cle):
        self.urls.append(url)
        requete = url.split('query=')[1].split('&')[0].replace('+', ' ')
        base = sum(map(ord, requete)) % 50 * 10
        return {'photos': [fausse_photo(base + k, requete) for k in range(3)]}


class TestDecoupage(unittest.TestCase):
    def test_paragraphes_et_fusion_des_scenes_courtes(self):
        with open(EXEMPLE, encoding='utf-8') as f:
            scenes = decoupage.decouper(f.read())
        self.assertEqual(len(scenes), 5)
        self.assertTrue(scenes[0]['texte'].startswith('Bonjour à tous. Aujourd'))  # « Bonjour » fusionné

    def test_marqueurs_de_scene(self):
        scenes = decoupage.decouper('SCÈNE 1 : Le harnais\nLe technicien vérifie son harnais avant de monter.\n'
                                    'Scène 2\nUn audit interne vérifie les procédures du site.')
        self.assertEqual([s['titre'] for s in scenes], ['Le harnais', None])
        self.assertEqual(len(scenes), 2)

    def test_paragraphe_long_coupe_en_phrases(self):
        phrase = 'Le technicien contrôle son harnais et sa longe avant chaque montée sur la structure. '
        scenes = decoupage.decouper(phrase * 8)
        self.assertGreater(len(scenes), 1)
        self.assertTrue(all(len(s['texte'].split()) <= decoupage.MOTS_MAX_PAR_SCENE for s in scenes))


class TestRequetes(unittest.TestCase):
    def setUp(self):
        self.concepts = requetes.charger_dictionnaire()

    def test_concept_qhse_traduit_en_anglais(self):
        s = requetes.generer({'numero': 1, 'titre': None, 'texte': "Entrer dans un espace confiné sans permis tue."}, self.concepts)
        self.assertEqual(s['concepts'][0], 'espace confiné')
        self.assertEqual(s['langue'], 'en-US')
        self.assertIn('confined', s['requete'])

    def test_accents_et_majuscules(self):
        s = requetes.generer({'numero': 1, 'titre': None, 'texte': 'Les ÉQUIPEMENTS DE PROTECTION INDIVIDUELLE.'}, self.concepts)
        self.assertEqual(s['concepts'][0], 'EPI')

    def test_sans_concept_recherche_en_francais(self):
        s = requetes.generer({'numero': 1, 'titre': None, 'texte': 'Le boulanger prépare des croissants dorés.'}, self.concepts)
        self.assertEqual(s['langue'], 'fr-FR')
        self.assertIn('croissants', s['requete'])


class TestAgent(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.addCleanup(self.tmp.cleanup)
        for nom in ('DOSSIER_RECHERCHES', 'DOSSIER_IMAGES'):
            p = mock.patch.object(agent, nom, os.path.join(self.tmp.name, nom))
            p.start()
            self.addCleanup(p.stop)
        self.faux = FauxPexels()
        self.chercher = lambda *a, **k: pexels.rechercher(*a, cle='cle-de-test', get_json=self.faux, **k)

    def test_cle_absente(self):
        with mock.patch.dict(os.environ, {'PEXELS_API_KEY': ''}):
            with self.assertRaises(pexels.ErreurPexels):
                pexels.cle_api()

    def test_recherche_puis_telechargement(self):
        res = agent.rechercher(EXEMPLE, 'demo', nombre=4, orientation='portrait', chercher=self.chercher)
        self.assertIn('orientation=portrait', self.faux.urls[0])
        self.assertTrue(os.path.exists(os.path.join(agent.DOSSIER_RECHERCHES, 'demo', 'propositions.md')))
        ids = [p['id'] for s in res['scenes'] for p in s['propositions']]
        self.assertEqual(len(ids), len(set(ids)), 'une même image est proposée à deux scènes')
        self.assertTrue(all(len(s['propositions']) == 4 for s in res['scenes']))

        telecharges = []

        def faux_fichier(url, chemin):
            telecharges.append(url)
            with open(chemin, 'wb') as f:
                f.write(b'image')

        lignes = agent.telecharger('demo', ['1:2', '3:1,3'], telecharger_fichier=faux_fichier)
        self.assertEqual(len(lignes), 3)
        dossier = os.path.join(agent.DOSSIER_IMAGES, 'demo')
        self.assertEqual(len([f for f in os.listdir(dossier) if f.endswith('.jpeg')]), 3)

        with open(os.path.join(dossier, 'images.csv'), encoding='utf-8-sig') as f:
            rangs = list(csv.DictReader(f, delimiter=';'))
        self.assertEqual(len(rangs), 3)
        for champ in ('scene', 'description', 'mot_cle', 'url_image', 'auteur', 'source'):
            self.assertTrue(all(r[champ] for r in rangs), champ)
        self.assertEqual(rangs[0]['source'], 'Pexels')

        # Un second téléchargement complète les fichiers d'informations sans doublon.
        agent.telecharger('demo', ['1:2', '2:1'], telecharger_fichier=faux_fichier)
        with open(os.path.join(dossier, 'images.json'), encoding='utf-8') as f:
            self.assertEqual(len(json.load(f)), 4)

    def test_choix_invalide(self):
        with self.assertRaises(SystemExit):
            agent.lire_choix(['2-3'], [])

    def test_videos(self):
        video = {'id': 7, 'width': 1080, 'height': 1920, 'duration': 12, 'url': 'https://www.pexels.com/video/worker-on-scaffold-7/',
                 'image': 'https://images.pexels.com/videos/7/apercu.jpg', 'user': {'name': 'Vidéaste', 'url': 'https://www.pexels.com/@v'},
                 'video_files': [{'quality': 'uhd', 'file_type': 'video/mp4', 'width': 2160, 'height': 3840, 'link': 'https://v/uhd.mp4'},
                                 {'quality': 'hd', 'file_type': 'video/mp4', 'width': 1080, 'height': 1920, 'link': 'https://v/hd.mp4'}]}
        r = pexels.rechercher('scaffold', type_media='video', cle='x', get_json=lambda url, cle: {'videos': [video]})
        self.assertEqual(r[0]['url_fichier'], 'https://v/hd.mp4')
        self.assertEqual(r[0]['description'], 'worker on scaffold')


if __name__ == '__main__':
    unittest.main()
