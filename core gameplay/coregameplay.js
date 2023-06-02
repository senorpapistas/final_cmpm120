class Demo extends Phaser.Scene{
    constructor() {
        super('demo')
    }
    preload() {
        this.load.image('player', 'player.png');
        this.load.image('bullet', 'bullet.png');
    }
    create() {
        // temporary player character
        this.player = this.physics.add.sprite(540, 960, 'player');
        
        // temporary object used to show sides of screen
        this.physics.add.existing(new Phaser.GameObjects.Rectangle(this, 540, 960, 10, 1920)).body.allowGravity = false;
    }
    update(time, delta) {
        // if mouse is clicked or screen is pressed on either side of middle line, ship jumps in the direction of that side
        this.input.on('pointerdown', (pointer) => {
            if (pointer.x > 540) {
                this.player.setVelocityX(400);
                this.player.setVelocityY(-500);
            }
            if (pointer.x < 540) {
                this.player.setVelocityX(-400);
                this.player.setVelocityY(-500);
            }
        });
        // following block of code used to settle the ship to 0 x_gravity faster
        let velx = this.player.body.velocity.x
        if (velx > 0) {
            velx -= 2.5;
            this.player.setVelocityX(velx);
        } else if (velx < 0) {
            velx += 2.5;
            this.player.setVelocityX(velx);
        }

        //restarts demo if player goes off screen
        if (this.player.y > 2000 || this.player.y < 0) {
            this.scene.start('demo');
        }

        if (this.player.x > 1200) {
            this.player.setX(-120);
        } else if (this.player.x < -120) {
            this.player.setX(1200);
        }
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 700
            }
        }
    },
    scene: [Demo],
    title: 'Core Gameplay Demo'
});