const gameOptions = {
    issaSpeedX : 5,
    issaSpeedY : 5,
    bulletSpeedX : 10,
    bulletSpeedY : 10,
    bulletCount : 10,
    minMillisTimeDeltaFire : 200
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    width: 800,
    height: 600,
    scene: [Commands],
    parent : "the-game"
});