class Snake {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.direction = 'right';
        this.body = [];
    }

    move() {
        switch (this.direction) {
            case 'right':
                this.x += 1;
                break;
            case 'left':
                this.x -= 1;
                break;
            case 'up':
                this.y -= 1;
                break;
            case 'down':
                this.y += 1;
                break;
        }

        this.body.unshift({x: this.x, y: this.y});
        this.body.pop();
    }
}

class Game {
    constructor() {
        this.snake = new Snake;
        this.hasStarted = false;
        this.speed = 5;
        this.ctx = document.getElementById('game').getContext('2d');

        this.startGame();
    }

    startGame() {
        document.addEventListener('keypress', (evt) => {
            console.log(evt.keyCode);
            if (this.hasStarted === false && evt.keyCode === 32) {
                this.loop = setInterval(this.loop.bind(this), 1000/this.speed);
            }
        });
    }

    clearCanvas() {
        this.ctx.fillStyle = 'white';
        this.ctx.fillRect(0, 0, 400, 400);
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
        this.clearCanvas();
        this.listenToKeys();
        this.snake.move();
        this.render();
    }

    render() {
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(this.snake.x * 20, this.snake.y * 20, 20, 20);
    }
}

new Game;