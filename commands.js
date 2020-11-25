class CommandsScene extends Phaser.Scene {

    constructor() {
        super({
            key: "Commands"
        })

        this.bullets = [];
        this.lastFire;
        this.isaac;
        this.room;
    }

    preload() {
        this.load.image("isaac", "assets/isaac.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("room", "assets/room-commands.png");
        this.load.image("sfondoisaac2", "assets/sfondoisaac2.png");
        this.load.image("pietra1", "assets/pietra1.png");
        this.load.image("pietra2", "assets/pietra2.png");
        this.load.image("pietra3", "assets/pietra3.png");


    }

    create() {
        this.room = new Room(this);

        this.isaac = new Isaac(this);
        
        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.add.sprite(150,400, "pietra1")
        this.add.sprite(250,300, "pietra2")
        this.add.sprite(350,200, "pietra3")

    }

    fire(velocityX, velocityY, time) {
        if (this.lastFire === undefined || this.lastFire < time - gameOptions.minMillisTimeDeltaFire) {
            const bulletState = { x: this.isaac.sprite.x, y: this.isaac.sprite.y, velocityX, velocityY };
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
            this.isaac.move(0, -gameOptions.issacSpeedY);
        }
        if (this.sKey.isDown) {
            this.isaac.move(0, +gameOptions.issacSpeedY);
        }
        if (this.aKey.isDown) {
            this.isaac.move(-gameOptions.issacSpeedX, 0);
        }
        if (this.dKey.isDown) {
            this.isaac.move(gameOptions.issacSpeedX, 0);
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
            
        });


    }
}