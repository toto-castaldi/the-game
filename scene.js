class Scene extends Phaser.Scene {

    constructor() {
        super({
            key: "Scene"
        })

        this.playing = true;
    }

    gameOver() {
        this.playing = false;
        let gameOverSprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "game-over");
        gameOverSprite.setDepth(2);
        gameOverSprite.displayWidth = this.game.config.width * 1.5;
        gameOverSprite.displayHeight = this.game.config.height * 1.5;
    }

    restart() {
        this.playing = true;
        this.scene.start('Scene');
    }

    create() {
        const deltaY = this.game.config.height - 16 * 32;

        //'map' è definita in caricamento con load.tilemapTiledJSON
        this.map = this.make.tilemap({ key: "map" });

        //'tiled' è definito come tileset in Tiled. 'tiles' è definita in caricamento con load.image
        this.map.addTilesetImage("tiled", "tiles");

        //'tiled' è definito come tileset in Tiled. 
        //'base' è definito come tileset in Tiled. 
        //'rocks' è definito come tileset in Tiled. 
        this.baseLayer = this.map.createStaticLayer("base", "tiled", 0, deltaY);
        this.rockLayer = this.map.createStaticLayer("rocks", "tiled", 0, deltaY);
        //collisioni con proprietà definite in Tiled
        this.baseLayer.setCollisionByProperty({ collides: true });
        this.rockLayer.setCollisionByProperty({ collides: true });

        //gruppo di proiettili
        this.bullets = this.physics.add.group();

        this.enemies = this.physics.add.group();

        this.player = new Player(this, this.game.config.width / 2, this.game.config.height / 2);

        this.map.filterObjects("enemy-spawn", function (object) {
            console.log(this);
            this.enemies.add(new Enemy(this, object.x , object.y + deltaY));
        }, this);

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

        this.physics.add.collider(this.enemies, this.rockLayer, this.enemyCollide, null, this);
        this.physics.add.collider(this.enemies, this.baseLayer, this.enemyCollide, null, this);

        this.physics.add.collider(this.bullets, this.baseLayer, this.bulletCollide, null, this);
        this.physics.add.collider(this.bullets, this.rockLayer, this.bulletCollide, null, this);


        this.input.on('pointerdown', (pointer) => {
            if (!this.playing) {
                this.restart();
            }
        }, this);

        if (gameOptions.debug) {
            const debugGraphics = this.add.graphics().setAlpha(0.75);
            const debugOptions = {
                tileColor: null, 
                collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), 
                faceColor: new Phaser.Display.Color(40, 39, 37, 255) 
            };
            //this.baseLayer.renderDebug(debugGraphics, debugOptions);
            this.rockLayer.renderDebug(debugGraphics, debugOptions);
        }
    }

    enemyCollide(enemy, element) {
        enemy.changeDirection();
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
                let bullet = this.bullets.create(this.player.x, this.player.y, "texture", "bullet");
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

        if (this.playing) {
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
}