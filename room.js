class Room {

    constructor(scene) {
        this.scene = scene;
        this.factors = {
            xMin : 1 / 10,
            xMax : 9 / 10,
            yMin : 1 / 4,
            yMax : 5 / 6
        }

        scene.add.image(scene.game.config.width / 2, scene.game.config.height / 2, "room");

    }

    blockBoundaries(sprite) {
        if (sprite.x < this.scene.game.config.width * this.factors.xMin) sprite.x = this.scene.game.config.width * this.factors.xMin;
        if (sprite.x > this.scene.game.config.width * this.factors.xMax) sprite.x = this.scene.game.config.width * this.factors.xMax;
        if (sprite.y < this.scene.game.config.height * this.factors.yMin) sprite.y = this.scene.game.config.height * this.factors.yMin;
        if (sprite.y > this.scene.game.config.height * this.factors.yMax) sprite.y = this.scene.game.config.height * this.factors.yMax;
    }

    isTouchingBoundaries(sprite) {
        return (
            (sprite.x < this.scene.game.config.width * this.factors.xMin) ||
            (sprite.x > this.scene.game.config.width * this.factors.xMax) ||
            (sprite.y < this.scene.game.config.height * this.factors.yMin) ||
            (sprite.y > this.scene.game.config.height * this.factors.yMax)
        )
    }

}