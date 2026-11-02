#!/usr/bin/env bash
# Génère la brochure UNIVERSNORMES : déclinaisons photo, HTML, puis PDF impression et PDF numérique.
# Prérequis : python3 (+ qrcode, pypdf), ffmpeg, Node.js avec Playwright installé dans ../video.
set -euo pipefail
cd "$(dirname "$0")/.."

# 1. Déclinaisons des photos à partir de assets/photos/source
#    print : 2400 px sur le grand côté (Lanczos + accentuation légère) — web : 1400 px, compression plus forte.
mkdir -p assets/photos/print assets/photos/web
for f in assets/photos/source/*.jpg; do
  n=$(basename "$f")
  if [ ! -f "assets/photos/print/$n" ] || [ "$f" -nt "assets/photos/print/$n" ]; then
    ffmpeg -v error -y -i "$f" -vf "scale='if(gt(iw,ih),2400,-2)':'if(gt(iw,ih),-2,2400)':flags=lanczos,unsharp=5:5:0.45:5:5:0" -q:v 2 "assets/photos/print/$n"
    ffmpeg -v error -y -i "$f" -vf "scale='if(gt(iw,ih),1400,-2)':'if(gt(iw,ih),-2,1400)':flags=lanczos" -q:v 5 "assets/photos/web/$n"
  fi
done

# 2. HTML puis PDF, pour chaque document
mkdir -p build dist
declare -A SUFFIX=([print]=impression [web]=numerique)
for v in print web; do
  # Brochure institutionnelle (16 pages)
  python3 src/build.py --variant "$v" > /dev/null
  node scripts/render.mjs "build/brochure-$v.html" "build/brut-brochure-$v.pdf" "$v" > /dev/null
  python3 scripts/finalize.py "build/brut-brochure-$v.pdf" "dist/universnormes-brochure-${SUFFIX[$v]}.pdf" "$v" institutionnelle
  # Brochure de la formation en management QHSE (12 pages)
  python3 src/formation.py --variant "$v" > /dev/null
  node scripts/render.mjs "build/formation-$v.html" "build/brut-formation-$v.pdf" "$v" > /dev/null
  python3 scripts/finalize.py "build/brut-formation-$v.pdf" "dist/universnormes-formation-management-qhse-${SUFFIX[$v]}.pdf" "$v" formation
done
ls -lh dist
