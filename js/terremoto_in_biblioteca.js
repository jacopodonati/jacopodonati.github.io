const mainTag = document.querySelector('main');
const libri = mainTag.querySelectorAll('div');

function riordinaCasualmente() {
    const libriArray = Array.from(libri);

    libriArray.sort(() => Math.random() - 0.5);

    mainTag.innerHTML = '';
    libriArray.forEach(libro => mainTag.appendChild(libro));
}

document.addEventListener('DOMContentLoaded', riordinaCasualmente);
