function resizeHeader() {
    let header = document.querySelector('body>main>header')
    let main = document.querySelector('body>main')
    let mainTopMargin = parseFloat(window.getComputedStyle(main).marginTop)
    let headerTopMargin = parseFloat(window.getComputedStyle(header).marginTop)
    let headerBottomMargin = parseFloat(window.getComputedStyle(header).marginBottom)
    let finalHeight = window.innerHeight - mainTopMargin - headerTopMargin - headerBottomMargin
    header.style.height = finalHeight + 'px'
}

document.addEventListener('DOMContentLoaded', resizeHeader)
window.addEventListener('resize', resizeHeader)