"""Client minimal de l'API officielle Pexels (https://www.pexels.com/api/documentation/).

La clé est lue dans la variable d'environnement PEXELS_API_KEY, jamais dans le code.
Chaque résultat est ramené au même format, photo ou vidéo, avec l'auteur et la source.
"""
import json
import os
import urllib.error
import urllib.parse
import urllib.request

API_PHOTOS = 'https://api.pexels.com/v1/search'
API_VIDEOS = 'https://api.pexels.com/videos/search'
USER_AGENT = 'univernormes-agent-illustrations/1.0'
SOURCE = 'Pexels'
LICENCE = 'Licence Pexels (usage gratuit, attribution appréciée) : https://www.pexels.com/license/'


class ErreurPexels(Exception):
    pass


def cle_api():
    cle = os.environ.get('PEXELS_API_KEY', '').strip()
    if not cle:
        raise ErreurPexels(
            "La variable d'environnement PEXELS_API_KEY est vide. "
            "Créez une clé gratuite sur https://www.pexels.com/api/ puis : export PEXELS_API_KEY=\"votre_cle\"")
    return cle


def _get_json(url, cle):
    req = urllib.request.Request(url, headers={'Authorization': cle, 'User-Agent': USER_AGENT})
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return json.load(r)
    except urllib.error.HTTPError as e:
        if e.code in (401, 403):
            raise ErreurPexels('Clé PEXELS_API_KEY refusée par Pexels (HTTP %d).' % e.code) from e
        if e.code == 429:
            raise ErreurPexels('Quota Pexels atteint (HTTP 429) : réessayez plus tard.') from e
        raise ErreurPexels('Erreur Pexels HTTP %d sur %s' % (e.code, url)) from e
    except urllib.error.URLError as e:
        raise ErreurPexels('Pexels injoignable (%s). Vérifiez la connexion Internet.' % e.reason) from e


def _photo(p):
    return {
        'type': 'photo',
        'id': p['id'],
        'description': p.get('alt') or '',
        'largeur': p.get('width'),
        'hauteur': p.get('height'),
        'apercu': p['src'].get('medium'),
        'url_fichier': p['src'].get('large2x') or p['src'].get('original'),
        'url_original': p['src'].get('original'),
        'url_page': p.get('url'),
        'auteur': p.get('photographer'),
        'url_auteur': p.get('photographer_url'),
        'source': SOURCE,
        'licence': LICENCE,
    }


def _meilleur_fichier_video(fichiers, largeur_max=1920):
    """Fichier MP4 le plus grand sans dépasser largeur_max (le plus petit sinon)."""
    mp4 = [f for f in fichiers if f.get('file_type') == 'video/mp4' and f.get('width')]
    if not mp4:
        return fichiers[0] if fichiers else None
    adaptes = [f for f in mp4 if max(f['width'], f.get('height') or 0) <= largeur_max]
    return max(adaptes, key=lambda f: f['width']) if adaptes else min(mp4, key=lambda f: f['width'])


def _video(v):
    fichier = _meilleur_fichier_video(v.get('video_files', [])) or {}
    user = v.get('user') or {}
    page = v.get('url') or ''
    # Pexels ne fournit pas de description pour les vidéos : on la déduit de l'adresse de la page.
    description = page.rstrip('/').split('/')[-1].rsplit('-', 1)[0].replace('-', ' ') if page else ''
    return {
        'type': 'video',
        'id': v['id'],
        'description': description,
        'largeur': fichier.get('width') or v.get('width'),
        'hauteur': fichier.get('height') or v.get('height'),
        'duree_s': v.get('duration'),
        'apercu': v.get('image'),
        'url_fichier': fichier.get('link'),
        'url_original': fichier.get('link'),
        'url_page': page,
        'auteur': user.get('name'),
        'url_auteur': user.get('url'),
        'source': SOURCE,
        'licence': LICENCE,
    }


def rechercher(requete, type_media='photo', nombre=5, orientation=None, langue='en-US', cle=None, get_json=None):
    """Recherche sur Pexels et renvoie une liste de résultats normalisés.

    get_json permet de remplacer l'appel réseau (tests hors ligne).
    """
    cle = cle or cle_api()
    get_json = get_json or _get_json
    params = {'query': requete, 'per_page': max(1, min(nombre, 80)), 'locale': langue}
    if orientation:
        params['orientation'] = orientation
    base = API_VIDEOS if type_media == 'video' else API_PHOTOS
    donnees = get_json(base + '?' + urllib.parse.urlencode(params), cle)
    if type_media == 'video':
        return [_video(v) for v in donnees.get('videos', [])]
    return [_photo(p) for p in donnees.get('photos', [])]


def telecharger_fichier(url, chemin, ouvrir=None):
    """Télécharge un fichier (image ou vidéo) vers chemin. ouvrir remplace urlopen dans les tests."""
    ouvrir = ouvrir or urllib.request.urlopen
    req = urllib.request.Request(url, headers={'User-Agent': USER_AGENT})
    temporaire = chemin + '.part'
    with ouvrir(req, timeout=120) as r, open(temporaire, 'wb') as f:
        while True:
            bloc = r.read(1 << 16)
            if not bloc:
                break
            f.write(bloc)
    os.replace(temporaire, chemin)
