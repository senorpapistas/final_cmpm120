class Level1 extends Phaser.Scene {
    constructor() {
        super('level1');
    }
    init(data) {
        this.bgm = data.bgm;
        this.playersprite = data.playersprite;
    }
    /*preload() {
        this.load.path = './assets/';
        this.load.image('player', 'player.png');
        this.load.image('enemy', 'enemy.png');
        this.load.image('enemy2', 'enemy2.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('space', 'Spacebackground.png');
        this.load.audio('boost', 'audio/boost.wav');
        this.load.audio('bgm', 'audio/creamy tomato.mp3');
    }*/
    create() {
        this.game.config.lvl1score = 0;

        // changed world bounds to allow enemies to spawn outside without being destroyed
        this.physics.world.setBounds(-200, -500, 1480, 2720);

        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars2 = this.add.image(game.config.width*.5, game.config.height*1.5, 'space')
        
        let scoreCounter = this.add.text(540, 100, '0', {font: '80px Verdana'}).setOrigin(0.5);

        // sounds
        this.booster = this.sound.add('boost');
        let explosionsfx = this.sound.add('explosionsfx');
        let deathSound = this.sound.add('death');
        //this.bgm = this.sound.add('bgm');
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
                pauseButton.setAlpha(0);
                this.scene.launch('pause', {bgm: this.bgm, pB: pauseButton});
                this.scene.pause(this);
            })

        // player character sprite
        this.player = this.physics.add.sprite(540, 960, this.playersprite[0]).setSize(150, 100).setScale(.9);
        
        // temporary rectangle used to visualize sides of the screen
        this.physics.add.existing(new Phaser.GameObjects.Rectangle(this, 540, 960, 10, 1920)).body.allowGravity = false;
        
        this.scene.launch('tutorial', {currScene: 'level1'});
        this.scene.pause(this);

        // makes the player ship automatically shoot bullets every .5 seconds
        this.playerBullets = this.add.existing(new Bullets(this.physics.world, this, {name: 'playerBullets'}));
        this.playerBullets.createMultiple({key: 'bullet', quantity: 10});
        /*this.playerFiring = this.time.addEvent({delay: 500, loop: true, callback: () => {
            this.playerBullets.fire(this.player.x, this.player.y - 50, 0, -500)
        }});*/
        // console.log(this.playerBullets)
        
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
            if (game.config.captions == true) {
                let boosttext = this.add.text(440, 1800, '(whoosh)', {fontSize: '40px'});
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
        });

        this.killCount = 0;

        // creating an enemy group and spawning 1 in
        let enemy1 = this.add.existing(new Enemies(this.physics.world, this, {name: 'enemy1'}));
        // testEnemy.create(0, 0, 'enemy');
        let enemy1Counter = 0;
        enemy1.createMultiple({key: this.playersprite[1], quantity: 4});
        let enemySpawn1 = this.time.addEvent({delay: 1000, loop: true, callback: () => {
            if(enemy1.spawn(Phaser.Math.RND.between(200, 900), -200, 0, 350, this.playersprite[4])) {enemy1Counter++}
            if(enemy1Counter == 20) {
                enemySpawn1.remove();
                console.log('wave cleared');
                /*this.time.delayedCall(2000, () => {
                    this.scene.start('transitionScreen', {enemiesdestroyed: kills})
                })*/
            }
        }});

        /*
        let testEnemy2 = this.add.existing(new Enemies(this.physics.world, this, {name: 'testEnemy2'}));
        testEnemy2.createMultiple({key: 'enemy2', quantity: 3})
        let enemySpawn2 = this.time.addEvent({delay: 1500, loop: true, callback: () => {
            let spawnCoeff = Phaser.Math.RND.between(200, 900);
            let x_move = Phaser.Math.RND.pick([-1, 1]);
            testEnemy2.spawn(spawnCoeff, -200, spawnCoeff * 0.2 * x_move, 350, .5);
        }})
        */

        // Dev button to test out level transitions
        this.w = this.game.config.width;
        this.h = this.game.config.height;
        this.s = this.game.config.width * 0.01;
        this.add.text(this.w*0.90, this.h*0.01, "DEV")
            .setStyle({fontSize: `${5 * this.s}px`, color: '#00ff00'})
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                //console.log(this.kills);
                this.scene.start('transitionScreen', {enemiesdestroyed: this.kills, playersprite: this.playersprite, nextLevel: 'level2', bgm: this.bgm})
            });

        this.kills = [];

        // checks if enemy1 is hit by bullet
        this.physics.add.overlap(this.playerBullets, enemy1, (bullet, enemy) => {
            this.kills.push(1);
            this.killCount++;
            let enemy1Points = this.add.text(enemy.x, enemy.y - 30, '500', {font: '50px Verdana'}).setOrigin(0.5);
            this.tweens.add({targets: enemy1Points, alpha: 0, y: enemy.y - 150, duration: 1000});
            this.tweens.addCounter({from: this.game.config.lvl1score, to: this.game.config.lvl1score + 500, duration: 1500, onUpdate: tween => {let value = Math.round(tween.getValue()); scoreCounter.setText(`${value}`)}});
            this.game.config.lvl1score += 500;
            let explosionEffect = this.add.sprite(enemy.x, enemy.y,'megumin1').play('megumin').on('animationcomplete', () => {explosionEffect.destroy()});
            this.time.addEvent({delay: 400, callback: () => {explosionEffect.destroy()}});
            explosionsfx.play();
            bullet.disableBody(true, true);
            enemy.enemyKilled();
        });

        /*
        this.physics.add.overlap(this.playerBullets, testEnemy2, (bullet, enemy) => {
            kills.push(2);
            killCount++;
            bullet.disableBody(true, true);
            enemy.enemyKilled();
        });
        */

        // checks if player touches enemy
        this.physics.add.overlap(this.player, enemy1 /*[testEnemy, testEnemy2]*/, (player, enemy) => {
            let explosionEffect = this.add.sprite(player.x, player.y,'megumin1').play('megumin').on('animationcomplete', () => {explosionEffect.destroy()});
            deathSound.play();
            player.setVelocityX(0).setVelocityY(0).body.allowGravity = false;
            this.time.delayedCall(1000, () => {
                this.game.sound.stopAll();
                this.scene.start('death', {level: 'level1'});
            });
        });
        // checks if object hits world bounds
        this.physics.world.on('worldbounds', (body) => {if (body.gameObject.onWorldBounds()) {this.killCount++};})
    }
    update(time, delta) {
        if (this.stars.y >= game.config.height*1.5) {this.stars.y = game.config.height*-.5}
        this.stars.y += 5;
        if (this.stars2.y >= game.config.height*1.5) {this.stars2.y = game.config.height*-.5}
        this.stars2.y += 5;
        
        if (this.killCount == 20) {
            this.time.delayedCall(2000, () => {
                this.scene.start('transitionScreen', {enemiesdestroyed: this.kills, playersprite: this.playersprite, nextLevel: 'level2', bgm: this.bgm})
            })
        }

        // movement for gamepad
        const pads = this.input.gamepad.gamepads;
        for (let i = 0; i < pads.length; i++)
        {
            const gamepad = pads[i];
            if (!gamepad) {continue;}
            if (gamepad.right || gamepad.B || gamepad.R1) {
                this.booster.play();
                this.player.setVelocityX(400);
                this.player.setVelocityY(-500);
            } else if (gamepad.left || gamepad.A || gamepad.L1) {
                this.player.setVelocityX(-400);
                this.player.setVelocityY(-500);
            }
        }

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