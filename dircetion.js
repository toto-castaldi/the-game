class Direction {
    static get UP() { return 0; }
    static get DOWN() { return 1; }
    static get LEFT() { return 2; }
    static get RIGHT() { return 3; }

    constructor(dir) {
        this.dir = dir;
    }

    randomChange() {
        let res = this.dir;
        while (res === this.dir) {
            res = getRandomInt(4);
        }
        return new Direction(res);
    }

}