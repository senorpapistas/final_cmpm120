class cutscene extends Phaser.Scene {
    constructor(){
        super('cutscene');
    }
    /*preload() {
        this.load.path = './assets/'
        this.load.image('player', 'player.png');
        this.load.image('space', 'Spacebackground.png');
        
        this.load.audio('click', '/audio/click.mp3');
    }*/
    init (data) {
        this.playersprite = data.playersprite

        {
            this.cameras.main.fadeIn(100);
            const fxCamera = this.cameras.main.postFX.addPixelate(40);
            this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: -1,
            });
        }
    }
    create() {
        let sound = this.sound.add('click');

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
        let player = this.add.image(game.config.width*.5, game.config.height*.8, this.playersprite[0]);
        
        //variable to turn on scrolling backgrounds
        this.scroll = 0;

        //fx
        const backfx = this.background.preFX.addVignette(0.5, 0.8, 0.2, 0.5);

        //activate fx on click
        this.input.once('pointerdown', () => {
            sound.play()
            this.click = 1;

            //click again to skip animation
            this.input.once('pointerdown', () => {
                sound.play()
                this.scene.start('titleScreen', {playersprite: this.playersprite})
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

    }
    event() {
        this.scene.start('titleScreen', {playersprite: this.playersprite})
    }
    update() {
        //background scroll
        if(this.scroll == 1) {
            if (this.stars.y == game.config.height*1.5) {this.stars.y = game.config.height*-.5}
            this.stars.y += 5;
            if (this.stars2.y == game.config.height*1.5) {this.stars2.y = game.config.height*-.5}
            this.stars2.y += 5;
        }
    }
}

class titleScreen extends Phaser.Scene{
    constructor(){
        super('titleScreen');
    }
    /*preload() {
        this.load.path = './assets/'
        this.load.image('player', 'player.png');
        this.load.image('space', 'Spacebackground.png');
        
        this.load.audio('click', '/audio/click.mp3');
    }*/
    init(data) {
        this.bgm = data.bgm;
        this.playersprite = data.playersprite;

        {
            this.cameras.main.fadeIn(100);
            const fxCamera = this.cameras.main.postFX.addPixelate(40);
            this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: -1,
            });
        }
    }
    create() {
        
        let sound = this.sound.add('click');

        //music?
        this.bgm = this.sound.add('bgm');


        //parallax effect: 2 backgrounds scroll down after each other
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        this.stars2 = this.add.image(game.config.width*.5, game.config.height*1.5, 'space')
    
        //background (made of chunks, will disappear on Play)
        let t1 = this.add.triangle(0, 0, 0, 0, 0, 700, 1080, 0, 0x000000).setOrigin(0,0)
        let t2 = this.add.triangle(game.config.width, game.config.height, 0, 0, 0, -200, -2000, 0, 0x000000).setOrigin(0,0)
        let t3 = this.add.triangle(0, game.config.height*.5, 0, 0, 0, 500, 2500, 0, 0x000000).setOrigin(0,0)
        let t4 = this.add.triangle(game.config.width, game.config.height*.5, 0, 0, 0, -300, -2500, 0, 0x000000).setOrigin(0,0)

        //player
        let player = this.add.image(game.config.width*.5, game.config.height*.8, this.playersprite[0]);


        //title
        let title = this.add.text(game.config.width*.5,game.config.height*-.1, "GERMA", {font: "80px Verdana"}).setOrigin(0.5);


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
                    sound.play()
                    if (game.config.captions == true) {
                        let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                        this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                    }
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
                            //console.log(this.bgm.mute)
                            this.scene.start('level1', {playersprite: this.playersprite, bgm: this.bgm})
                        }
                    });
                }
            })

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
                sound.play()
                if (game.config.captions == true) {
                    let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                    this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                }
                this.tweens.add({targets:effect2, alpha: 0, duration: 500})
                settings = 1
                settingsmenu.setAlpha(1)
            })
    

        

        //settings menu
        let rect = this.add.rectangle(game.config.width*.5,game.config.height*.5,1000,800,0x2843b8)
        .setOrigin(.5)
        let triangle = this.add.triangle(game.config.width*.5,game.config.height*.5 -300,0,0,1000,200,1000,0,0x3c78d8)
        let exit = this.add.triangle(game.config.width*.8 + 100,game.config.height*.2 + 250,0,0,0,100,75,50,0x000000).setInteractive()
        let fullscreenbutton = this.add.rectangle(game.config.width*.5,game.config.height*.45, 1000, 200, 0, 0x000000).setInteractive()
        let fullscreenbuttoneffect = this.add.rectangle(game.config.width*.5,game.config.height*.45, 1000, 200, 0x000000).setAlpha(0)
        let fullscreentext = this.add.text(game.config.width*.15,game.config.height*.425, "  Fullscreen", {font: "80px Verdana"})
        let fullscreenimage = this.add.text(game.config.width*.08,game.config.height*.425, "📺", {font: "80px Verdana"})
        if (!this.scale.isFullscreen) {fullscreenimage.setAlpha(0)}

        let subtitlesbutton = this.add.rectangle(game.config.width*.5,game.config.height*.55, 1000, 200, 0, 0x000000).setInteractive()
        let subtitlesbuttoneffect = this.add.rectangle(game.config.width*.5,game.config.height*.55, 1000, 200, 0x000000).setAlpha(0)
        let subtitlestext = this.add.text(game.config.width*.15,game.config.height*.525, "  Subtitles", {font: "80px Verdana"})
        let subtitlesimage = this.add.text(game.config.width*.08,game.config.height*.525, "🔤", {font: "80px Verdana"})
        if (game.config.captions == false) {subtitlesimage.setAlpha(0)}

        let musicbutton = this.add.rectangle(game.config.width*.5,game.config.height*.65, 1000, 200, 0, 0x000000).setInteractive()
        let musicbuttoneffect = this.add.rectangle(game.config.width*.5,game.config.height*.65, 1000, 200, 0x000000).setAlpha(0)
        let musictext = this.add.text(game.config.width*.15,game.config.height*.625, "  Music", {font: "80px Verdana"})
        let musicicon;
        if (this.bgm.mute) {musicicon = '🔈'} else {musicicon = '🔊'}
        let musicimage = this.add.text(game.config.width*.08,game.config.height*.625, musicicon, {font: "80px Verdana"})

        let settingstitle = this.add.text(game.config.width*.15,game.config.height*.5 - 350, "Settings", {font: "80px Verdana"})
        let settingstitle2 = this.add.text(game.config.width*.15+10,game.config.height*.5 - 350+10, "Settings", {font: "80px Verdana", color: 0xffffff})


        let settingsmenu = this.add.container(0,10, [rect,triangle,exit,fullscreenbutton, subtitlesbutton, musicbutton, fullscreenbuttoneffect,subtitlesbuttoneffect, musicbuttoneffect,
                                                fullscreenimage, subtitlesimage, musicimage, fullscreentext, subtitlestext, musictext, settingstitle2, settingstitle])
            .setAlpha(0)
   

        //settings buttons
        fullscreenbutton.on('pointerover',()=>{
        fullscreenbuttoneffect.setAlpha(1)})
        fullscreenbutton.on('pointerout',()=>{fullscreenbuttoneffect.setAlpha(0)})
        fullscreenbutton.on('pointerdown',()=>{
        //
        //fullscreen code goes here
        //
        sound.play()
        if (game.config.captions == true) {
            let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
            this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
        }
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
            fullscreenimage.setAlpha(0)
        } else {
            this.scale.startFullscreen();
            fullscreenimage.setAlpha(1)
        }
    })



        subtitlesbutton.on('pointerover',()=>{subtitlesbuttoneffect.setAlpha(1)})
        subtitlesbutton.on('pointerout',()=>{subtitlesbuttoneffect.setAlpha(0)})
        subtitlesbutton.on('pointerdown',()=>{
        //
        //subtitles code goes here
        //
        sound.play()
        if (game.config.captions == true) {
            let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
            this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
        }
        if (game.config.captions) {
            game.config.captions = false;
            subtitlesimage.setAlpha(0);
        } else {
            game.config.captions = true;
            subtitlesimage.setAlpha(1);
        }
        })

        musicbutton.on('pointerover',()=>{musicbuttoneffect.setAlpha(1)})
        musicbutton.on('pointerout',()=>{musicbuttoneffect.setAlpha(0)})
        musicbutton.on('pointerdown',()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
        if (this.bgm.mute) {
            musicimage.setText('🔊')
            this.bgm.mute = false;
        } else {
            musicimage.setText('🔈')
            this.bgm.mute = true;
        }
        })
            exit.on('pointerover',()=>{exit.setScale(1.05)})
            exit.on('pointerout',()=>{exit.setScale(1)})
            exit.on('pointerdown',()=>{
                sound.play()
                if (game.config.captions == true) {
                    let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                    this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                }
                settingsmenu.setAlpha(0)
                settings = 0
            })    


        //ship select button
        let shipbuttonback = this.add.rectangle(game.config.width*.2, game.config.height*.95, 220, 120, 0xffffff)
        let shipbuttonbody = this.add.rectangle(game.config.width*.2, game.config.height*.95, 200, 100, 0x3c78d8).setInteractive()
        let shipbuttontext = this.add.text(game.config.width*.2, game.config.height*.95, "Ship", {font: "50px Verdana"}).setOrigin(.5)

            shipbuttonbody.on('pointerover',()=>{ 
                shipbuttonback.setScale(1.1)
                shipbuttonbody.setScale(1.1)
                shipbuttontext.setScale(1.1)
            })
            shipbuttonbody.on('pointerout',()=>{ 
                shipbuttonback.setScale(1)
                shipbuttonbody.setScale(1)
                shipbuttontext.setScale(1)
            })
            shipbuttonbody.on('pointerdown',()=>{
                sound.play()
                if (game.config.captions == true) {
                    let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                    this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                }
                this.scene.start('selectScreen')
            })

            //level select button
        let levelbuttonback = this.add.rectangle(game.config.width*.8, game.config.height*.95, 220, 120, 0xffffff)
        let levelbuttonbody = this.add.rectangle(game.config.width*.8, game.config.height*.95, 200, 100, 0x3c78d8).setInteractive()
        let levelbuttontext = this.add.text(game.config.width*.8, game.config.height*.95, "Level", {font: "50px Verdana"}).setOrigin(.5)

            levelbuttonbody.on('pointerover',()=>{ 
                levelbuttonback.setScale(1.1)
                levelbuttonbody.setScale(1.1)
                levelbuttontext.setScale(1.1)
            })
            levelbuttonbody.on('pointerout',()=>{ 
                levelbuttonback.setScale(1)
                levelbuttonbody.setScale(1)
                levelbuttontext.setScale(1)
            })
            levelbuttonbody.on('pointerdown',()=>{
                sound.play()
                if (game.config.captions == true) {
                    let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                    this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                }
                this.scene.start('levelselectScreen', {playersprite: this.playersprite, bgm: this.bgm})
            })

        // credits button
        let creditsbuttonback = this.add.rectangle(game.config.width*.8, game.config.height*.85, 220, 120, 0xffffff)
        let creditsbuttonbody = this.add.rectangle(game.config.width*.8, game.config.height*.85, 200, 100, 0x3c78d8).setInteractive()
        let creditsbuttontext = this.add.text(game.config.width*.8, game.config.height*.85, "Credits", {font: "50px Verdana"}).setOrigin(.5)

            creditsbuttonbody.on('pointerover',()=>{ 
                creditsbuttonback.setScale(1.1)
                creditsbuttonbody.setScale(1.1)
                creditsbuttontext.setScale(1.1)
            })
            creditsbuttonbody.on('pointerout',()=>{ 
                creditsbuttonback.setScale(1)
                creditsbuttonbody.setScale(1)
                creditsbuttontext.setScale(1)
            })
            creditsbuttonbody.on('pointerdown',()=>{
                sound.play()
                if (game.config.captions == true) {
                    let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                    this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                }
                this.scene.start('credits', {playersprite: this.playersprite, bgm: this.bgm})
            })
    }
    update() {
        //background scroll
            if (this.stars.y >= game.config.height*1.5) {this.stars.y = game.config.height*-.5}
            this.stars.y += 5;
            if (this.stars2.y >= game.config.height*1.5){this.stars2.y = game.config.height*-.5}
            this.stars2.y += 5;
    }
}

class levelselectScreen extends Phaser.Scene{
    constructor() {
        super('levelselectScreen')
    }
    init(data) {
        this.bgm = data.bgm;
        this.playersprite = data.playersprite;

        {
            this.cameras.main.fadeIn(100);
            const fxCamera = this.cameras.main.postFX.addPixelate(40);
            this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: -1,
            });
        }
    }
    create() {
        let sound = this.sound.add('click')

        //initial still background
        this.shadow = this.add.rectangle(game.config.width*.5, game.config.height*.5,1080,1920, 0x000000)
        this.background = this.add.image(game.config.width*.5, game.config.height*.5, 'space')

        //settings button
        let effect = this.add.rectangle(game.config.width *.5, game.config.height*.5, 1080, 50, 0xffffff)
            .setAlpha(0)
        let buttonback = this.add.rectangle(game.config.width *.5 + 20, game.config.height*.5 + 20, 500, 200, 0xffffff);
        let button = this.add.rectangle(game.config.width *.5, game.config.height*.5, 500, 200, 0x3c78d8).setInteractive();
        let buttontext = this.add.text(game.config.width*.5,game.config.height*.5, "Level 1", {font: "80px Verdana"}).setOrigin(0.5);

        button.on('pointerover',()=>{
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
        })
        .on('pointerdown',()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.scene.start('level1', {playersprite: this.playersprite, bgm: this.bgm})
        })


        //settings2 button
        let effect2 = this.add.rectangle(game.config.width *.5, game.config.height*.65, 1080, 50, 0xffffff)
            .setAlpha(0);
        let button2back = this.add.rectangle(game.config.width *.5 + 20, game.config.height*.65 + 20, 500, 200, 0xffffff);
        let button2 = this.add.rectangle(game.config.width *.5, game.config.height*.65, 500, 200, 0x3c78d8).setInteractive();
        let button2text = this.add.text(game.config.width*.5,game.config.height*.65, "Level 2", {font: "80px Verdana"}).setOrigin(0.5);

        //settings2 button effects
        button2.on('pointerover',()=>{
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
        })
        .on('pointerdown',()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.scene.start('level2', {playersprite: this.playersprite, bgm: this.bgm})
        })


        let effect3 = this.add.rectangle(game.config.width *.5, game.config.height*.8, 1080, 50, 0xffffff)
            .setAlpha(0);
        let button3back = this.add.rectangle(game.config.width *.5 + 20, game.config.height*.8 + 20, 500, 200, 0xffffff);
        let button3 = this.add.rectangle(game.config.width *.5, game.config.height*.8, 500, 200, 0x3c78d8).setInteractive();
        let button3text = this.add.text(game.config.width*.5,game.config.height*.8, "Level 3", {font: "80px Verdana"}).setOrigin(0.5);

        //settings3 button effects
        button3.on('pointerover',()=>{
            button3.scale = 1.1
            button3back.scale = 1.1
            button3text.scale = 1.1
            this.tweens.add({targets:effect3, alpha: 1, duration: 500}) 
        })
        .on('pointerout',()=> {
            button3.scale = 1
            button3back.scale = 1
            button3text.scale = 1
            this.tweens.add({targets:effect3, alpha: 0, duration: 500})
        })
        .on('pointerdown',()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.scene.start('level3', {playersprite: this.playersprite, bgm: this.bgm})
        })
    }
}

class victoryScreen extends Phaser.Scene{
    constructor(){
        super('victoryScreen');
    }
    /*preload(){
        this.load.path = './assets/'
        this.load.image('player', 'player.png')
        this.load.image('space', 'Spacebackground.png');
        this.load.image('enemy', 'enemy.png')
        this.load.image('planet1', 'planet1.png')
        this.load.image('planet2','planet2.png')

        this.load.audio('click', '/audio/click.mp3');
    }*/
    init(data) {
        this.bgm = data.bgm;
        this.playersprite = data.playersprite;
        {
            this.cameras.main.fadeIn(100);
            const fxCamera = this.cameras.main.postFX.addPixelate(40);
            this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: -1,
            });
        }
    }
    create() {
        let sound_click = this.sound.add('click');

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
        this.finalscore = this.game.config.lvl1score + this.game.config.lvl2score + this.game.config.lvl3score

        //score text        
        this.text1 = this.add.text(game.config.width*.15,game.config.height*.3, `Level 1 score: ${this.game.config.lvl1score}`, {font: "80px Verdana"}).setAlpha(0);
        this.text2 = this.add.text(game.config.width*.15,game.config.height*.4, `Level 2 Score: ${game.config.lvl2score}`, {font: "80px Verdana"}).setAlpha(0);
        this.text3 = this.add.text(game.config.width*.15,game.config.height*.5, `Level 3 Score: ${game.config.lvl3score}`, {font: "80px Verdana"}).setAlpha(0);
        this.text4 = this.add.text(game.config.width*.5,game.config.height*.6, "Total:  ", {font: "80px Verdana"}).setOrigin(0.5);


        //score text description
        let descriptionbackground = this.add.rectangle(game.config.width*.5,game.config.height*.8, 1000, 200, 0x000000).setAlpha(0)
        let description = this.add.text(game.config.width*.5,game.config.height*.8, "You're mid!", {font: "80px Verdana", color: '#474714'}).setOrigin(0.5).setAlpha(0);
        
        if(this.finalscore >= 20000) {
            description.setText("I mean it's alright!")
                .setColor("#ff006e")
            }
        if(this.finalscore >= 30000) {
            description.setText("Low Diff")
                .setColor('#f0f024')
            }
        
        //score animation
        //
        //displays level scores, then displays final score with a final score description
        let chain = this.tweens.chain({
            tweens: [
                {
                    targets: this.text1,
                    alpha: 1,
                    onComplete:()=>{sound_click.play()
                        if (game.config.captions == true) {
                            let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                            this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                        }}
                },
                {
                    targets: this.text2,
                    alpha: 1,
                    onComplete:()=>{sound_click.play()
                        if (game.config.captions == true) {
                            let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                            this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                        }}
                },
                {
                    targets: this.text3,
                    alpha: 1,
                    
                    //final score counts up
                    onComplete:() => {
                        sound_click.play()
                        if (game.config.captions == true) {
                            let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                            this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
                        }
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

        this.input.once('pointerdown', () => {
            sound_click.play();
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.bgm.stop();
            this.scene.start('titleScreen', {playersprite: this.playersprite, bgm: this.bgm});
        });
    }
}

class selectScreen extends Phaser.Scene{
    constructor(){
        super('selectScreen');
    }
    /*preload(){
        this.load.path = './assets/'
        this.load.image('player', 'player.png');
        this.load.image('player_og', 'player_og.png');
        this.load.image('space', 'Spacebackground.png');

        this.load.audio('click', '/audio/click.mp3');
    }*/
    init(data) {
        this.bgm = data.bgm;
        this.playersprite = data.playersprite;

        {
            this.cameras.main.fadeIn(100);
            const fxCamera = this.cameras.main.postFX.addPixelate(40);
            this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: -1,
            });
        }
    }
    create() {
        let sound = this.sound.add('click');

        let spriteSelect = ['player', 'germ1', 'germ2', 'germ3', 0.75, 0.6];
        let spriteSelect_og = ['player_og', 'enemy', 'enemy2', 'enemy3', 0.5, 0.4];

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

        //description text
        let name = this.add.text(game.config.width*.5, game.config.height*.8, '', {fontSize: 120, color: '#ff0000'}).setOrigin(.5);
        let description = this.add.text(game.config.width*.5, game.config.height*.9, '', {fontSize: 60}).setOrigin(.5);

        let box1 = this.add.isobox(game.config.width*.3, game.config.height*.7, 300, 200, 0x2bd62b, 0x1b961b, 0x14c714).setInteractive();
        let box2 = this.add.isobox(game.config.width*.7, game.config.height*.7, 300, 200, 0xd91630, 0xb3172c, 0xe80c29).setInteractive();

        let player_og = this.add.image(game.config.width*.7, game.config.height*.57, 'player_og').setInteractive()
        let player = this.add.image(game.config.width*.3, game.config.height*.57, 'player').setInteractive()

        //new ship
        player.on('pointerover', ()=> {
            box1.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)
            name.setText("THE ALPHA").setColor('#14c714')
            description.setText('Mission: \ndestroy the ancient germs')
        })
        player.on('pointerout', ()=> {
            box1.setFillStyle(0x2bd62b, 0x1b961b, 0x14c714)
            name.setText('')
            description.setText('')    
        })
        player.on('pointerdown', ()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.scene.start('cutscene', {playersprite: spriteSelect})
        })

        box1.on('pointerover', ()=> {
            box1.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)
            name.setText("THE ALPHA").setColor('#14c714')
            description.setText('Mission: \ndestroy the ancient germs')
        })
        box1.on('pointerout', ()=> {
            box1.setFillStyle(0x2bd62b, 0x1b961b, 0x14c714)
            name.setText('')
            description.setText('')    
        })
        box1.on('pointerdown', ()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.scene.start('cutscene', {playersprite: spriteSelect})
        })

        //old ship
        player_og.on('pointerover', ()=> {
            box2.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)
            name.setText("THE OG").setColor('#e80c29')
            description.setText('Mission: \nKILL. THEM. ALL.')
        })
        player_og.on('pointerout', ()=> {
            box2.setFillStyle(0xd91630, 0xb3172c, 0xe80c29)
            name.setText('')
            description.setText('')   
        })
        player_og.on('pointerdown', ()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.scene.start('cutscene', {playersprite: spriteSelect_og})
        })

        box2.on('pointerover', ()=> {
            box2.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)
            name.setText("THE OG").setColor('#e80c29')
            description.setText('Mission: \nKILL. THEM. ALL.')
        })
        box2.on('pointerout', ()=> {
            box2.setFillStyle(0xd91630, 0xb3172c, 0xe80c29)
            name.setText('')
            description.setText('')   
        })
        box2.on('pointerdown', ()=>{
            sound.play()
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(click)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }
            this.scene.start('cutscene', {playersprite: spriteSelect_og})
        })

    }
}