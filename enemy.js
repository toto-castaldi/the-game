class Enemy extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, "texture",  "red_slime/idle/red_slime-idle-0.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.setDepth(1);

        let frameNames = scene.anims.generateFrameNames('texture', {
            start: 0, end: 4,
            prefix: 'red_slime/idle/red_slime-idle-', suffix: '.png'
        });

        scene.anims.create({ key: 'idle', frames: frameNames, frameRate: 5, repeat: -1 });
        this.anims.play('idle');

        this.direction = new Direction(Direction.LEFT);

        this.setVelocityOnDirection();
        
        this.timeMoveEvent = scene.time.addEvent({
            delay : 2000,
            callback : () => {
                this.changeDirection();
            },
            loop : true
        });
    }

    destroy(fromScene) {
        this.timeMoveEvent.destroy();

        super.destroy(fromScene);
    }

    changeDirection () {
        this.direction = this.direction.randomChange();
        this.setVelocityOnDirection();
    }

    setVelocityOnDirection() {
        switch (this.direction.dir) {
            case Direction.LEFT:
                this.setVelocity(-100,0);
                break;
            case Direction.RIGHT:
                this.setVelocity(+100,0);
                break;
            case Direction.UP:
                this.setVelocity(0, -100);
                break;
            case Direction.DOWN:
                this.setVelocity(0,100);
                break;
        }

    }


}