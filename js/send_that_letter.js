function libriSottoLeGambeDelTavolo() {
    let tavolo = document.querySelector('#tavolo');
    tavolo.style.height = window.innerHeight + 'px';
}

document.addEventListener('DOMContentLoaded', libriSottoLeGambeDelTavolo);
window.addEventListener('resize', libriSottoLeGambeDelTavolo);