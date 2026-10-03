#!/usr/bin/env python3
"""Recherche et télécharge des images sous licence libre (Openverse : CC0, CC BY, CC BY-SA).

Usage :
    python3 tools/fetch_images.py "confined space tank" --n 6 --out public/banque/espace-confine

Pour chaque image, un fichier .json voisin conserve la source, l'auteur et la licence,
à reprendre dans les crédits de la vidéo. Nécessite un accès réseau à api.openverse.org
(bloqué dans l'environnement cloud actuel : à lancer depuis un poste local).
"""
import argparse
import json
import os
import urllib.parse
import urllib.request

API = 'https://api.openverse.org/v1/images/'


def search(query: str, n: int):
    params = urllib.parse.urlencode({
        'q': query,
        'license': 'cc0,by,by-sa',
        'license_type': 'commercial,modification',
        'page_size': n,
        'aspect_ratio': 'tall,square,wide',
        'size': 'large',
    })
    req = urllib.request.Request(f'{API}?{params}', headers={'User-Agent': 'univernormes-video/1.0'})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.load(r)['results']


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('query')
    ap.add_argument('--n', type=int, default=6)
    ap.add_argument('--out', required=True)
    a = ap.parse_args()
    os.makedirs(a.out, exist_ok=True)
    for i, it in enumerate(search(a.query, a.n)):
        ext = os.path.splitext(urllib.parse.urlparse(it['url']).path)[1] or '.jpg'
        base = os.path.join(a.out, f'{i + 1:02d}')
        try:
            req = urllib.request.Request(it['url'], headers={'User-Agent': 'univernormes-video/1.0'})
            with urllib.request.urlopen(req, timeout=60) as r, open(base + ext, 'wb') as f:
                f.write(r.read())
        except Exception as e:  # image indisponible : on passe à la suivante
            print('échec', it['url'], e)
            continue
        meta = {k: it.get(k) for k in ('title', 'creator', 'license', 'license_version', 'license_url', 'foreign_landing_url', 'attribution')}
        with open(base + '.json', 'w', encoding='utf-8') as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
        print('ok', base + ext, '—', meta['license'], meta['creator'])


if __name__ == '__main__':
    main()
