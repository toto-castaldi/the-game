class Player extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, "isaac");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.body.onWorldBounds = true;

        this.setBodySize(200, 200, true).setOffset(90, 300);
        

        this.displayWidth = scene.game.config.width * 0.065;
        this.displayHeight = scene.game.config.height * 0.1;
        this.setDepth(1);

        this.energyLevel = gameOptions.startingPlayerEnergy;

        this.energySprites = [];

        for (let i = 0; i < gameOptions.maximumPlayerEnergy; i++) {
            this.energySprites.push(scene.add.sprite(scene.game.config.width / 2 + 120 + i * 20, 50, "heart"));
        }
        this.updateEnergySprites();
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




}