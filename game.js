//getRandomInt(3) 0,1,2
const getRandomInt = (max) => {
    return Math.floor(Math.random() * Math.floor(max));
}

const gameOptions = {
    issacSpeedX: 300,
    issacSpeedY: 300,
    bulletSpeedX: 400,
    bulletSpeedY: 400,
    bulletCount: 3,
    minMillisTimeDeltaFire: 500,
    maximumPlayerEnergy : 6,
    startingPlayerEnergy : 4,
    debug : false
}

const game = new Phaser.Game({
    type: Phaser.AUTO,
    backgroundColor: 0x000000,
    width: 800,
    height: 600,
    scene: [Loader, Scene],
    parent: "the-game",
    physics: {
        default: "arcade",
        arcade: {
            debug: gameOptions.debug
        }
    }
});