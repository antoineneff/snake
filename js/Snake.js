class Snake {
    constructor() {
        this.x = 5;
        this.y = 5;
        this.size = 1;
        this.direction = 'right';
        this.body = [{x: this.x, y: this.y, direction: this.direction}];
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

        this.body.unshift({x: this.x, y: this.y, direction: this.direction});
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

    drawCorner(context, part, bl, corner) {
        switch (corner) {
            case 'upLeft':
                context.fillRect(part.x * bl + bl / 2, part.y * bl, bl / 2, bl);
                context.fillRect(part.x * bl, part.y * bl, bl, bl / 2);
                break;
            case 'upRight':
                context.fillRect(part.x * bl, part.y * bl, bl, bl / 2);
                context.fillRect(part.x * bl, part.y * bl, bl / 2, bl);
                break;
            case 'downLeft':
                context.fillRect(part.x * bl + bl / 2, part.y * bl, bl / 2, bl);
                context.fillRect(part.x * bl, part.y * bl + bl / 2, bl, bl / 2);
                break;
            case 'downRight':
                context.fillRect(part.x * bl, part.y * bl, bl / 2, bl);
                context.fillRect(part.x * bl, part.y * bl + bl / 2, bl, bl / 2);
                break;
        }
    }

    drawBody(body, index, context, bl) {
        const part = body[index];
        if (context.fillStyle !== '#000000') {
            context.fillStyle = 'black';
        }

        const previous = body[index - 1];
        const next = body[index + 1];
        let drawed = false;
        if (previous  !== undefined && next !== undefined) {
            if (previous.y !== next.y && previous.x !== next.x) {
                if (previous.x < next.x) {
                    if (previous.y < next.y) {
                        if (part.direction !== 'up') {
                            this.drawCorner(context, part, bl, 'upLeft');
                        } else {
                            this.drawCorner(context, part, bl, 'downRight');
                        }
                    } else if (previous.y > next.y) {
                        if (part.direction !== 'down') {
                            this.drawCorner(context, part, bl, 'downLeft');
                        } else {
                            this.drawCorner(context, part, bl, 'upRight');
                        }
                    }
                } else if (previous.x > next.x) {
                    if (previous.y < next.y) {
                        if (part.direction !== 'up') {
                            this.drawCorner(context, part, bl, 'upRight');
                        } else {
                            this.drawCorner(context, part, bl, 'downLeft');
                        }
                    } else if (previous.y > next.y) {
                        if (part.direction !== 'down') {
                            this.drawCorner(context, part, bl, 'downRight');
                        } else {
                            this.drawCorner(context, part, bl, 'upLeft');
                        }
                    }
                }
                drawed = true;
            }
        }

        if (drawed) {
            context.beginPath();
            context.arc(
                (part.x * bl + bl / 2),
                (part.y * bl + bl / 2),
                bl / 2,
                0,
                Math.PI * 2
            );
            context.fill();
        } else {
            context.fillRect(part.x * bl, part.y * bl, bl, bl);
        }
    }

    drawSnake(context, bl) {
        this.body.map((part, index) => {
            if (index === 0) {
                this.drawHead(part, context, bl);
            } else {
                this.drawBody(this.body, index, context, bl)
            }
        });
    }
}
