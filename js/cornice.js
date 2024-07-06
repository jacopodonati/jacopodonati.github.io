function smarmella() {
    const body = document.querySelector('body');
    
    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;
    const paddingSize = 60;
    const marginSize = 30;

    const canvas = document.createElement('canvas');
    const canvasWidth = windowWidth;
    const canvasHeight = windowHeight;
    canvas.style.width = `${canvasWidth}px`;
    canvas.style.height = `${canvasHeight}px`;
    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    body.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    // pulsantini pazzerelli
    
    let viableWidth = windowWidth - (paddingSize * 2) - (marginSize * 2);
    let viableHeight = windowHeight - (paddingSize * 2) - (marginSize * 2);
    let gapX = paddingSize + marginSize;
    let gapY = paddingSize + marginSize;
    
    const portfolio = document.querySelector('#portfolio');
    let jumpX = Math.floor(Math.random() * (viableWidth / 3 * 2));
    let jumpY = Math.floor(Math.random() * (viableHeight / 3));
    portfolio.style.top = `${gapY + jumpY}px`;   
    portfolio.style.left = `${gapX + jumpX}px`;
    
    const io = document.querySelector('#chi-sono');
    jumpX = Math.floor(Math.random() * (viableWidth / 3 * 2));
    jumpY = Math.floor(Math.random() * (viableHeight / 3));
    const ioWidth = io.offsetWidth;
    const ioHeight = io.offsetHeight;
    io.style.top = `${windowHeight - (gapY + jumpY) - ioHeight}px`;   
    io.style.left = `${windowWidth - (gapX + jumpX) - ioWidth}px`;

    // sfondo

    const img = new Image();
    const pick = sfondi[Math.floor(Math.random() * sfondi.length)];
    img.addEventListener("load", () => {
        let ratio, newWidth, newHeight, newCenterX, newCenterY;
        if (canvas.width > canvas.height) {
            ratio = canvas.width / img.width;
        } else {
            ratio = canvas.height / img.height;
        }
        newWidth = img.width * ratio;
        newHeight = img.height * ratio;
        newCenterX = (newWidth - canvas.width) / 2;
        newCenterY = (newHeight - canvas.height) / 2;
        ctx.drawImage(img, -newCenterX, -newCenterY, newWidth, newHeight);
    });
    img.src = `/img/${pick.filename}`;
    const pulsantini = document.querySelectorAll('.pulsante');
    pulsantini.forEach(pulsante => {
        pulsante.style.backgroundColor = pick.background;
        pulsante.style.color = pick.foreground;
    });
    
    // // angolini
    
    // const symbol = '+';
    // const nwSymbol = document.createElement('div');
    // nwSymbol.classList.add('angolino');
    // nwSymbol.textContent = symbol;
    // body.appendChild(nwSymbol);
    // const symbolWidth = nwSymbol.offsetWidth;
    // const symbolHeight = nwSymbol.offsetHeight;
    // const offSetX = (marginSize - symbolWidth) / 2;
    // const offsetY = (marginSize - symbolHeight) / 2;
    // nwSymbol.style.left = `${offSetX}px`;
    // nwSymbol.style.top = `${offsetY}px`;
    
    // const neSymbol = document.createElement('div');
    // neSymbol.classList.add('angolino');
    // neSymbol.textContent = symbol;
    // neSymbol.style.right = `${offSetX}px`;
    // neSymbol.style.top = `${offsetY}px`;
    // body.appendChild(neSymbol);
    
    // const seSymbol = document.createElement('div');
    // seSymbol.classList.add('angolino');
    // seSymbol.textContent = symbol;
    // seSymbol.style.right = `${offSetX}px`;
    // seSymbol.style.bottom = `${offsetY}px`;
    // body.appendChild(seSymbol);
    
    // const swSymbol = document.createElement('div');
    // swSymbol.classList.add('angolino');
    // swSymbol.textContent = symbol;
    // swSymbol.style.left = `${offSetX}px`;
    // swSymbol.style.bottom = `${offsetY}px`;
    // body.appendChild(swSymbol);
}

document.addEventListener('DOMContentLoaded', smarmella);
// document.addEventListener('resize', smarmella);