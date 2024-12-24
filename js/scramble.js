document.addEventListener('DOMContentLoaded', () => {
    const unpaddedStrings = [];
    const listItems = document.querySelectorAll('#what li');
    listItems.forEach(listItem => {
        unpaddedStrings.push(listItem.textContent);
        listItem.classList.add('nascosto');
    });

    // const paddedStrings = stringPadder(unpaddedStrings);

    scramble(unpaddedStrings);
})

String.prototype.replaceAt = function(index, replacement) {
    return this.substring(0, index) + replacement + this.substring(index + replacement.length);
}

async function scramble(strings) {
    const substitutions = 50;
    const screen = document.querySelector('#screen');
    screen.textContent = strings[0];
    await new Promise(r => setTimeout(r, 2000));
    let index = 1;
    while (true) {
        let oldString = screen.textContent;
        let newString = strings[index];
        console.log(newString, newString.length)
        console.log(oldString, oldString.length)
        let limit = newString.length > oldString.length ? newString.length : oldString.length;
        for (let charIndex = 0; charIndex < limit; charIndex++) {
            for (let subIndex = 0; subIndex < substitutions; subIndex++) {
                let char = String.fromCharCode(Math.floor(Math.random() * (126 - 33 + 1)) + 33);
                let movingString = oldString.replaceAt(charIndex, char);
                screen.textContent = movingString;
                await new Promise(r => setTimeout(r, 1));
            }
            let newChar = newString.substring(charIndex, charIndex + 1);
            if ((oldString.length > newString.length) && (charIndex >= newString.length)) {
                newChar = ' ';
            }
            let morphingString = oldString.replaceAt(charIndex, newChar);
            screen.textContent = morphingString;
            oldString = morphingString;
        }

        if (index === strings.length - 1) {
            index = 0;
        } else {
            index += 1;
        }
        await new Promise(r => setTimeout(r, 2000));
    }
}

// function stringPadder(unpaddedStrings) {
//     const padding = ' ';
//     let maxLength = 0;
//     unpaddedStrings.forEach(unpaddedString => {
//         maxLength = unpaddedString.length > maxLength ? unpaddedString.length : maxLength;
//     });
//     const paddedStrings = [];
//     unpaddedStrings.forEach(unpaddedString => {
//         let paddedString = unpaddedString;
//         for (let index = unpaddedString.length; index < maxLength; index++) {
//             paddedString += padding;
//         }
//         paddedStrings.push(paddedString);
//     });

//     return paddedStrings;
// }
