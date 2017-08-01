class Game {
    constructor() {
        this.snake = new Snake;
        this.food = new Food;

        this.hasStarted = false;
        this.speed = 5;
        this.bl = 20; // Base location
        this.interval = null;
        this.ctx = document.getElementById('game').getContext('2d');

        this.addKeyEvents();
        this.startGame();
    }

    addKeyEvents() {
        document.addEventListener('keypress', evt => {
            const keyCode = evt.keyCode || evt.charCode;
            if (!this.hasStarted && keyCode === 32) {
                this.hasStarted = true;
                this.interval = setInterval(this.loop.bind(this), 1000/this.speed);
            }
        });

        document.addEventListener('keydown', evt => {
            if (!this.hasStarted) {
                return;
            }
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

    startGame() {
        this.render();
    }

    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 400, 400);
    }

    stopLoop() {
        clearInterval(this.interval);
    }

    loop() {
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
        this.snake.drawSnake(this.ctx, this.bl);

        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(this.food.x * this.bl, this.food.y * this.bl, this.bl, this.bl);
    }
}
