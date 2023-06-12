class TransitionScreen extends Phaser.Scene{
    constructor(){
        super('transitionScreen');
    }
    preload() {
        this.load.path = '../assets/'
        this.load.image('player', 'player.png')
        this.load.image('space', 'Spacebackground.png');
        this.load.image('enemy', 'enemy.png')
        this.load.image('planet1', 'planet1.png')
        this.load.image('planet2','planet2.png')

        //explosion gif
        this.load.image('megumin1', 'megumin/megumin1.png')
        this.load.image('megumin2', 'megumin/megumin2.png')
        this.load.image('megumin3', 'megumin/megumin3.png')
        this.load.image('megumin4', 'megumin/megumin4.png')
        this.load.image('megumin5', 'megumin/megumin5.png')
        this.load.image('megumin6', 'megumin/megumin6.png')
        this.load.image('megumin7', 'megumin/megumin7.png')
    }
    init (data) {
        this.enemiesdestroyed = data.enemiesdestroyed
    }
    create() {
        //parallax effect: 2 backgrounds scroll sideways after each other
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars2 = this.add.image(game.config.width*1.5, game.config.height*.5, 'space')

        //planet logic
        //let planet = this.add.rectangle(game.config.width*1.2, game.config.height*.5, 250, 250, 0xff0000)
        //let planet2 = this.add.rectangle(game.config.width*1.2, game.config.height*.5, 250, 250, 0xfcba03)
        let planet = this.add.image(game.config.width*1.2, game.config.height*.5, 'planet1')
        let planet2 = this.add.image(game.config.width*1.2, game.config.height*.5, 'planet2')

        let planettween = this.tweens.add({
            targets: planet,
            x: -1000,
            loop: -1,
            duration: 3000,
            delay: Math.floor(Math.random()*500),
            onLoop: () => {
                planet.y = Math.floor(Math.random()*game.config.height*.4 + game.config.height*.7)
            }
        });

        let planettween2 = this.tweens.add({
            targets: planet2,
            x: -1000,
            loop: -1,
            duration: 3000,
            delay: Math.floor(Math.random()*500+1000),
            onLoop: () => {
                planet2.y = Math.floor(Math.random()*game.config.height*.4 + game.config.height*.7)
            }
        });

        //top background
        this.add.rectangle(game.config.width*.5, game.config.height*.3, 1080, 1500, 0x000000)

        //player
        let player = this.add.image(game.config.width*.5, game.config.height*.8, 'player')
        player.angle = 90;

        //player spaceship bobbing
        let chain = this.tweens.chain({
            targets: player,
            tweens: [
                {
                    x: player.x + 50,
                    duration: 3000,
                    delay: 500,
                    ease: 'sine'
                },
                {
                    x: player.x - 50,
                    duration: 3000,
                    delay: 500,
                    ease: 'sine'
                }, 
            ],
            loop: -1,
            })

        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "You passed!", {font: "80px Verdana"}).setOrigin(0.5);


        //animate title
        this.tweens.add({
            targets: [title],
            scale: 1.1,
            yoyo: true,
            repeat: -1
        });

        //explosion animation
        this.anims.create({
            key: 'megumin',
            frames: [
                {key: 'megumin2'}, {key: 'megumin3'}, {key: 'megumin4'}, {key: 'megumin5'}, {key: 'megumin6'}, {key: 'megumin7', duration: 50},
            ] ,
            frameRate: 8,
        })

        //level results
        //displays enemies, then periodially shows an explosion
        //after that, shows # of enemies destroyed and counts up the score

        //score to be updated
        let score = this.enemiesdestroyed * 500;
        let counter =0

        //text
        let scoretext = this.add.text(game.config.width*.5,game.config.height*.6, "Score: 0", {font: "80px Verdana"}).setOrigin(0.5);

        //fancy animation
        let broforce = this.time.addEvent({delay: 400, loop: true, callback: () => {
            let enemy = this.add.image(game.config.width*.08+counter%1000, game.config.height*.2+Math.floor(counter/1000)*100, 'enemy').setScale(.4)

            //explosion effect
            let explosion = this.add.sprite(game.config.width*.08+counter%1000, game.config.height*.2+Math.floor(counter/1000)*100,'megumin1')
            .play('megumin')
            this.time.addEvent({delay: 400, loop: true, callback: () => {explosion.destroy()}})

            //exit if amount of enemies is reached
            if (counter == this.enemiesdestroyed*100) {
                broforce.remove()


                this.time.addEvent({delay: 400, loop: false, callback: () => {
                    let killcounttext = this.add.text(game.config.width*.5,game.config.height*.5, `${this.enemiesdestroyed} enemies destroyed`, {font: "80px Verdana"}).setOrigin(0.5);

                    //updates score
                    this.tweens.addCounter({
                        from: 0,
                        to: score,
                        duration: 1500,
                        onUpdate: tween =>
                        {
                            let value = Math.round(tween.getValue());
                            scoretext.setText(`Score: ${value}`);
                        },
                        onComplete:()=> {
                            this.add.text(game.config.width*.5,game.config.height*.65, "click to continue",{font: "40px Verdana"}).setOrigin(.5)


                        }
                    })

                }})
            }

            counter +=100
        }})

        this.add.text(game.config.width*.5, game.config.height*.9, "transitionScreen", {font: "40px Arial"}).setOrigin(0.5);

        //click to animate ship and transition to next scene
        this.input.once('pointerdown', () => {
            this.tweens.add({
                targets: player,
                x: 1500,
                duration: 1000,
                onComplete:()=>{
                    player.destroy()
                    this.scene.start('demo');
                }
            })
        });

    }
    update() {
        //background scroll
        if (this.stars.x <= game.config.width*-.5)
        {
            this.stars.x = game.config.width*1.5
        }
        this.stars.x -= .5;
        //this.stars.y %= 1920;
        if (this.stars2.x <= game.config.width*-.5)
        {
            this.stars2.x = game.config.width*1.5
        }
        this.stars2.x -= .5;
        //this.stars2.y %= 1920;
    }
}