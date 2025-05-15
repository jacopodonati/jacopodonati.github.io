#!/bin/zsh

if [ $# -ne 2 ]; then
  echo "Uso: $0 <file> <larghezza>"
  exit 1
fi

file=$1
larghezza=$2

larghezza_px=$((larghezza * 100 / 120))
cartella="${file%.*}"
mkdir -p "$cartella"

# Crea le versioni 1x, 2x e 3x con filtro Lanczos per PNG
magick "$file" -filter Lanczos -resize "${larghezza_px}x" -quality 90 "$cartella/1x.png"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 2))x" -quality 90 "$cartella/2x.png"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 3))x" -quality 90 "$cartella/3x.png"

# Crea le versioni 1x, 2x e 3x con filtro Lanczos per WebP
magick "$file" -filter Lanczos -resize "${larghezza_px}x" -quality 90 "$cartella/1x.webp"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 2))x" -quality 90 "$cartella/2x.webp"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 3))x" -quality 90 "$cartella/3x.webp"

# Crea le versioni 1x, 2x e 3x con filtro Lanczos per AVIF
magick "$file" -filter Lanczos -resize "${larghezza_px}x" -quality 90 -define avif:effort=6 "$cartella/1x.avif"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 2))x" -quality 90 -define avif:effort=6 "$cartella/2x.avif"
magick "$file" -filter Lanczos -resize "$((larghezza_px * 3))x" -quality 90 -define avif:effort=6 "$cartella/3x.avif"

# Crea il file full.png, full.webp e full.avif senza ridimensionare l'immagine originale
magick "$file" -quality 90 "$cartella/full.png"
magick "$file" -quality 90 "$cartella/full.webp"
magick "$file" -quality 90 -define avif:effort=6 "$cartella/full.avif"
