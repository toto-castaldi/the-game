class Scene extends Phaser.Scene {

    constructor() {
        super({
            key: "Scens"
        })

    }

    preload() {
        this.load.image("isaac", "assets/isaac.png");
        this.load.image("bullet", "assets/bullet.png");

        this.load.tilemapCSV("map", "assets/tiles.csv");
        this.load.image("tiles", "assets/tiles.png");

    }

    create() {
        //usando le tile creo il livello
        this.map = this.make.tilemap({ key: "map", tileWidth: 32, tileHeight: 32 });
        this.tileset = this.map.addTilesetImage("tiles");
        this.layer = this.map.createStaticLayer(0, this.tileset, 0, this.game.config.height - 16 * 32);

        //sopra
        this.map.setCollisionBetween(0, 49);
        //dx
        this.map.setCollisionBetween(73, 74);
        this.map.setCollisionBetween(80, 81);
        this.map.setCollisionBetween(86, 87);
        this.map.setCollisionBetween(92, 93);
        this.map.setCollisionBetween(98, 99);
        this.map.setCollisionBetween(105, 106);
        this.map.setCollisionBetween(111, 112);
        this.map.setCollisionBetween(117, 118);
        this.map.setCollisionBetween(123, 124);
        this.map.setCollisionBetween(129, 130);
        this.map.setCollisionBetween(136, 137);
        //sotto
        this.map.setCollisionBetween(163, 212);
        //sx
        this.map.setCollisionBetween(50, 51);
        this.map.setCollisionBetween(75, 76);
        this.map.setCollisionBetween(82, 83);
        this.map.setCollisionBetween(88, 89);
        this.map.setCollisionBetween(94, 95);
        this.map.setCollisionBetween(100, 101);
        this.map.setCollisionBetween(107, 108);
        this.map.setCollisionBetween(113, 114);
        this.map.setCollisionBetween(119, 120);
        this.map.setCollisionBetween(125, 126);
        this.map.setCollisionBetween(131, 132);
        //rocce
        this.map.setCollisionBetween(213, 215);

        //lo sprite del giocatore
        this.player = this.physics.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "isaac");
        //non esce dal mondo
        this.player.setCollideWorldBounds(true);
        this.player.displayWidth = this.game.config.width * 0.065;
        this.player.displayHeight = this.game.config.height * 0.1;
        this.player.setDepth(2);

        this.bullets = this.physics.add.group();

        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.downKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.upKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.leftKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.rightKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //collisione tra il giocatore e il layer del livello
        this.physics.add.collider(this.player, this.layer);
        this.physics.add.collider(this.bullets, this.layer, this.bulletCollide, null, this);

    }

    bulletCollide(bullet, element) {
        bullet.disableBody(true, true);
    }


    fire(velocityX, velocityY, time) {
        if (this.lastFire === undefined || this.lastFire < time - gameOptions.minMillisTimeDeltaFire) {
            
            let inactiveBullet = this.bullets.children.getArray().find(bullet => !bullet.body.enable);
            if (inactiveBullet) {
                inactiveBullet.enableBody(true, this.player.x, this.player.y, 0, true, true);
                inactiveBullet.setVelocity(velocityX, velocityY);
                this.lastFire = time;
            } else if (this.bullets.countActive() < gameOptions.bulletCount) {
                let bullet = this.bullets.create(this.player.x, this.player.y, "bullet");
                bullet.displayWidth = this.game.config.width / 15;
                bullet.displayHeight = this.game.config.height / 15;
                bullet.setCollideWorldBounds(true);
                bullet.setVelocity(velocityX, velocityY);
                this.lastFire = time;
            }

        }
    }

    update(time, update) {
        this.player.setVelocity(0);

        if (this.dKey.isDown) {
            this.player.setVelocityX(gameOptions.issacSpeedX);
        }

        if (this.aKey.isDown) {
            this.player.setVelocityX(-gameOptions.issacSpeedX);
        }

        if (this.sKey.isDown) {
            this.player.setVelocityY(gameOptions.issacSpeedY);
        }

        if (this.wKey.isDown) {
            this.player.setVelocityY(-gameOptions.issacSpeedY);
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


    }
}