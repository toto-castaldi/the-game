class GreenSlime extends Phaser.Physics.Arcade.Sprite {

    constructor (scene, x, y)
    {
        super(scene, x, y, "texture",  "green-slime/walk/green-slime-walk-1.png");

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setBodySize(200, 200, true);//.setOffset(10, 15);
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