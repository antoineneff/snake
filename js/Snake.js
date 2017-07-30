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
        return (this.x < 0 || this.x > 19 || this.y < 0 || this.y > 19 || this.bitesHisTail());
    }

    drawHead(part, context, bl) {
        const startAngle = (this.direction === 'right' || this.direction === 'left') ? 0.5 * Math.PI : 0;
        const endAngle = (this.direction === 'right' || this.direction === 'left') ? 1.5 * Math.PI : Math.PI;;

        context.fillStyle = 'green';
        context.beginPath();
        context.arc(
            (part.x * bl + bl / 2),
            (part.y * bl + bl / 2),
            bl / 2,
            startAngle,
            endAngle,
            (this.direction === 'right' || this.direction === 'up')
        );

        switch (this.direction) {
            case 'right':
                context.fillRect(part.x * bl, part.y * bl, bl / 2, bl);
                break;
            case 'left':
                context.fillRect(part.x * bl + bl / 2, part.y * bl, bl / 2, bl);
                break;
            case 'up':
                context.fillRect(part.x * bl, part.y * bl + bl / 2, bl, bl / 2);
                break;
            case 'down':
                context.fillRect(part.x * bl, part.y * bl, bl, bl / 2);
                break;
        }
        context.fill();
    }

    drawSnake(context, bl) {
        this.body.map((part, index) => {
            if (index === 0) {
                this.drawHead(part, context, bl);
            } else {
                if (context.fillStyle !== '#000000') {
                    context.fillStyle = 'black';
                }
                context.fillRect(part.x * bl, part.y * bl, bl, bl);
            }
        });
    }
}
