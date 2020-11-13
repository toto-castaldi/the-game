const gameOptions = {
    issaSpeedX : 10,
    issaSpeedY : 10
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    width: 800,
    height: 800,
    scene: [Commands],
    parent : "the-game"
});