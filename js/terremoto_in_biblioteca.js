const mainTag = document.querySelector('main');
const progetti = mainTag.querySelectorAll('div');
const resetButton = document.querySelector('#reset');
const selettori = document.querySelectorAll('select');
var filtro = {
    'tipo': 'all',
    'target': 'all',
    'genere': 'all',
    'ruolo': 'all'
}

function riordinaCasualmente() {
    const progettiArray = Array.from(progetti);

    progettiArray.sort(() => Math.random() - 0.5);

    mainTag.innerHTML = '';
    progettiArray.forEach(progetto => mainTag.appendChild(progetto));
}

function filtra() {
    ultimiFiltrati = document.querySelectorAll('.progetto.secondo-piano');
    ultimiFiltrati.forEach(progetto => {
        progetto.classList.remove('secondo-piano');
    });

    resetButton.disabled = true;
    
    for (const key in filtro) {
        if (filtro[key] != 'all') {
            resetButton.disabled = false;
            const daFiltrare = document.querySelectorAll(`.progetto:not([data-${key}=${filtro[key]}])`);
            daFiltrare.forEach(progetto => {
                progetto.classList.add('secondo-piano');
            });
        }
    }

}

function resetta() {
    selettori.forEach(selettore => {
        selettore.value = 'all';
    });
    for (const key in filtro) {
        filtro[key] = 'all';
    }
    filtra();
}

function impostaFiltro() {
    filtro[this.id] = this.value;

    filtra();
}

selettori.forEach(selettore => {
    selettore.addEventListener('change', impostaFiltro);
});

resetButton.addEventListener('click', resetta);
document.addEventListener('DOMContentLoaded', riordinaCasualmente);
