class cutscene extends Phaser.Scene {
    constructor(){
        super('cutscene');
    }
    preload() {
        this.load.path = '../assets/'
        this.load.image('player', 'player.png');
        this.load.image('space', 'space.jpg');
    }
    create() {
        this.click = 0;

        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "Click to start", {font: "80px Verdana"}).setOrigin(0.5);

        //parallax effect: 2 backgrounds scroll down after each other
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars.angle = 90
        this.stars.scale = 2

        this.stars2 = this.add.image(game.config.width*.5, game.config.height*1.5, 'space')
        this.stars2.angle = 90
        this.stars2.scale = 2


        //initial still background
        this.shadow = this.add.rectangle(game.config.width*.5, game.config.height*.5,1080,1920, 0x000000)
        this.background = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.background.angle = 90
        this.background.scale = 2

        //player
        let player = this.add.image(game.config.width*.5, game.config.height*.8, 'player');
        
    

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
        this.scene.start('titleScreen');
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
        this.load.image('space', 'space.jpg');
    }
    create() {

        //parallax effect: 2 backgrounds scroll down after each other
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars.angle = 90
        this.stars.scale = 2

        this.stars2 = this.add.image(game.config.width*.5, game.config.height*1.5, 'space')
        this.stars2.angle = 90
        this.stars2.scale = 2

    
        //background (made of chunks, will disappear on Play)
        let t1 = this.add.triangle(0, 0, 0, 0, 0, 700, 1080, 0, 0x000000)
            .setOrigin(0,0)
        let t2 = this.add.triangle(game.config.width, game.config.height, 0, 0, 0, -200, -2000, 0, 0x000000)
            .setOrigin(0,0)
        let t3 = this.add.triangle(0, game.config.height*.5, 0, 0, 0, 500, 2500, 0, 0x000000)
            .setOrigin(0,0)
        let t4 = this.add.triangle(game.config.width, game.config.height*.5, 0, 0, 0, -300, -2500, 0, 0x000000)
            .setOrigin(0,0)
 

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
        let anim = this.tweens.add({    //button breathing
            targets: [button],
            scale: 1.1,
            yoyo: true,
            repeat: -1
        });

        //button effects
        button.on('pointerover',()=>{
            anim.pause();
            button.scale = 1.1
            buttonback.scale = 1.1
            buttontext.scale = 1.1
            this.tweens.add({targets:effect, alpha: 1, duration: 500})
        })
        .on('pointerout',()=> {
            button.scale = 1
            buttonback.scale = 1
            buttontext.scale = 1
            this.tweens.add({targets:effect, alpha: 0, duration: 500})
            anim.resume();
        })
        .on('pointerdown',()=>{
            this.tweens.add({targets:t1, x:-1000, duration: 1000})
            this.tweens.add({targets:t2, x:5000, duration: 500})
            this.tweens.add({targets:t3, x: -5000, duration: 600})
            this.tweens.add({targets:t4, x:5000, duration: 1000,
                onComplete:() => {
                    
                    this.scene.start('transitionScreen');
                }})
            /*this.tweens.chain({
                tweens: [
                    {
                        targets: t1,
                        x: -1000,
                        duration: 1000
                    },
                    {
                        targets: t2,
                        x: 5000,
                        duration: 500
                    },
                    {
                        targets: t3,
                        x: -5000,
                        duration: 600
                    },
                    {
                        targets: t4,
                        x: 5000,
                        duration: 1000,

                        onComplete:() => {
                            this.scene.start('transitionScreen');
                        }
                    },
                
                ]})
                */
        })

        //player
        let player = this.add.image(game.config.width*.5, game.config.height*.8, 'player');

        this.add.text(game.config.width*.5, game.config.height*.9, "titleScreen", {font: "40px Arial"}).setOrigin(0.5);

        //settings button
        let effect2 = this.add.rectangle(game.config.width *.5, game.config.height*.65, 1080, 50, 0xffffff)
            .setAlpha(0);
        let button2back = this.add.rectangle(game.config.width *.5 + 20, game.config.height*.65 + 20, 500, 200, 0xffffff);
        let button2 = this.add.rectangle(game.config.width *.5, game.config.height*.65, 500, 200, 0x3c78d8).setInteractive();
        let button2text = this.add.text(game.config.width*.5,game.config.height*.65, "Settings", {font: "80px Verdana"}).setOrigin(0.5);

        //button effects
        button2.on('pointerover',()=>{
            //anim.pause();
            button2.scale = 1.1
            button2back.scale = 1.1
            button2text.scale = 1.1
            this.tweens.add({targets:effect2, alpha: 1, duration: 500})
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
            settingsmenu.setAlpha(1)
        })
    

        //settings menu
        let rect = this.add.rectangle(200,1100,1000,500,0x2843b8)
            .setOrigin(0)
        let triangle = this.add.triangle(200,1100,0,0,1000,200,1000,0,0xffffff)
            .setOrigin(0)
        let exit = this.add.rectangle(1000,1175, 50, 50, 0x3c0000).setInteractive()

        let settingsmenu = this.add.container(0,0, [rect,triangle,exit])
            .setAlpha(0)

        exit.on('pointerdown',()=>{settingsmenu.setAlpha(0)})    



    }
    update() {
        //background scroll
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

class transitionScreen extends Phaser.Scene{
    constructor(){
        super('transitionScreen');
    }
    preload() {
        this.load.path = '../assets/'
        this.load.image('player', 'player.png');
        this.load.image('space', 'space.jpg');
    }
    create() {
        //parallax effect: 2 backgrounds scroll sideways after each other
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars.angle = 90
        this.stars.scale = 2

        this.stars2 = this.add.image(game.config.width*1.5, game.config.height*.5, 'space')
        this.stars2.angle = 90
        this.stars2.scale = 2

        //planet logic
        let planet = this.add.rectangle(game.config.width*1.2, game.config.height*.5, 250, 250, 0xff0000)
        let planet2 = this.add.rectangle(game.config.width*1.2, game.config.height*.5, 250, 250, 0xfcba03)
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

        //text
        let text = this.add.text(game.config.width*.5,game.config.height*.5, "Score: 0", {font: "80px Verdana"}).setOrigin(0.5);

        //score to be updated
        let score = 3500;

        //updates score
        let updatescore = this.tweens.addCounter({
            from: 0,
            to: score,
            duration: 1500,
            onUpdate: tween =>
            {
                let value = Math.round(tween.getValue());
                text.setText(`Score: ${value}`);
            }
        })


        this.add.text(game.config.width*.5, game.config.height*.9, "transitionScreen", {font: "40px Arial"}).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('victoryScreen');
        });
    }
    update() {
        //background scroll
        if (this.stars.x == game.config.width*-.5)
        {
            this.stars.x = game.config.width*1.5
        }
        this.stars.x -= .5;
        //this.stars.y %= 1920;
        if (this.stars2.x == game.config.width*-.5)
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
    create() {
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
        this.text1 = this.add.text(game.config.width*.5,game.config.height*.3, `Score: ${this.score1}`, {font: "80px Verdana"}).setOrigin(0.5)
            .setAlpha(0);
        this.text2 = this.add.text(game.config.width*.5,game.config.height*.4, `Score: ${this.score2}`, {font: "80px Verdana"}).setOrigin(0.5)
            .setAlpha(0);
        this.text3 = this.add.text(game.config.width*.5,game.config.height*.5, `Score: ${this.score3}`, {font: "80px Verdana"}).setOrigin(0.5)
            .setAlpha(0);
        this.text4 = this.add.text(game.config.width*.5,game.config.height*.6, "Total:  ", {font: "80px Verdana"}).setOrigin(0.5);


        //score text description
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
                    
                    //final score counts upt
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
                                    targets: description,
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
    scene: [titleScreen,transitionScreen, cutscene, victoryScreen],
}

let game = new Phaser.Game(config);