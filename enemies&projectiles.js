// class that sets properties for bullets and contains fire function
class Bullet extends Phaser.Physics.Arcade.Image {
    fire(x, y, vx, vy) {
        this.enableBody(true, x, y, true, true);
        this.setVelocity(vx, vy);
    }
    onCreate() {
        this.disableBody(true, true);
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;
        this.body.allowGravity = false;
    }

    onWorldBounds() {
        this.disableBody(true, true);
    }
}

// constructor class for bullets group
class Bullets extends Phaser.Physics.Arcade.Group {
    constructor(world, scene, config) {
        super(world, scene, {...config, classType: Bullet, createCallback: Bullets.prototype.onCreate});
    }
    fire(x, y, vx, vy) {
        let bullet = this.getFirstDead(false);

        if(bullet) {
            bullet.fire(x, y, vx, vy);
        }
    }
    onCreate(bullet) {
        bullet.onCreate();
    }
}

class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor() {
        super('enemy')
    };
    create() {

    };
    update() {

    };
}