export default class Snake {
    constructor(width, height) {
        this.game = { width, height }
        this.size = 1
        this.position = { x: Math.round(width / 100 * 20), y: Math.round(height / 100 * 20) }
        this.tail = []
    }

    move(direction) {
        this.direction = direction
        const directions = {
            0: { x: this.position.x + 1, y: this.position.y },
            1: { x: this.position.x, y: this.position.y + 1 },
            2: { x: this.position.x - 1, y: this.position.y },
            3: { x: this.position.x, y: this.position.y - 1 }
        }
        this.tail.unshift(this.position)
        this.tail.splice(-1, 1)
        this.position = directions[this.direction]
    }

    eat() {
        this.size += 1
        this.tail.push(this.tail.length ? this.tail[this.tail.length - 1] : this.position)
    }
}
