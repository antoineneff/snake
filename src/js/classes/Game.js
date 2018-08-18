import Snake from './Snake'
import Food from './Food'

export default class Game {
    constructor(options = {}) {
        this.unit = options.unit || 20
        this.width = document.body.scrollWidth - (document.body.scrollWidth % this.unit) - this.unit
        this.height = document.body.scrollHeight - (document.body.scrollHeight % this.unit) - this.unit
        this.canvas = this.createCanvas()
        this.snake = new Snake(this.width / this.unit, this.height / this.unit)
        this.food = new Food(this.width / this.unit, this.height / this.unit)
        this.nextDirection = 0
        this.interval = null
        this.paused = false
        this.lost = false
        this.handleKeys()
        this.loop()
    }

    createCanvas() {
        const canvas = document.createElement('canvas')
        canvas.width = this.width
        canvas.height = this.height
        document.body.appendChild(canvas)
        return canvas
    }

    handleKeys() {
        // KEYBOARD
        document.addEventListener('keydown', (e) => {
            const key = e.keyCode
            if (this.lost === false) {
                if (key === 32 && this.paused === false) {
                    this.pause()
                } else if (key === 32 && this.paused === true) {
                    this.unpause()
                }
            }

            if (this.paused === false) {
                if (key === 37 && this.snake.direction !== 0) {
                    this.nextDirection = 2
                } else if (key === 38 && this.snake.direction !== 1) {
                    this.nextDirection = 3
                } else if (key === 39 && this.snake.direction !== 2) {
                    this.nextDirection = 0
                } else if (key === 40 && this.snake.direction !== 3) {
                    this.nextDirection = 1
                }
            }
        })
        // TOUCH EVENTS
        this.canvas.addEventListener('touchend', (evt) => {
            const margin = this.canvas.getBoundingClientRect().left
            const X = evt.changedTouches[0].clientX - margin

            if (X > this.width / 2) {
                if (this.snake.direction === 0) {
                    this.nextDirection = 1
                } else if (this.snake.direction === 1) {
                    this.nextDirection = 2
                } else if (this.snake.direction === 2) {
                    this.nextDirection = 3
                } else if (this.snake.direction === 3) {
                    this.nextDirection = 0
                }
            } else {
                if (this.snake.direction === 0) {
                    this.nextDirection = 3
                } else if (this.snake.direction === 1) {
                    this.nextDirection = 0
                } else if (this.snake.direction === 2) {
                    this.nextDirection = 1
                } else if (this.snake.direction === 3) {
                    this.nextDirection = 2
                }
            }
        })
    }

    pause() {
        clearInterval(this.interval)
        this.paused = true
    }

    unpause() {
        this.loop()
        this.paused = false
    }

    loop() {
        this.interval = setInterval(() => {
            this.clear()
            this.snake.move(this.nextDirection)
            this.checkWalls()
            this.checkTail()
            this.checkFood()
            this.draw()
        }, 100)
    }

    draw() {
        const ctx = this.canvas.getContext('2d')

        // DRAW FOOD
        ctx.fillStyle = '#F4796B'
        ctx.fillRect(this.food.position.x * this.unit + 1, this.food.position.y * this.unit + 1, this.unit - 2, this.unit - 2)

        // DRAW SNAKE
        ctx.fillStyle = '#76CCCC'
        for (let i = 1; i < this.snake.size; i += 1) {
            ctx.fillRect(this.snake.tail[i-1].x * this.unit + 1, this.snake.tail[i-1].y * this.unit + 1, this.unit - 2, this.unit - 2)
        }
        ctx.fillStyle = '#3C6E71'
        ctx.fillRect(this.snake.position.x * this.unit + 1, this.snake.position.y * this.unit + 1, this.unit - 2, this.unit - 2)
    }

    clear() {
        const ctx = this.canvas.getContext('2d')
        ctx.clearRect(0, 0, this.width, this.height)
    }

    checkWalls() {
        if (this.snake.position.x < 0 || this.snake.position.x >= this.width / this.unit || this.snake.position.y < 0 || this.snake.position.y >= this.height / this.unit) {
            this.lost = true
            this.pause()
        }
    }

    checkTail() {
        const isBitten = this.snake.tail.filter(piece => piece.x === this.snake.position.x && piece.y === this.snake.position.y).length
        if (isBitten) {
            this.lost = true
            this.pause()
        }
    }

    checkFood() {
        if (this.snake.position.x === this.food.position.x && this.snake.position.y === this.food.position.y) {
            this.snake.eat()
            this.food.randomPosition()
        }
    }
}
