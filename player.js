class Player {

    constructor(scene) {
        this.energyLevel = 6;

        this.energySprites = [];

        for (let i = 0; i < this.energyLevel; i++) {
            console.log("assas");
            this.energySprites.push(scene.add.sprite(scene.game.config.width / 2 + 120 + i * 20, 50, "heart"));
        }
    }

    hit() {
        this.energyLevel--;
        this.updateEnergySprites();
    }

    updateEnergySprites() {
        for (let i = 0; i < this.energySprites.length; i++) {
            this.energySprites[i].visible = this.energyLevel > i;
        }
    }

    heal() {
        this.energyLevel ++;
        this.updateEnergySprites();
    }




}