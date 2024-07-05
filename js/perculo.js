document.addEventListener('DOMContentLoaded', function () {
    const parole = ['inefficienza', 'analogico', 'irriproducibilità', 'decontrollo', 'inconservabilità'];
    const canvas = document.querySelector('#perculo');

    parole.forEach(stringa => {
        const parola = document.createElement('a');
        parola.classList.add('parola');
        parola.textContent = stringa;
        canvas.appendChild(parola)
        let fontSize = 8 + Math.floor(Math.random() * 22);
        parola.style.fontSize = `${fontSize}px`;
        let stringWidth = parola.offsetWidth;
        let stringHeight = parola.offsetHeight;
        let maxWidth = canvas.offsetWidth - stringWidth;
        let maxHeight = canvas.offsetHeight - stringHeight;
        parola.style.top = `${Math.random() * maxHeight}px`;
        parola.style.left = `${Math.random() * maxWidth}px`;

        parola.addEventListener('mousedown', runAway);
    });

    function runAway() {
        const fontSize = this.style.fontSize;
        this.style.fontSize = `${fontSize.substring(0, fontSize.length - 2) * 0.8}px`;

        let direction;
        direction = Math.floor(Math.random() * 4);
        let top = Math.floor(this.style.top.substring(0, this.style.top.length - 2));
        let left = Math.floor(this.style.left.substring(0, this.style.left.length - 2));
        let jump = Math.random() * 4;
        switch (direction) {
            case 0:
                console.log('su', top, this.offsetHeight)
                this.style.top = `${top - this.offsetHeight * jump}px`;
                break;
            case 1:
                this.style.left = `${left + this.offsetWidth * jump}px`;
                break;
            case 2:
                this.style.top = `${top + this.offsetHeight * jump}px`;
                break;
            case 3:
                this.style.left = `${left - this.offsetWidth * jump}px`;
                break;

        }
    }
});