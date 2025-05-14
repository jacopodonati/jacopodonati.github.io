#!/bin/zsh

if [ $# -ne 2 ]; then
  echo "Uso: $0 <file> <larghezza>"
  exit 1
fi

file=$1
larghezza=$2

# Calcola la larghezza in pixel
larghezza_px=$((larghezza * 100 / 120))

# Crea le versioni 1x, 2x e 3x con filtro Lanczos
magick "$file" -filter Lanczos -resize "${larghezza_px}x" -quality 90 "1x.png"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 2))x" -quality 90 "2x.png"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 3))x" -quality 90 "3x.png"

# Crea il file full.png senza ridimensionare l'immagine originale
magick "$file" -quality 90 "full.png"
