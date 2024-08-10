#!/bin/zsh

# $1: nome del file da convertire
# $2: radice del file convertito

resolutions=(1 2 3)
sizes=(200 300 400 500 600 700 768)

if [ ! -d $2 ]; then
    mkdir ./$2
fi

for resolution in $resolutions; do
    for size in $sizes; do
        scale=$(bc -e "$resolution * 100")
        magick $1 -resize ${size}x${size} -colorspace gray -ordered-dither o8x8 -scale ${scale}% ./$2/${2}@${resolution}x${size}w.png
    done
done

magick $1 -resize ${size[-1]}x${size[-1]} -colorspace gray -ordered-dither o8x8 ./$2/${2}.png