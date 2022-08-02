// Importo il contenuto dell'I Ching.
import { indice, IChing } from '../../i-ching/i-ching.js';

// Si parte dalla linea 1 e il responso è vuoto.
var lineIndex = 1;
var response = '';

// Controllo se è presente un vecchio responso nei parametri dell'URL...
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const responseParams = urlParams.get('response');

// ...e se è presente, lo ricreo nel diagramma.
if (responseParams != null) {
    responseParams.split('').forEach(value => {
        changeLine(value);
    })
}

// Imposto i pulsanti per selezionare le singole linee.
const lineSelector = document.querySelectorAll('button');
lineSelector.forEach(element => {
    element.addEventListener('click', event => {
        let result = element.id.substring(6);
        changeLine(result);
    });
});

// Imposto eventi per la selezione delle singole linee a partire dai tasti.
document.addEventListener('keyup', key => {
    let values = ['6', '7', '8', '9'];
    
    if (values.includes(key.key)) {
        changeLine(key.key);
    } else if (key.key == 'Backspace' || key.key == 'Delete') {
        changeLine('cancella');
    }
});

// Modifica il valore di una linea
function changeLine(lineValue) {
    if (isNaN(lineValue) && lineIndex > 1) {
        lineIndex -= 1;
    }

    let currentLine = '#linea-' + lineIndex + ' svg';
    
    if (!isNaN(lineValue) && lineIndex <= 6) {
        setAs(document.querySelector(currentLine), lineValue);
        response = response + lineValue;
        
        if (lineIndex == 6) {
            pullHex(response);
        }
        
        lineIndex += 1;
    } else if (isNaN(lineValue)) {
        setAs(document.querySelector(currentLine), lineValue);
        response = response.substring(0, lineIndex - 1);
    }

    const stateObj = { response: response};
    history.replaceState(stateObj, '', '?response=' + response);
}

// Recupera gli esagrammi risultanti
function pullHex(response) {
    document.querySelector('#hex-text').style.display = 'block';
    document.querySelectorAll('.relative-hex').forEach(element => {
        element.textContent = '';
    });

    let primaryHex = {
        number: 0,
        pattern: response.replaceAll(/[68]/g, '0').replaceAll(/[79]/g, '1'),
        content: {}
    }

    primaryHex.number = indice.indexOf(primaryHex.pattern) + 1;
    primaryHex.content = IChing[primaryHex.number];
    
    let relativeHex = {
        number: 0,
        pattern: '',
        content: {}
    };

    if (response.search(/[69]/g) >= 0) {
        relativeHex.pattern = response.replaceAll(/[89]/g, '0').replaceAll(/[67]/g, '1');
        relativeHex.number = indice.indexOf(relativeHex.pattern) + 1;
        relativeHex.content = IChing[relativeHex.number];
    }

    let hexHeader = document.querySelector('#hex-text #hex-header');
    hexHeader.querySelector('#primary-hex .number').textContent = primaryHex.number;
    hexHeader.querySelector('#primary-hex .name').textContent = primaryHex.content.name;
    hexHeader.querySelector('#primary-hex .symbol').textContent = primaryHex.content.symbol;

    if (relativeHex.number) {
        hexHeader.querySelector('#relative-hex .number').textContent = relativeHex.number;
        hexHeader.querySelector('#relative-hex .name').textContent = relativeHex.content.name;
        hexHeader.querySelector('#relative-hex .symbol').textContent = relativeHex.content.symbol;

        let arrow = document.createElement('div');
        arrow.classList.add('relative-hex');
        arrow.textContent = '→';
        hexHeader.querySelector('#relative-hex').before(arrow);
    }
}

// Imposta una singola linea
function setAs(element, value) {
    element.querySelectorAll('g').forEach(el => {
        el.classList.remove('mostra-elemento');
        el.classList.remove('nascondi-elemento');
    });
    element.querySelector('.vuota').classList.add('nascondi-elemento');

    switch (value) {
        case '6':
            element.querySelectorAll('.yin').forEach(el => {
                el.classList.remove('nascondi-elemento');
                el.classList.add('mostra-elemento');
            });
            break;
        case '7':
            element.querySelector('.yang.statico').classList.add('mostra-elemento');
            break;
        case '8':
            element.querySelector('.yin.statico').classList.add('mostra-elemento');
            break;
        case '9':
            element.querySelectorAll('.yang').forEach(el => {
                el.classList.add('mostra-elemento');
                el.classList.remove('nascondi-elemento');
            });
            break;
        case 'cancella':
            element.querySelector('.vuota').classList.remove('nascondi-elemento');
            element.querySelector('.vuota').classList.add('mostra-elemento');
            break;
    }
}