class Bullet {

    constructor(config, scene) {
        this.gameConfig = scene.game.config;
        this.sprite = scene.add.sprite(config.x, config.y, "bullet");
        this.sprite.displayWidth = this.gameConfig.width / 15;
        this.sprite.displayHeight = this.gameConfig.height / 15;
        this.reborn(config);
    }

    reborn(config) {
        this.config = config;
        this.sprite.x = config.x;
        this.sprite.y = config.y;
    }

    update() {
        this.sprite.x += this.config.velocityX;
        this.sprite.y += this.config.velocityY;
    }

    isOutOfBound() {
        return this.sprite.x < 0 || this.sprite.x > this.gameConfig.width || this.sprite.y < 0 || this.sprite.y > this.gameConfig.height;
    }

}