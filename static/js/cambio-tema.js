document.addEventListener('DOMContentLoaded', () => {
    const temi = document.querySelectorAll('.selettore-tema')
    temi.forEach(tema => {
        tema.addEventListener('click', (event) => {
            event.preventDefault();
            const temaCss = document.querySelector('#tema-css');
            console.log(tema.dataset.name)
            temaCss.href = `/css/${tema.dataset.name}.css`;
        })
    });
});