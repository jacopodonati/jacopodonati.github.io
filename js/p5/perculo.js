let perculo, perculoCanvas;
const parole = ['inefficienza', 'analogico', 'irriproducibilità', 'decontrollo', 'inconservabilità'];

function setup() {
    let perculo = document.querySelector('#perculo');
    perculoCanvas = createCanvas(Utils.elementWidth(perculo), Utils.elementHeight(perculo));
    perculoCanvas.parent(perculo);

    let indice = parole.length;
    while (indice != 0) {
        let indiceAleatorio = Math.floor(Math.random() * indice);
        indice--;
        [parole[indice], parole[indiceAleatorio]] = [
            parole[indiceAleatorio], parole[indice]];
    }
    perculoCanvas.touchEnded(beginAfreshAfreshAfresh);
    perculoCanvas.mouseClicked(beginAfreshAfreshAfresh);
}

function draw() {
    textAlign(CENTER);
    textFont('Times');
    let fontSize, stringWidth;
    let maxWidth, maxHeight, padWidth, padHeight;
    parole.forEach(parola => {
        fontSize = random(8, 28);
        stringWidth = this.textWidth(parola);
        maxWidth = (width * 0.9) - stringWidth;
        padWidth = (width - maxWidth) / 2;
        padHeight = (height - maxHeight) / 2;
        maxHeight = (height * 0.9) - fontSize;
        textSize(fontSize);
        text(parola, padWidth + random(maxWidth), padHeight + random(maxHeight));
        // text(parola, randomGaussian(width / 2, 80), randomGaussian(height / 2, 80));
    });
    noLoop();
}

function beginAfreshAfreshAfresh() {
    clear()
    redraw();
}
