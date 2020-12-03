class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, "texture",  "red_slime/idle/red_slime-idle-0.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.body.onWorldBounds = true;

        this.setDepth(1);

        let frameNames = scene.anims.generateFrameNames('texture', {
            start: 0, end: 4,
            prefix: 'red_slime/idle/red_slime-idle-', suffix: '.png'
        });

        scene.anims.create({ key: 'idle', frames: frameNames, frameRate: 5, repeat: -1 });
        this.anims.play('idle');
    }


}