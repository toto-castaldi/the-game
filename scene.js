class Scene extends Phaser.Scene {

    constructor() {
        super({
            key: "Scene"
        })

    }

    preload() {
        this.load.image("isaac", "assets/isaac.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("heart", "assets/heart.png");

        this.load.image('tiles', 'tiled/tiled.png');
        this.load.tilemapTiledJSON('map', 'tiled/level-00.json');
    }

    create() {
        //usando le tile creo il livello
        this.map = this.make.tilemap({ key: 'map' });
        this.map.addTilesetImage("tiled", "tiles");
        this.baseLayer = this.map.createStaticLayer("base", "tiled", 0, this.game.config.height - 16 * 32);
        this.rockLayer = this.map.createStaticLayer("rocks", "tiled", 0, this.game.config.height - 16 * 32);
        this.map.setCollisionByExclusion(79, true, true, "base");
        this.map.setCollisionBetween(80, 82, true, true, "rocks");

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

        //collisioni
        this.physics.add.collider(this.player, this.rockLayer);
        this.physics.add.collider(this.player, this.baseLayer);
        this.physics.add.collider(this.bullets, this.baseLayer, this.bulletCollide, null, this);
        this.physics.add.collider(this.bullets, this.rockLayer, this.bulletCollide, null, this);

        this.playerEnergy = new Player(this);

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