class Worm extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, "texture",  "enemy/sworm/walk-right/worm-walk-right-0.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBodySize(54, 25, true);

        this.setCollideWorldBounds(true);

        this.setDepth(1);

        scene.anims.create({ 
            key: 'enemy-worm-walk-right', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 8,
                prefix: 'enemy/sworm/walk-right/worm-walk-right-', 
                suffix: '.png'
            }), 
            frameRate: 2, 
            repeat: -1 
        });


        this.anims.play('enemy-worm-walk-right');

        this.direction = Directions.LEFT;

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
        this.direction = Directions.randomChange(this.direction);
        this.setVelocityOnDirection();
    }

    setVelocityOnDirection() {
        switch (this.direction) {
            case Directions.LEFT:
                this.setVelocity(-100,0);
                break;
            case Directions.RIGHT:
                this.setVelocity(+100,0);
                break;
            case Directions.UP:
                this.setVelocity(0, -100);
                break;
            case Directions.DOWN:
                this.setVelocity(0,100);
                break;
        }

    }


}