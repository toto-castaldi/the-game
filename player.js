class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "texture", "isaac.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.setBodySize(200, 200, true).setOffset(90, 300);

        this.displayWidth = scene.game.config.width * 0.065;
        this.displayHeight = scene.game.config.height * 0.1;
        this.setDepth(1);

        this.energyLevel = gameOptions.startingPlayerEnergy;

        this.energySprites = [];

        for (let i = 0; i < gameOptions.maximumPlayerEnergy; i++) {
            this.energySprites.push(scene.add.sprite(scene.game.config.width / 2 + 120 + i * 20, 50, "texture", "heart.png"));
        }
        this.updateEnergySprites();

        this.damaging = DamageStates.IDLE;
        this.damageTime = 0;

    }


    hit() {
        if (this.energyLevel > 0) {
            this.energyLevel--;
            this.updateEnergySprites();
            if (this.energyLevel == 0) {
                this.scene.gameOver();
            }
        }
    }

    updateEnergySprites() {
        for (let i = 0; i < this.energySprites.length; i++) {
            this.energySprites[i].visible = this.energyLevel > i;
        }
    }

    heal() {
        if (this.energyLevel < gameOptions.maximumPlayerEnergy) {
            this.energyLevel++;
            this.updateEnergySprites();
        }
    }

    handleDamage(enemy) {
        if (this.damaging === DamageStates.IDLE) {
            this.damaging = DamageStates.DAMAGE;
            const dx = this.x - enemy.x;
            const dy = this.y - enemy.y;
            const dir = new Phaser.Math.Vector2(dx, dy).normalize().scale(300);

            this.setVelocity(dir.x, dir.y);
            
            this.damageTime = 0;

            this.setTint(0xff0000);

            this.hit();
        }
    }

    preUpdate(time, deltaTime) {
        super.preUpdate(time, deltaTime);

        switch (this.damaging) {
            case DamageStates.DAMAGE:
                this.damageTime += deltaTime;
                if (this.damageTime > 250) {
                    this.setTint(0xffffff);
                    this.damaging = DamageStates.IDLE;
                    this.damageTime = 0;
                }
                break;
        }
    }

    move({ keys }) {
        if (this.damaging === DamageStates.IDLE) {
            this.setVelocity(0);

            if (keys.d.isDown) {
                this.setVelocityX(gameOptions.issacSpeedX);
            }

            if (keys.a.isDown) {
                this.setVelocityX(-gameOptions.issacSpeedX);
            }

            if (keys.s.isDown) {
                this.setVelocityY(gameOptions.issacSpeedY);
            }

            if (keys.w.isDown) {
                this.setVelocityY(-gameOptions.issacSpeedY);
            }
        }

    }



}