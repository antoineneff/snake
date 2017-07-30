class Snake {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.size = 1;
        this.direction = 'right';
        this.body = [{x: this.x, y: this.y}];
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
        if (this.size < this.body.length) {
            this.body.pop();
        }
    }

    eats(food) {
        if (this.x === food.x && this.y === food.y) {
            this.size += 1;
            return true;
        }
        return false;
    }

    bitesHisTail() {
        for (let i = 1; i < this.body.length; i++) {
            if (this.x === this.body[i].x && this.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }

    isDead() {
        if (this.x < 0 || this.x > 19 || this.y < 0 || this.y > 19 || this.bitesHisTail()) {
            return true;
        }
        return false;
    }
}
