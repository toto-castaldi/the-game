class Commands extends Phaser.Scene {
    constructor() {
        super({
            key: "Commands"
        })
    }

    preload() {
        this.load.image("isaac", "assets/isaac.png");
    }

    create() {
        this.isaac = this.add.sprite(game.config.width / 2, game.config.height / 2, "isaac");
        this.isaac.displayWidth = game.config.width / 10;
        this.isaac.displayHeight = this.isaac.displayWidth;

        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    }

    update() {
        if (this.wKey.isDown) {
            this.isaac.y -= gameOptions.issaSpeedY
        }
        if (this.sKey.isDown) {
            this.isaac.y += gameOptions.issaSpeedY
        }
        if (this.aKey.isDown) {
            this.isaac.x -= gameOptions.issaSpeedY
        }
        if (this.dKey.isDown) {
            this.isaac.x += gameOptions.issaSpeedY
        }

    }
}