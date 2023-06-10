class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }
    init(data) {
        this.bgm = data.bgm;
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
        console.log(this.game.config.bgmMuted)
        this.bgm = this.sound.add('bgm');
        this.bgm.loop = true;
        this.bgm.play();
        this.bgm.pauseOnBlur = true;

        // game config data
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        
        // button that pauses the scene and opens a pause menu
        let pauseButton = this.add.text(this.game.config.width*0.03, this.game.config.height*0.02, "⏸️")
            .setStyle({fontSize: `${7 * this.game.config.width * 0.01}px`, color: '#ff0000'})
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                this.scene.launch('pause', {bgm: this.bgm});
                this.scene.pause(this);
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
            this.input.disable(this);
            this.time.delayedCall(300, () => {this.input.enable(this)});
            if (pointer.x > 540) {
                this.player.setVelocityX(400);
                this.player.setVelocityY(-500);
            }
            if (pointer.x < 540) {
                this.player.setVelocityX(-400);
                this.player.setVelocityY(-500);
            }
            let boosttext = this.add.text(440, 1800, '(whoosh)', {fontSize: '40px'});
            this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})})
        });

        // creating an enemy group and spawning 1 in
        let testEnemy = this.add.existing(new Enemies(this.physics.world, this, {name: 'testEnemy'}));
        testEnemy.createMultiple({key: 'enemy', quantity: 3});
        this.time.addEvent({delay: 1000, loop: true, callback: () => {
            testEnemy.spawn(Phaser.Math.RND.between(200, 900), -200, 0, 500, .5);
        }});
        //console.log(testEnemy);
        
        // checks if enemy is hit by bullet
        this.physics.add.overlap(testEnemy, this.playerBullets, (enemy, bullet) => {
            console.log('wow');
            bullet.disableBody(true, true);
            enemy.enemyKilled();
        });

        // checks if player touches enemy
        this.physics.add.overlap(testEnemy, this.player, (enemy, player) => {
            this.game.sound.stopAll();
            this.scene.start('death');
        });

        // checks if object hits world bounds
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
        if (this.player.y > 2000) {
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