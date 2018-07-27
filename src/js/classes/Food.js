export default class Food {
    constructor(width, height) {
        this.game = { width, height }
        this.randomPosition()
    }

    randomPosition() {
        const x = Math.floor(Math.random() * this.game.width)
        const y = Math.floor(Math.random() * this.game.height)
        this.position = { x, y }
    }
}
