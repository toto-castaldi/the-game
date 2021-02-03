class Main extends Phaser.Scene {

    constructor() {
        super({
            key: "Main"
        })
    }

    create() {
        this.add.image(this.game.config.width / 2, this.game.config.height / 2, "texture", "sfondinojpg.jpg");
        this.tastoGioca = this.add.sprite(this.game.config.width / 2, this.game.config.height / 2, "texture", "tasto-gioca.png").setInteractive();


        this.tastoGioca.on("pointerover", () => {
            this.tastoGioca.setTint(0xff0000);
        });

        this.tastoGioca.on("pointerout", () => {
            this.tastoGioca.clearTint();
        });

        this.tastoGioca.on("pointerdown", () => {
            this.scene.start('Level00');   
        });

    }
}