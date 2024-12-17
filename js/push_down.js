function resizeHeader() {
    let header = document.querySelector('body>main>header')
    let main = document.querySelector('body>main')
    let mainTopMargin = parseFloat(window.getComputedStyle(main).marginTop)
    let headerTopMargin = parseFloat(window.getComputedStyle(header).marginTop)
    let headerBottomMargin = parseFloat(window.getComputedStyle(header).marginBottom)
    let finalHeight = window.innerHeight - mainTopMargin - headerTopMargin - headerBottomMargin
    header.style.height = finalHeight + 'px'
}

function resizeEverythingElse() {
    let totalHeight = 0
    let sections = document.querySelectorAll('section')
    sections.forEach(section => {
        totalHeight += parseFloat(window.getComputedStyle(section).height)
        totalHeight += parseFloat(window.getComputedStyle(section).marginTop)
        totalHeight += parseFloat(window.getComputedStyle(section).marginBottom)
        console.log(section, totalHeight)
    });
    let footer = document.querySelector('footer')
    totalHeight += parseFloat(window.getComputedStyle(footer).height)
    if (totalHeight < window.innerHeight) {
        let finalMargin = window.innerHeight - totalHeight
        footer.style.paddingTop = finalMargin + 'px'
    }
}

function resize() {
    resizeHeader()
    resizeEverythingElse()
}

document.addEventListener('DOMContentLoaded', resize)
window.addEventListener('resize', resize)