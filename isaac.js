class Isaac {

    constructor(scene) {
        this.scene = scene;

        this.sprite = scene.add.sprite(this.scene.game.config.width / 2, this.scene.game.config.height / 2, "isaac");
        this.sprite.displayWidth = this.scene.game.config.width * 0.065;
        this.sprite.displayHeight = this.scene.game.config.height * 0.1;
        this.sprite.setDepth(2);
    }

    move(x, y) {
        this.sprite.x += x;
        this.sprite.y += y;

        this.scene.room.blockBoundaries(this.sprite);
    }

}