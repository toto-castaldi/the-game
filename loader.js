class Loader extends Phaser.Scene {

    constructor() {
        super({
            key: "Loader"
        })

        this.playing = true;
    }

    preload() {
        this.load.image("isaac", "assets/isaac.png");
        this.load.image("bullet", "assets/bullet.png");
        this.load.image("heart", "assets/heart.png");
        this.load.image("game-over", "assets/game-over.png");

        //'tiles' è una chiava usata successivamente.
        this.load.image("tiles", "tiled/tiled.png");
        //'map' è una chiava usata successivamente. level-00.json è il file salvato da Tiled
        this.load.tilemapTiledJSON("map", "tiled/level-00.json");
    }

    create() {
        this.scene.start('Scene');   
    }
}