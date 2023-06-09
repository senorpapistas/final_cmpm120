class cutscene extends Phaser.Scene {
    constructor(){
        super('cutscene');
    }
    preload() {
        this.load.path = '../assets/'
        this.load.image('player', 'player.png');
        this.load.image('space', 'Spacebackground.png');
    }
    init (data) {
        this.playersprite = data.playersprite
    }
    create() {
        this.click = 0;

        //parallax effect: 2 backgrounds scroll down after each other
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars2 = this.add.image(game.config.width*.5, game.config.height*1.5, 'space')

        //initial still background
        this.shadow = this.add.rectangle(game.config.width*.5, game.config.height*.5,1080,1920, 0x000000)
        this.background = this.add.image(game.config.width*.5, game.config.height*.5, 'space')

        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "Click to start", {font: "80px Verdana"}).setOrigin(0.5);

        //player
        let player = this.add.image(game.config.width*.5, game.config.height*.8, this.playersprite);
        
        //variable to turn on scrolling backgrounds
        this.scroll = 0;

        //fx
        const backfx = this.background.preFX.addVignette(0.5, 0.8, 0.2, 0.5);

        //activate fx on click
        this.input.once('pointerdown', () => {
            this.click = 1;

            //click again to skip animation
            this.input.once('pointerdown', () => {
                this.scene.start('titleScreen');
            });

            title.destroy()

            this.tweens.add({
                targets: [backfx],
                radius: 3,
                duration: 1000,
                //hold: 1000,
                onComplete:() => {
                    //destroy initial still background
                    this.shadow.destroy()
                    this.background.destroy()
                    
                    this.scroll = 1
                }
            });

            this.tweens.add({
                targets: [player],
                y: -500,
                duration: 5000, 
                delay: 2000,
                ease: 'Cubic'
            });

            this.timedEvent = this.time.delayedCall(6000, this.event, [], this);
        });


        this.add.text(game.config.width*.5, game.config.height*.9, "cutscene", {font: "40px Arial"}).setOrigin(0.5);

    }
    event() {
        this.scene.start('titleScreen', {playersprite: this.playersprite})
    }
    update() {
        //background scroll
        if(this.scroll == 1) {
            if (this.stars.y == game.config.height*1.5)
            {
                this.stars.y = game.config.height*-.5
            }
            this.stars.y += 5;
            //this.stars.y %= 1920;
            if (this.stars2.y == game.config.height*1.5)
            {
                this.stars2.y = game.config.height*-.5
            }
            this.stars2.y += 5;
            //this.stars2.y %= 1920;
        }
    }
}

class titleScreen extends Phaser.Scene{
    constructor(){
        super('titleScreen');
    }
    preload() {
        this.load.path = '../assets/'
        this.load.image('player', 'player.png');
        this.load.image('space', 'Spacebackground.png');
        
    }
    init (data) {
        this.playersprite = data.playersprite
    }
    create() {

        //parallax effect: 2 backgrounds scroll down after each other
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars2 = this.add.image(game.config.width*.5, game.config.height*1.5, 'space')
    
        //background (made of chunks, will disappear on Play)
        let t1 = this.add.triangle(0, 0, 0, 0, 0, 700, 1080, 0, 0x000000)
            .setOrigin(0,0)
        let t2 = this.add.triangle(game.config.width, game.config.height, 0, 0, 0, -200, -2000, 0, 0x000000)
            .setOrigin(0,0)
        let t3 = this.add.triangle(0, game.config.height*.5, 0, 0, 0, 500, 2500, 0, 0x000000)
            .setOrigin(0,0)
        let t4 = this.add.triangle(game.config.width, game.config.height*.5, 0, 0, 0, -300, -2500, 0, 0x000000)
            .setOrigin(0,0)

        //player
        let player = this.add.image(game.config.width*.5, game.config.height*.8, this.playersprite);


        //title
        let title = this.add.text(game.config.width*.5,game.config.height*-.1, "Title", {font: "80px Verdana"}).setOrigin(0.5);


        //title drop down
        this.tweens.add({
            targets: [title],
            y: game.config.height*.1,
            duration: 500,
            onComplete:()=>{
                anim.play();
            }
        });

        //play button
        let effect = this.add.rectangle(game.config.width *.5, game.config.height*.5, 1080, 50, 0xffffff)
            .setAlpha(0)
        let buttonback = this.add.rectangle(game.config.width *.5 + 20, game.config.height*.5 + 20, 500, 200, 0xffffff);
        let button = this.add.rectangle(game.config.width *.5, game.config.height*.5, 500, 200, 0x3c78d8).setInteractive();
        let buttontext = this.add.text(game.config.width*.5,game.config.height*.5, "Play", {font: "80px Verdana"}).setOrigin(0.5);

        //button breathing
        let anim = this.tweens.add({
            targets: [button],
            scale: 1.1,
            yoyo: true,
            repeat: -1
        });


        //play button effects
        //settings checks if settings menu is on
        let settings = 0;
        
            button.on('pointerover',()=>{
                if (settings == 0) {
                    anim.pause();
                    button.scale = 1.1
                    buttonback.scale = 1.1
                    buttontext.scale = 1.1
                    this.tweens.add({targets:effect, alpha: 1, duration: 500})
                }
            })
            .on('pointerout',()=> {
                button.scale = 1
                buttonback.scale = 1
                buttontext.scale = 1
                this.tweens.add({targets:effect, alpha: 0, duration: 500})
                anim.resume();
            })
            .on('pointerdown',()=>{
                if (settings == 0) {

                    //background disappears, spaceship leaves
                    this.tweens.add({targets:t1, x:-3000, duration: 700})
                    this.tweens.add({targets:t2, x:5000, duration: 500})
                    this.tweens.add({targets:t3, x: -5000, duration: 600})
                    this.tweens.add({targets:t4, x:5000, duration: 700,})

                    this.tweens.add({
                        targets: [player],
                        y: -500,
                        duration: 1000, 
                        ease: 'Cubic',
                        onComplete:() => {
                            this.scene.start('transitionScreen', {playersprite: this.playersprite})
                        }
                    });
                }
            })

        this.add.text(game.config.width*.5, game.config.height*.9, "titleScreen", {font: "40px Arial"}).setOrigin(0.5);

        //settings button
        let effect2 = this.add.rectangle(game.config.width *.5, game.config.height*.65, 1080, 50, 0xffffff)
            .setAlpha(0);
        let button2back = this.add.rectangle(game.config.width *.5 + 20, game.config.height*.65 + 20, 500, 200, 0xffffff);
        let button2 = this.add.rectangle(game.config.width *.5, game.config.height*.65, 500, 200, 0x3c78d8).setInteractive();
        let button2text = this.add.text(game.config.width*.5,game.config.height*.65, "Settings", {font: "80px Verdana"}).setOrigin(0.5);

        //settings button effects
            button2.on('pointerover',()=>{
                if (settings == 0) {
                button2.scale = 1.1
                button2back.scale = 1.1
                button2text.scale = 1.1
                this.tweens.add({targets:effect2, alpha: 1, duration: 500}) 
                }
            })
            .on('pointerout',()=> {
                button2.scale = 1
                button2back.scale = 1
                button2text.scale = 1
                this.tweens.add({targets:effect2, alpha: 0, duration: 500})
                anim.resume()
            })
            //opens settings menu
            .on('pointerdown',()=>{
                this.tweens.add({targets:effect2, alpha: 0, duration: 500})
                settings = 1
                settingsmenu.setAlpha(1)
            })
    

        //settings menu
        let rect = this.add.rectangle(game.config.width*.5,game.config.height*.5,1000,800,0x2843b8)
            .setOrigin(.5)
        let triangle = this.add.triangle(game.config.width*.5,game.config.height*.5 -300,0,0,1000,200,1000,0,0x3c78d8)
        let exit = this.add.triangle(game.config.width*.8 + 50,game.config.height*.2 + 250,0,0,0,100,75,50,0x3c0000).setInteractive()
        let fullscreenbutton = this.add.rectangle(game.config.width*.5,game.config.height*.45, 1000, 200, 0, 0x000000).setInteractive()
        let fullscreenbuttoneffect = this.add.rectangle(game.config.width*.5,game.config.height*.45, 1000, 200, 0x000000).setAlpha(0)
        let fullscreentext = this.add.text(game.config.width*.15,game.config.height*.425, "  fullscreen", {font: "80px Verdana"})
        let fullscreenimage = this.add.text(game.config.width*.08,game.config.height*.425, "📺", {font: "80px Verdana"}).setAlpha(0)

        let subtitlesbutton = this.add.rectangle(game.config.width*.5,game.config.height*.55, 1000, 200, 0, 0x000000).setInteractive()
        let subtitlesbuttoneffect = this.add.rectangle(game.config.width*.5,game.config.height*.55, 1000, 200, 0x000000).setAlpha(0)
        let subtitlestext = this.add.text(game.config.width*.15,game.config.height*.525, "  subtitles", {font: "80px Verdana"})
        let subtitlesimage = this.add.text(game.config.width*.08,game.config.height*.525, "🔤", {font: "80px Verdana"}).setAlpha(0)

        let musicbutton = this.add.rectangle(game.config.width*.5,game.config.height*.65, 1000, 200, 0, 0x000000).setInteractive()
        let musicbuttoneffect = this.add.rectangle(game.config.width*.5,game.config.height*.65, 1000, 200, 0x000000).setAlpha(0)
        let musictext = this.add.text(game.config.width*.15,game.config.height*.625, "  music", {font: "80px Verdana"})
        let musicimage = this.add.text(game.config.width*.08,game.config.height*.625, "🔊", {font: "80px Verdana"})

        let settingstitle = this.add.text(game.config.width*.15,game.config.height*.5 - 350, "Settings", {font: "80px Verdana"})
        let settingstitle2 = this.add.text(game.config.width*.15+10,game.config.height*.5 - 350+10, "Settings", {font: "80px Verdana", color: 0xffffff})

        
        let settingsmenu = this.add.container(0,10, [rect,triangle,exit,fullscreenbutton, subtitlesbutton, musicbutton, fullscreenbuttoneffect,subtitlesbuttoneffect, musicbuttoneffect,
                                                    fullscreenimage, subtitlesimage, musicimage, fullscreentext, subtitlestext, musictext, settingstitle2, settingstitle])
            .setAlpha(0)
        
        //
        //NEED GLOBAL VARIABLES FOR FULLSCREEN AND SUBTITLES
        //
        let subtitles = 0;
        let fullscreen = 0;
        let music = 1;

        //settings buttons
        fullscreenbutton.on('pointerover',()=>{
            fullscreenbuttoneffect.setAlpha(1)
        })
        fullscreenbutton.on('pointerout',()=>{
            fullscreenbuttoneffect.setAlpha(0)
        })
        fullscreenbutton.on('pointerdown',()=>{
            if (fullscreen == 0) {fullscreen = 1}
                else{fullscreen= 0}
            fullscreenimage.setAlpha(fullscreen)
            //
            //fullscreen code goes here
            //
        })

        subtitlesbutton.on('pointerover',()=>{
            subtitlesbuttoneffect.setAlpha(1)
        })
        subtitlesbutton.on('pointerout',()=>{
            subtitlesbuttoneffect.setAlpha(0)
        })
        subtitlesbutton.on('pointerdown',()=>{
            if (subtitles == 0) {subtitles = 1}
                else{subtitles= 0}
            subtitlesimage.setAlpha(subtitles)
            //
            //subtitles code goes here
            //
        })

        musicbutton.on('pointerover',()=>{
            musicbuttoneffect.setAlpha(1)
        })
        musicbutton.on('pointerout',()=>{
            musicbuttoneffect.setAlpha(0)
        })
        musicbutton.on('pointerdown',()=>{
            if (music == 0) {
                music = 1
                musicimage.setText('🔊')
                }
            else{
                music= 0
                musicimage.setText('🔈')
            }
            //
            //subtitles code goes here
            //
        })

        exit.on('pointerdown',()=>{
            settingsmenu.setAlpha(0)
            settings = 0
        })    


    }
    update() {
        //background scroll
            if (this.stars.y >= game.config.height*1.5)
            {
                this.stars.y = game.config.height*-.5
            }
            this.stars.y += 5;
            //this.stars.y %= 1920;
            if (this.stars2.y >= game.config.height*1.5)
            {
                this.stars2.y = game.config.height*-.5
            }
            this.stars2.y += 5;
            //this.stars2.y %= 1920;
    }
}

class transitionScreen extends Phaser.Scene{
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
        this.playersprite = data.playersprite
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
        let player = this.add.image(game.config.width*.5, game.config.height*.8, this.playersprite)
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

        //text
        let scoretext = this.add.text(game.config.width*.5,game.config.height*.6, "Score: 0", {font: "80px Verdana"}).setOrigin(0.5);
 
        //score to be updated
        let score = 3500;
        
        //amount of enemies destroyed
        let enemiesdestroyed = 20
        let counter =0

        let broforce = this.time.addEvent({delay: 400, loop: true, callback: () => {
            let enemy = this.add.image(game.config.width*.08+counter%1000, game.config.height*.2+Math.floor(counter/1000)*100, 'enemy').setScale(.4)

            //explosion effect
            let explosion = this.add.sprite(game.config.width*.08+counter%1000, game.config.height*.2+Math.floor(counter/1000)*100,'megumin1')
            .play('megumin')
            this.time.addEvent({delay: 400, loop: true, callback: () => {explosion.destroy()}})

            counter +=100

            //exit if amount of enemies is reached
            if (counter == enemiesdestroyed*100) {
                broforce.remove()


                this.time.addEvent({delay: 400, loop: false, callback: () => {
                    let killcounttext = this.add.text(game.config.width*.5,game.config.height*.5, `${enemiesdestroyed} enemies destroyed`, {font: "80px Verdana"}).setOrigin(0.5);

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
                    this.scene.start('victoryScreen');
                }
            })
        });

        let boss
        //let boss.x = 1000, boss.y = 1000
        this.add.rectangle(500,1000, 500,500, 0xff0000)

        //boss explosion effect
        this.time.addEvent({delay: 400, loop: true, callback: () => {
            let bossexplosionEffect = this.add.sprite(500 + (Math.random()*500 - 250), 1000 + (Math.random()*500 - 250),'megumin1').play('megumin').on('animationcomplete', () => {bossexplosionEffect.destroy()});
            //explosionsfx.play();
        }})


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
    
class victoryScreen extends Phaser.Scene{
    constructor(){
        super('victoryScreen');
    }
    preload(){
        this.load.path = '../assets/'
        this.load.image('player', 'player.png')
        this.load.image('space', 'Spacebackground.png');
        this.load.image('enemy', 'enemy.png')
        this.load.image('planet1', 'planet1.png')
        this.load.image('planet2','planet2.png')
    }
    create() {
        //background
        this.background = this.add.image(game.config.width*.5, game.config.height*.5, 'space')

        this.add.rectangle(game.config.width*.5, game.config.height*.5, 1080, 1000, 0x000000)

        this.add.image(game.config.width*.5, game.config.height*.9, 'planet2').setScale(5)

        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "You Win!", {font: "80px Verdana"}).setOrigin(0.5);

        //animate title
        this.tweens.add({
            targets: [title],
            scale: 1.1,
            yoyo: true,
            repeat: -1
        });


        //score to be updated
        this.score1 = 3500;
        this.score2 = 4500;
        this.score3 = 1;
        this.finalscore = this.score1+this.score2+this.score3;

        //score text        
        this.text1 = this.add.text(game.config.width*.15,game.config.height*.3, `Level 1 score: ${this.score1}`, {font: "80px Verdana"}) //.setOrigin(0.5)
            .setAlpha(0);
        this.text2 = this.add.text(game.config.width*.15,game.config.height*.4, `Level 2 Score: ${this.score2}`, {font: "80px Verdana"}) //.setOrigin(0.5)
            .setAlpha(0);
        this.text3 = this.add.text(game.config.width*.15,game.config.height*.5, `Level 3 Score: ${this.score3}`, {font: "80px Verdana"}) //.setOrigin(0.5)
            .setAlpha(0);
        this.text4 = this.add.text(game.config.width*.5,game.config.height*.6, "Total:  ", {font: "80px Verdana"}).setOrigin(0.5);


        //score text description
        let descriptionbackground = this.add.rectangle(game.config.width*.5,game.config.height*.8, 600, 200, 0x000000)
            .setAlpha(0)
        let description = this.add.text(game.config.width*.5,game.config.height*.8, "You're mid!", {font: "80px Verdana"}).setOrigin(0.5)
            .setAlpha(0);

        
        //score animation
        //
        //displays level scores, then displays final score with a final score description
        let chain = this.tweens.chain({
            tweens: [
                {
                    targets: this.text1,
                    alpha: 1
                },
                {
                    targets: this.text2,
                    alpha: 1
                },
                {
                    targets: this.text3,
                    alpha: 1,
                    
                    //final score counts up
                    onComplete:() => {
                        let updatescore = this.tweens.addCounter({
                            from: 0,
                            to: this.finalscore,
                            duration: 1500,
                            onUpdate: tween =>
                            {
                                let value = Math.round(tween.getValue());
                                this.text4.setText(`Total: ${value}`);
                            },

                            //score description pops up
                            onComplete:()=>{
                                this.tweens.add({
                                    targets: [description, descriptionbackground],
                                    alpha: 1,
                                    delay: 1000
                                })
                            }
                        })
                    }
                }
            ]
        })

        this.add.text(game.config.width*.5, game.config.height*.9, "victoryScreen", {font: "40px Arial"}).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('cutscene');
        });
    }
    update() {

    }
}

class selectScreen extends Phaser.Scene{
    constructor(){
        super('selectScreen');
    }
    preload(){
        this.load.path = '../assets/'
        this.load.image('player', 'player.png');
        this.load.image('player_og', 'player_og.png');
        this.load.image('space', 'Spacebackground.png');
    }
    create() {

        //background
        this.background = this.add.image(game.config.width*.5, game.config.height*.5, 'space')

        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "Choose your ship", {font: "80px Verdana"}).setOrigin(0.5);

        //animate title
        this.tweens.add({
            targets: [title],
            scale: 1.1,
            yoyo: true,
            repeat: -1
        });

        let box1 = this.add.isobox(game.config.width*.3, game.config.height*.7, 300, 200, 0x2bd62b, 0x1b961b, 0x14c714);
        let box2 = this.add.isobox(game.config.width*.7, game.config.height*.7, 300, 200, 0xd91630, 0xb3172c, 0xe80c29);

        let player_og = this.add.image(game.config.width*.7, game.config.height*.57, 'player_og').setInteractive()
        let player = this.add.image(game.config.width*.3, game.config.height*.57, 'player').setInteractive()

        player.on('pointerover', ()=> {
            box1.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)
        })
        player.on('pointerout', ()=> {
            box1.setFillStyle(0x2bd62b, 0x1b961b, 0x14c714)
        })
        player.on('pointerdown', ()=>{
            this.scene.start('cutscene', {playersprite: 'player'})
        })

        player_og.on('pointerover', ()=> {
            box2.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)
        })
        player_og.on('pointerout', ()=> {
            box2.setFillStyle(0xd91630, 0xb3172c, 0xe80c29)
        })
        player_og.on('pointerdown', ()=>{
            this.scene.start('cutscene', {playersprite: 'player_og'})
        })
    }
}


let config = {
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
    scene: [transitionScreen,selectScreen, victoryScreen, titleScreen,cutscene],
}

let game = new Phaser.Game(config);