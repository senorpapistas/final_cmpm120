// prefab that sets properties for bullets and contains fire function
class Bullet extends Phaser.Physics.Arcade.Image {
    fire(x, y, vx, vy) {
        this.enableBody(true, x, y, true, true);
        this.setVelocity(vx, vy);
    }
    onCreate() {
        this.disableBody(true, true);
        this.setScale(.3);
        this.setRotation(1.5);
        this.body.collideWorldBounds = true;
        this.body.onWorldBounds = true;
        this.body.allowGravity = false;
    }

    onWorldBounds() {
        this.disableBody(true, true);
    }
}

// prefab constructor class for bullets
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

class Demo extends Phaser.Scene{
    constructor() {
        super('demo')
    }
    preload() {
        this.load.image('player', 'player.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('space', 'deep-space.jpg');
        this.load.glsl('bundle', 'bundle4.glsl.js');
        this.load.audio('boost', 'boost.wav');
        this.load.audio('bgm', 'creamy tomato.mp3')
    }
    create() {
        // placeholder background shader, shifts the hue of the background constantly
        const shader = this.add.shader('Hue Shift', 540, 960, 1080, 1920,  [ 'space' ]);

        // button for muting bgm
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        let audiobutton = this.add.text(this.w*0.93, this.h*0.01, "🔊")
            .setStyle({fontSize: `${5 * this.s}px`})
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.bgm.mute) {
                    audiobutton.setText("🔊")
                    this.bgm.mute = false;
                } else {
                    audiobutton.setText("🔈")
                    this.bgm.mute = true;
                }
            });
        
        // temporary player character
        this.player = this.physics.add.sprite(540, 960, 'player');
        
        // temporary object used to show sides of screen
        this.physics.add.existing(new Phaser.GameObjects.Rectangle(this, 540, 960, 10, 1920)).body.allowGravity = false;

        // makes the player ship automatically shoot bullets every .5 seconds
        this.playerBullets = this.add.existing(new Bullets(this.physics.world, this, {name: 'playerBullets'}));
        this.playerBullets.createMultiple({key: 'bullet', quantity: 10});
        this.playerFiring = this.time.addEvent({delay: 500, loop: true, callback: () => {
            this.playerBullets.fire(this.player.x, this.player.y - 50, 0, -500)
        }});
        this.physics.world.on('worldbounds', (body) => {body.gameObject.onWorldBounds();})

        // sounds
        this.booster = this.sound.add('boost');
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();
        this.bgm.pauseOnBlur = true;

    }
    update(time, delta) {
        // if mouse is clicked or screen is pressed on either side of middle line, ship jumps in the direction of that side
        this.input.on('pointerdown', (pointer) => {
            this.booster.play();
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
        let velx = this.player.body.velocity.x;
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
    type: Phaser.WEBGL,
    scene: [Demo],
    title: 'Core Gameplay Demo'
});