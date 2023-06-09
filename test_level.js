class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('player', 'player.png');
        this.load.image('enemy', 'enemy.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('space', 'space.jpg');
        this.load.audio('boost', 'boost.wav');
        this.load.audio('bgm', 'creamy tomato.mp3');
    }
    create() {
        // changed world bounds to allow enemies to spawn outside without being destroyed
        this.physics.world.setBounds(-200, -500, 1480, 2720);

        // sounds
        this.booster = this.sound.add('boost');
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();
        this.bgm.pauseOnBlur = true;

        // button for muting bgm
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        let audioButton = this.add.text(this.w*0.93, this.h*0.01, "🔊")
            .setStyle({fontSize: `${5 * this.s}px`})
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                // change this.game.sound.mute to this.bgm.mute to mute only the background music
                if (this.bgm.mute) {
                    audioButton.setText("🔊")
                    this.bgm.mute = false;
                } else {
                    audioButton.setText("🔈")
                    this.bgm.mute = true;
                }
            });
        
        // button for resetting level
        let resetButton = this.add.text(this.w*0.87, this.h*0.05, "RESET")
            .setStyle({fontSize: `${4 * this.s}px`, color: '#ff0000'})
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.game.sound.stopAll();
                this.scene.start('demo');
            });
        
        // player character sprite
        this.player = this.physics.add.sprite(540, 960, 'player');

        // temporary rectangle used to visualize sides of the screen
        this.physics.add.existing(new Phaser.GameObjects.Rectangle(this, 540, 960, 10, 1920)).body.allowGravity = false;
        
        // makes the player ship automatically shoot bullets every .5 seconds
        this.playerBullets = this.add.existing(new Bullets(this.physics.world, this, {name: 'playerBullets'}));
        this.playerBullets.createMultiple({key: 'bullet', quantity: 10});
        /*this.playerFiring = this.time.addEvent({delay: 500, loop: true, callback: () => {
            this.playerBullets.fire(this.player.x, this.player.y - 50, 0, -500)
        }});*/
        console.log(this.playerBullets)
    
        // jumping mechanic
        this.input.on('pointerdown', (pointer) => {
            this.booster.play();
            this.playerBullets.fire(this.player.x, this.player.y - 50, 0, -500);
            if (pointer.x > 540) {
                this.player.setVelocityX(400);
                this.player.setVelocityY(-500);
            }
            if (pointer.x < 540) {
                this.player.setVelocityX(-400);
                this.player.setVelocityY(-500);
            }
        });

        // creating an enemy group and spawning 1 in
        let testEnemy = this.add.existing(new Enemies(this.physics.world, this, {name: 'testEnemy'}));
        testEnemy.createMultiple({key: 'enemy', quantity: 3});
        this.time.addEvent({delay: 1000, loop: true, callback: () => {
            testEnemy.spawn(Phaser.Math.RND.between(200, 900), -200, 0, 500, .5);
        }});
        //console.log(testEnemy);
        
        this.physics.add.overlap(testEnemy, this.playerBullets, (enemy, bullet) => {
            console.log('wow');
            bullet.disableBody(true, true);
            enemy.enemyKilled();
        });

        this.physics.add.overlap(testEnemy, this.player, (enemy, player) => {
            this.scene.start('death');
        });

        // checking if object hits world bounds
        this.physics.world.on('worldbounds', (body) => {body.gameObject.onWorldBounds();})
    }
    update(time, delta) {
        // following block of code used to settle the ship to 0 x_gravity faster
        let velx = this.player.body.velocity.x;
        if (velx > 0) {
            velx -= 2.5;
            this.player.setVelocityX(velx);
        } else if (velx < 0) {
            velx += 2.5;
            this.player.setVelocityX(velx);
        }

        //resets position if player goes off screen
        if (this.player.y > 2000 || this.player.y < 0) {
            this.player.x = 540;
            this.player.y = 960;
            this.player.setVelocityY(0);
        }

        if (this.player.x > 1200) {
            this.player.setX(-120);
        } else if (this.player.x < -120) {
            this.player.setX(1200);
        }
    }
}