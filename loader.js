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
        //'map' è una chiava usata successivamente. level-00.json è il file salvato da Tiled
        this.load.tilemapTiledJSON("map", "assets/level-00.json");
    }

    create() {
        this.scene.start('Scene');   
    }
}