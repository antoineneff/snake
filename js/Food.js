class Food {
    constructor() {
        this.x = 15;
        this.y = 5;
    }

    place() {
        this.x = Math.floor(Math.random() * 20);
        this.y = Math.floor(Math.random() * 20);
    }
}
