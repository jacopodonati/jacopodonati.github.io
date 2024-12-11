function resizeHeader() {
    let header = document.querySelector('body>main>header')
    let main = document.querySelector('body>main')
    let mainTopMargin = parseInt(window.getComputedStyle(main).marginTop)
    let headerBottomMargin = parseInt(window.getComputedStyle(header).marginBottom)
    let finalHeight = window.innerHeight - mainTopMargin - headerBottomMargin
    header.style.height = finalHeight + 'px'
}

document.addEventListener('DOMContentLoaded', resizeHeader)
window.addEventListener('resize', resizeHeader)