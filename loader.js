class Loader extends Phaser.Scene {

    constructor() {
        super({
            key: "Loader"
        })

        this.playing = true;
    }

    preload() {
        //tutte le texture gestite con TexturePacker
        this.load.multiatlas("texture", "assets/texture.json", "/assets");

        //'tiles' è una chiava usata successivamente.
        this.load.image("tiles", "assets/tiled.png");
        //'leve-00' è una chiava usata successivamente. level-00.json è il file salvato da Tiled
        this.load.tilemapTiledJSON("level-00", "assets/level-00.json");
        this.load.tilemapTiledJSON("level-01", "assets/level-01.json");
    }

    create() {
        this.scene.start('Level00');   
    }
}