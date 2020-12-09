class BlueSlime extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, "texture",  "blue-slime/walk-left/blue-slime-walk-left-0.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setCollideWorldBounds(true);

        this.setDepth(1);

        scene.anims.create({ 
            key: 'walk-left', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 24,
                prefix: 'blue-slime/walk-left/blue-slime-walk-left-', 
                suffix: '.png'
            }), 
            frameRate: 25, 
            repeat: -1 
        });
        scene.anims.create({ 
            key: 'walk-rigth', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 24,
                prefix: 'blue-slime/walk-rigth/blue-slime-walk-rigth-', 
                suffix: '.png'
            }), 
            frameRate: 25, 
            repeat: -1 
        });
        scene.anims.create({ 
            key: 'walk-down', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 23,
                prefix: 'blue-slime/walk-down/blue-slime-walk-down-', 
                suffix: '.png'
            }), 
            frameRate: 25, 
            repeat: -1 
        });
        scene.anims.create({ 
            key: 'walk-up', 
            frames: scene.anims.generateFrameNames('texture', {
                start: 0, 
                end: 23,
                prefix: 'blue-slime/walk-up/blue-slime-walk-up-', 
                suffix: '.png'
            }), 
            frameRate: 25, 
            repeat: -1 
        });


        this.anims.play('walk-down');

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
                this.anims.play('walk-left', true);
                this.setVelocity(-100,0);
                break;
            case Directions.RIGHT:
                this.anims.play('walk-rigth', true);
                this.setVelocity(+100,0);
                break;
            case Directions.UP:
                this.anims.play('walk-up', true);
                this.setVelocity(0, -100);
                break;
            case Directions.DOWN:
                this.anims.play('walk-down', true);
                this.setVelocity(0,100);
                break;
        }

    }


}