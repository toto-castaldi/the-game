class GreenSlime extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, player) {
        super(scene, x, y, "texture", "green-slime/walk/green-slime-walk-1.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBodySize(200, 200, true);
        this.displayWidth = 50;
        this.displayHeight = 50;


        this.setCollideWorldBounds(true);

        this.setDepth(1);

        scene.anims.create({
            key: 'green-slime-walk',
            frames: scene.anims.generateFrameNames('texture', {
                start: 0,
                end: 9,
                prefix: 'green-slime/walk/green-slime-walk-',
                suffix: '.png'
            }),
            frameRate: 8,
            repeat: -1
        });

        this.anims.play('green-slime-walk');

        this.scene = scene;

        this.player = player;

    }

    preUpdate(time, delta) {
        this.scene.physics.moveToObject(this, this.player, 150);

        super.preUpdate(time, delta);
    }

    changeDirection() {

    }

}