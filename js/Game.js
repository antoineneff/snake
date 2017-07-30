class Game {
    constructor() {
        this.snake = new Snake;
        this.food = new Food;
        this.hasStarted = false;
        this.speed = 5;
        this.interval = null;
        this.ctx = document.getElementById('game').getContext('2d');

        this.startGame();
    }

    startGame() {
        this.render();
        document.addEventListener('keypress', (evt) => {
            if (this.hasStarted === false && evt.keyCode === 32) {
                this.interval = setInterval(this.loop.bind(this), 1000/this.speed);
            }
        });
    }

    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 400, 400);
    }

    stopLoop() {
        clearInterval(this.interval);
    }

    listenToKeys() {
        document.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 37 && this.snake.direction !== 'right') {
                this.snake.direction = 'left';
            }
            if (evt.keyCode === 38 && this.snake.direction !== 'down') {
                this.snake.direction = 'up';
            }
            if (evt.keyCode === 39 && this.snake.direction !== 'left') {
                this.snake.direction = 'right';
            }
            if (evt.keyCode === 40 && this.snake.direction !== 'up') {
                this.snake.direction = 'down';
            }
        });
    }

    loop() {
        this.listenToKeys();
        this.snake.move();
        if (this.snake.eats(this.food) === true) {
            this.food.place();
        }
        if (this.snake.isDead() === true) {
            this.stopLoop();
        } else {
            this.clearCanvas();
            this.render();
        }
    }

    render() {
        this.ctx.fillStyle = 'black';
        this.snake.body.forEach(part => {
            this.ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
        });

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x * 20, this.food.y * 20, 20, 20);
    }
}
