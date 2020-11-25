//getRandomInt(3) 0,1,2
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const gameOptions = {
    issacSpeedX: 5,
    issacSpeedY: 5,
    bulletSpeedX: 8,
    bulletSpeedY: 8,
    bulletCount: 3,
    minMillisTimeDeltaFire: 500
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    //backgroundColor: 0x000000,
    width: 800,
    height: 600,
    scene: [CommandsScene],
    parent: "the-game"
});