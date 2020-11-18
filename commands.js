class Commands extends Phaser.Scene {
    constructor() {
        super({
            key: "Commands"
        })

        this.bullets = [];
        this.lastFire;
    }

    preload() {
        this.load.image("isaac", "assets/isaac.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("room", "assets/room-commands.png");
        this.load.image("life", "assets/Herz.svg");
    }

    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, "room");

        for (var x = 0; x < 3; x++) {
            let image = this.add.image(this.game.config.width / 2 + x * 30, 100, "life");
            image.displayWidth = 30;
            image.displayHeight = 40;
        }

        this.isaac = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "isaac");
        this.isaac.displayWidth = this.game.config.width * 0.065;
        this.isaac.displayHeight = this.game.config.height * 0.1;
        this.isaac.setDepth(2);

        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

    }

    fire(velocityX, velocityY, time) {
        if (this.lastFire === undefined || this.lastFire < time - gameOptions.minMillisTimeDeltaFire) {
            const bulletState = { x: this.isaac.x, y: this.isaac.y, velocityX, velocityY };
            if (this.bullets.length < gameOptions.bulletCount) {
                this.bullets.push(new Bullet(bulletState, this));
                this.lastFire = time;
            } else {
                const freeBullet = this.bullets.find((bullet) => bullet.isFinished());
                if (freeBullet) {
                    freeBullet.reborn(bulletState);
                    this.lastFire = time;
                }
            }
        }
    }

    update(time, update) {
        if (this.wKey.isDown) {
            this.isaac.y -= gameOptions.issacSpeedY
        }
        if (this.sKey.isDown) {
            this.isaac.y += gameOptions.issacSpeedY
        }
        if (this.aKey.isDown) {
            this.isaac.x -= gameOptions.issacSpeedX
        }
        if (this.dKey.isDown) {
            this.isaac.x += gameOptions.issacSpeedX
        }

        if (this.leftKey.isDown) {
            this.fire(-gameOptions.bulletSpeedX, 0, time);
        }
        if (this.rightKey.isDown) {
            this.fire(gameOptions.bulletSpeedX, 0, time);
        }
        if (this.upKey.isDown) {
            this.fire(0, -gameOptions.bulletSpeedY, time);
        }
        if (this.downKey.isDown) {
            this.fire(0, +gameOptions.bulletSpeedY, time);
        }


        this.bullets.forEach((bullet) => {
            bullet.update();
            if (bullet.isFinished()) {
                bullet.destroy();
            }
        });


    }
}