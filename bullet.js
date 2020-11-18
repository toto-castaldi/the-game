class Bullet {

    constructor(config, scene) {
        this.gameConfig = scene.game.config;
        this.scene = scene;
        this.reborn(config);
    }

    reborn(config) {
        this.config = config;
        
        this.originalX = config.x;
        this.originalY = config.y;

        this.sprite = this.scene.add.sprite(config.x, config.y, "bullet");
        this.sprite.displayWidth = this.gameConfig.width / 15;
        this.sprite.displayHeight = this.gameConfig.height / 15;

        this.sprite.x = config.x;
        this.sprite.y = config.y;
    }

    update() {
        this.sprite.x += this.config.velocityX;
        this.sprite.y += this.config.velocityY;
    }

    destroy() {
        this.sprite.destroy();
    }

    isFinished() {
        const isOutOfBoundScreen = this.sprite.x < 0 || this.sprite.x > this.gameConfig.width || this.sprite.y < 0 || this.sprite.y > this.gameConfig.height;
        const finishedX = Math.abs(this.sprite.x - this.originalX) > this.gameConfig.width / 2;
        return isOutOfBoundScreen || finishedX;
    }

}