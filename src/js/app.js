import Game from './classes/Game'

const button = document.getElementById('start')

function showCursor() {
    document.body.style.cursor = 'auto'
    document.body.removeEventListener('mousemove', showCursor)
}

function startGame() {
    document.body.removeChild(document.getElementById('start'))
    document.body.style.cursor = 'none'
    new Game()

    document.body.addEventListener('mousemove', showCursor)
}

button.addEventListener('click', startGame)
