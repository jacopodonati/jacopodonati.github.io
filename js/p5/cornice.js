let canvas;
let img, imgCrisp;
let normalFont, symbolFont;
let arsLink, egoLink;
const normalSize = 16;
const symbolSize = 18;
const textToRepeat = "Alt-Wien war einmal neu".toUpperCase();
const borderWidth = 60;
const marginSize = borderWidth / 4.6;
const separator = "+"; //"€"; //"¤";//"᳀";
const spaceBetweenText = 0;

window.onresize = function() {
    arsLink.remove();
    egoLink.remove();
    canvas = createCanvas(windowWidth, windowHeight);
    redraw();
}

function preload() {
    normalFont = loadFont('/font/VCR_OSD_MONO_1.001.ttf');
    symbolFont = normalFont;
    img = loadImage("/img/img009.webp");
    imgCrisp = loadImage("/img/img009.jpg");
}

function setup() {
    canvas = createCanvas(windowWidth, windowHeight);
    textSize(normalSize);
    textAlign(CENTER, CENTER);
}

function draw() {
    background(0);
    image(img, borderWidth / 2, borderWidth / 2, width - borderWidth, height - borderWidth, 0, 0, img.width, img.height, COVER);

    noFill();
    stroke(0);
    strokeWeight(borderWidth);
    rect(0, 0, width, height);

    fill(255);
    noStroke();

    drawCornerSymbols();

    drawBorderText(0, 0, width, 0);
    drawBorderText(width, height, width, PI);
    drawBorderText(0, height, height, -HALF_PI);
    drawBorderText(width, 0, height, HALF_PI);

    let x = randomGaussian(windowWidth / 3, 50);
    let y = randomGaussian(windowHeight / 4, 50);
    arsLink = createA('/portfolio.html', 'portfolio');
    arsLink.position(x, y);
    arsLink.addClass('sezione');
    
    x = randomGaussian(windowWidth / 2, 30);
    y = randomGaussian(windowHeight / 3, 50);
    egoLink = createA('/io.html', 'chi sono');
    egoLink.position(windowWidth - x, windowHeight - y);
    egoLink.addClass('sezione');

    noLoop();
}

function getFullTextWidth() {
    textFont(normalFont);
    let textWidth = this.textWidth(textToRepeat);
    textFont(symbolFont);
    let symbolWidth = this.textWidth(separator);
    return textWidth + symbolWidth;
}

function drawBorderText(startX, startY, borderLength, rotation) {
    textFont(normalFont);
    const textWidth = this.textWidth(textToRepeat);
    textFont(symbolFont);
    const symbolWidth = this.textWidth(separator);
    const fullTextWidth = textWidth + symbolWidth + (spaceBetweenText * 2);

    push();
    translate(startX, startY);
    rotate(rotation);
    textAlign(LEFT);
    
    const startOffset = borderWidth;
    const realBorderLength = borderLength - (startOffset * 2);
    let repetitions = floor(realBorderLength / fullTextWidth);
    const spaceLength = (realBorderLength - (textWidth * repetitions) - (symbolWidth * (repetitions - 1))) / (repetitions * 2);
    
    for (let i = 0; i < repetitions; i++) {
        let xPos = startOffset + spaceLength + (i * textWidth) + (i * symbolWidth) + (i * spaceBetweenText * 2) + (i * spaceLength * 2);
        
        textFont(normalFont);
        textSize(normalSize);
        text(textToRepeat, xPos, marginSize);

        if (i < (repetitions - 1)) {
            textFont(symbolFont);
            textSize(symbolSize);
            text(separator, xPos + this.textWidth(textToRepeat) + spaceBetweenText + spaceLength, marginSize);
        }
    }
    pop();
}

function drawCornerSymbols() {
    fill(255);
    noSmooth();
    noStroke();
    textFont(symbolFont);
    textSize(symbolSize);
    text(separator, marginSize, marginSize);
    text(separator, width - marginSize, marginSize);
    text(separator, marginSize, height - marginSize);
    text(separator, width - marginSize, height - marginSize);
}
