/**
 * Questo script lo lascio online solo perché come soluzione mi sembra
 * elegante.  Si crea uno #stack che contiene un numero variabile di
 * .cartoncino.  Lo script li compatta e in base alla posizione di scroll
 * viene evidenziato quello desiderato.  Ci sono problemi di layout che con
 * ogni probabilità sono risolvibili tramite i CSS.
 */

document.addEventListener('DOMContentLoaded', function() {
    const cartoncini = document.querySelectorAll('.cartoncino');
    let zIndex = 0;

    // Le dimensioni vengono prese direttamente dal CSS.  Si basa sull'altezza
    // del cartoncino per poi calcolarne le dimensioni basate sullo standard
    // ISO della carta.
    let cardHeight = getComputedStyle(document.body).getPropertyValue('--card-width');
    cardHeight = cardHeight.substring(0, cardHeight.length - 3) / Math.SQRT2;
    let cardMargin = getComputedStyle(document.body).getPropertyValue('--card-margin-y');
    cardMargin = cardMargin.substring(0, cardMargin.length - 3) * 1;

    // `overlap` indica quanto sovrapporre due cartoncini.  C'è sicuramente
    // un modo più elegante e preciso per farlo.
    const overlap = cardHeight * .88 - cardMargin;

    const maxVariability = 14;  // spostamento massimo in orizzontale
    let randX, randDir;  // quale spostamento, in quale direzione
    cartoncini.forEach(cartoncino => {

        // Qui si interviene per il click.  Nel caso non si usasse un elemento
        // `<a>`, si possono fare alcune modifiche e spostare l'indirizzo da 
        // aprire in un data-link recuperabile `con this.dataset.link`.
        cartoncino.addEventListener('click', function(event) {
            event.preventDefault();  // necessario solo in caso di `<a>`
            if (cartoncino.classList.contains('prima-fila')) {
                window.location.href = cartoncino.href;
            } else {
                window.scrollTo(cartoncino.getBoundingClientRect().top, 0)
            }
        });
        cartoncino.dataset.ordine = -zIndex;  // necessario al recupero più avanti
        randX = Math.floor(Math.random() * maxVariability);
        randDir = Math.floor(Math.random() * 3 - 1);  // tre opzioni: sx, 0, dx
        cartoncino.style.translate = `${randX * randDir}px ${zIndex * overlap}rem`;
        cartoncino.style.zIndex = zIndex--;
    });

    // Modificare il posizionamento con `translate` non modifica le dimensioni
    // del genitore, e dobbiamo perciò modificarlo manualmente.
    const stack = document.querySelector('#stack');
    stack.style.height = cartoncini[cartoncini.length - 1].getBoundingClientRect().bottom + 'px';
    zIndex *= -1;  // d'ora in avanti dovremo solo incrementare e possiamo
                   // riutilizzare senza problemi la medesima variabile.

    function riflettoriPrego() {
        // `step` non è calcolata correttamente.  Di sicuro si può migliorare
        // senza dover dividere empiricamente per 1.8.
        const step = stack.getBoundingClientRect().height / cartoncini.length / 1.8;
        let index = Math.floor(window.scrollY / step);
        const onDisplay = document.querySelector(`.cartoncino[data-ordine="${index}"]`);
        if (onDisplay) {
            onDisplay.style.zIndex = zIndex++;
            cartoncini.forEach(cartoncino => {
                cartoncino.classList.remove('prima-fila');
            })
            onDisplay.classList.add('prima-fila');
        }
    }

    window.addEventListener('scroll', riflettoriPrego);

    riflettoriPrego();
});
