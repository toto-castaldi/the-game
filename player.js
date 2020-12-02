class Player {

    constructor(scene) {
        this.scene = scene;
        this.energyLevel = gameOptions.startingPlayerEnergy;

        this.energySprites = [];

        for (let i = 0; i < gameOptions.maximumPlayerEnergy; i++) {
            this.energySprites.push(this.scene.add.sprite(this.scene.game.config.width / 2 + 120 + i * 20, 50, "heart"));
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