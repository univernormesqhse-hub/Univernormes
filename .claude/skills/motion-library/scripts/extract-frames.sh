#!/usr/bin/env bash
# Grilles de frames d'une vidéo de référence : extract-frames.sh <video> [fps=4] [dossier=./ref-frames]
set -euo pipefail
IN=${1:?usage: extract-frames.sh <video> [fps] [dossier]}
FPS=${2:-4}
OUT=${3:-./ref-frames}
mkdir -p "$OUT/frames"
ffmpeg -v error -y -i "$IN" -vf "fps=$FPS,scale=270:-2" "$OUT/frames/f-%04d.jpg"
# 4×4 frames par grille, horodatées
ffmpeg -v error -y -framerate 1 -pattern_type glob -i "$OUT/frames/f-*.jpg" \
  -vf "drawtext=text='%{eif\:n*16/$FPS\:d}s':x=6:y=6:fontsize=18:fontcolor=red:box=1:boxcolor=white@0.7,tile=4x4:padding=4:color=white" \
  "$OUT/grid-%02d.jpg" 2>/dev/null || ffmpeg -v error -y -framerate 1 -pattern_type glob -i "$OUT/frames/f-*.jpg" -vf "tile=4x4:padding=4:color=white" "$OUT/grid-%02d.jpg"
N=$(ls "$OUT"/frames | wc -l)
echo "$N frames à $FPS fps → $(ls "$OUT"/grid-*.jpg | wc -l) grilles dans $OUT (1 case = 1/$FPS s, 16 cases par grille)"
