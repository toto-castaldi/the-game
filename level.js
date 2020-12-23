class Level extends Phaser.Scene {

    constructor(conf, mapName, nextLevel) {
        super(conf)
        this.mapName = mapName;
        this.currentLevel = conf.key;
        this.nextLevel = nextLevel;

        this.playing = true;
        this.keys = {};
    }

    gameOver() {
        this.playing = false;
        let gameOverSprite = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "texture", "game-over.png");
        gameOverSprite.setDepth(2);
        gameOverSprite.displayWidth = this.game.config.width * 1.5;
        gameOverSprite.displayHeight = this.game.config.height * 1.5;
    }

    restart() {
        this.playing = true;
        this.scene.start(this.currentLevel);
    }

    startNextLevel() {
        this.scene.start(this.nextLevel);
    }

    create() {
        const deltaY = this.game.config.height - 16 * 32;

        //'map' è definita in caricamento con load.tilemapTiledJSON
        this.map = this.make.tilemap({ key: this.mapName });

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
            let enemyType = object.properties.filter(prop => prop.name == "enemyType")[0].value;
            switch (enemyType) {
                case "red-slime":
                    this.enemies.add(new RedSlime(this, object.x, object.y + deltaY));
                    break;
                case "blue-slime":
                    this.enemies.add(new BlueSlime(this, object.x, object.y + deltaY));
                    break;
                case "green-slime":
                    this.enemies.add(new GreenSlime(this, object.x, object.y + deltaY, this.player));
                    break;
                case "worm":
                    this.enemies.add(new Worm(this, object.x, object.y + deltaY));
                    break;

            }
        }, this);

        this.keys.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.keys.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.keys.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.keys.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.keys.down = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keys.up = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        this.keys.left = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        this.keys.right = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //collisioni        
        this.physics.add.collider(this.player, this.rockLayer);
        this.physics.add.collider(this.player, this.baseLayer);

        this.physics.add.collider(this.enemies, this.rockLayer, this.enemyCollide, null, this);
        this.physics.add.collider(this.enemies, this.baseLayer, this.enemyCollide, null, this);

        this.physics.add.collider(this.bullets, this.baseLayer, this.bulletCollide, null, this);
        this.physics.add.collider(this.bullets, this.rockLayer, this.bulletCollide, null, this);


        this.physics.add.collider(this.enemies, this.player, (player, enemy) => {
            player.handleDamage(enemy);
        }, null);

        //nemici colpiti da proiettile
        this.physics.add.collider(this.bullets, this.enemies, (bullet, enemy) => {
            bullet.disableBody(true, true);
            enemy.disableBody(true, true);

            if (this.enemies.countActive() == 0) {
                this.startNextLevel();
            }
        }, null);


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

        this.anims.create({
            key: 'weapon-shuriken',
            frames: this.anims.generateFrameNames('texture', {
                start: 0,
                end: 1,
                prefix: 'weapon/shuriken/shuriken_',
                suffix: '.gif'
            }),
            frameRate: 60,
            repeat: -1
        });
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
                let bullet = this.bullets.create(this.player.x, this.player.y, "texture", "weapon/shuriken/shuriken_1.gif");
                bullet.setBodySize(15, 15, true);
                bullet.anims.play("weapon-shuriken");
                bullet.setCollideWorldBounds(true);
                bullet.setVelocity(velocityX, velocityY);
                this.lastFire = time;
            }

        }
    }

    update(time, update) {

        

        if (this.playing) {
            this.player.move({
                keys: this.keys
            });

            if (this.keys.left.isDown) {
                this.fire(-gameOptions.bulletSpeedX, 0, time);
            }
            if (this.keys.right.isDown) {
                this.fire(gameOptions.bulletSpeedX, 0, time);
            }
            if (this.keys.up.isDown) {
                this.fire(0, -gameOptions.bulletSpeedY, time);
            }
            if (this.keys.down.isDown) {
                this.fire(0, +gameOptions.bulletSpeedY, time);
            }
        } else {
            this.player.setVelocity(0, 0);
        }
    }
}