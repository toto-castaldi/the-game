class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, "texture", "isaac/walk-down/issac-PAUL-0.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.displayWidth = 80;
        this.displayHeight = 80;
        this.setBodySize(10, 10, true).setOffset(10, 15);

        this.setDepth(1);

        this.energyLevel = gameOptions.startingPlayerEnergy;

        this.energySprites = [];

        for (let i = 0; i < gameOptions.maximumPlayerEnergy; i++) {
            this.energySprites.push(scene.add.sprite(scene.game.config.width / 2 + 120 + i * 20, 50, "texture", "heart.png"));
        }
        this.updateEnergySprites();

        this.damaging = DamageStates.IDLE;
        this.damageTime = 0;

        scene.anims.create({ 
            key: 'isaac-walk-down', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 1,
                prefix: 'isaac/walk-down/issac-PAUL-', 
                suffix: '.png'
            }), 
            frameRate: 5, 
            repeat: -1 
        });
        scene.anims.create({ 
            key: 'isaac-walk-up', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 1,
                prefix: 'isaac/walk-up/issac-PAUL-', 
                suffix: '.png'
            }), 
            frameRate: 5, 
            repeat: -1 
        });
        scene.anims.create({ 
            key: 'isaac-walk-left', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 1,
                prefix: 'isaac/walk-left/issac-PAUL-', 
                suffix: '.png'
            }), 
            frameRate: 5, 
            repeat: -1 
        });
        scene.anims.create({ 
            key: 'isaac-walk-right', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 1,
                prefix: 'isaac/walk-right/issac-PAUL-', 
                suffix: '.png'
            }), 
            frameRate: 5, 
            repeat: -1 
        });

        this.anims.play('isaac-walk-down');

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
                this.anims.play('isaac-walk-right', true);
                this.setVelocityX(gameOptions.issacSpeedX);
            }

            if (keys.a.isDown) {
                this.anims.play('isaac-walk-left', true);
                this.setVelocityX(-gameOptions.issacSpeedX);
            }

            if (keys.s.isDown) {
                this.anims.play('isaac-walk-down', true);
                this.setVelocityY(gameOptions.issacSpeedY);
            }

            if (keys.w.isDown) {
                this.anims.play('isaac-walk-up', true);
                this.setVelocityY(-gameOptions.issacSpeedY);
            }
        }

    }



}