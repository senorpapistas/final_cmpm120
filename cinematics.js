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
            if (this.stars.y == game.config.height*1.5)
            {
                this.stars.y = game.config.height*-.5
            }
            this.stars.y += 5;
            if (this.stars2.y == game.config.height*1.5)
            {
                this.stars2.y = game.config.height*-.5
            }
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
                    sound.play()
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
                sound.play()
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
        fullscreenbuttoneffect.setAlpha(1)
        })
        fullscreenbutton.on('pointerout',()=>{
        fullscreenbuttoneffect.setAlpha(0)
        })
        fullscreenbutton.on('pointerdown',()=>{
        /*
        if (fullscreen == 0) {fullscreen = 1}
            else{fullscreen= 0}
            */
        //
        //fullscreen code goes here
        //
        sound.play()
        if (this.scale.isFullscreen) {
            this.scale.stopFullscreen();
            fullscreenimage.setAlpha(0)
        } else {
            this.scale.startFullscreen();
            fullscreenimage.setAlpha(1)
        }
    })



        subtitlesbutton.on('pointerover',()=>{
        subtitlesbuttoneffect.setAlpha(1)
        })
        subtitlesbutton.on('pointerout',()=>{
        subtitlesbuttoneffect.setAlpha(0)
        })
        subtitlesbutton.on('pointerdown',()=>{
        /*if (subtitles == 0) {subtitles = 1}
            else{subtitles= 0}
        subtitlesimage.setAlpha(subtitles)*/
        //
        //subtitles code goes here
        //
        sound.play()
        if (game.config.captions) {
            game.config.captions = false;
            subtitlesimage.setAlpha(0);
        } else {
            game.config.captions = true;
            subtitlesimage.setAlpha(1);
        }
        })

        musicbutton.on('pointerover',()=>{
        musicbuttoneffect.setAlpha(1)
        })
        musicbutton.on('pointerout',()=>{
        musicbuttoneffect.setAlpha(0)
        })
        musicbutton.on('pointerdown',()=>{
            sound.play()
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
            if (this.stars2.y >= game.config.height*1.5)
            {
                this.stars2.y = game.config.height*-.5
            }
            this.stars2.y += 5;
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
    }
    create() {
        let sound = this.sound.add('click');

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
        let descriptionbackground = this.add.rectangle(game.config.width*.5,game.config.height*.8, 600, 200, 0x000000)
            .setAlpha(0)
        let description = this.add.text(game.config.width*.5,game.config.height*.8, "You're mid!", {font: "80px Verdana"}).setOrigin(0.5)
            .setAlpha(0);
        
        if(this.finalscore >= 15000) {description.setText("You're ok!")}
        else if(this.finalscore >= 20000) {description.setText("You're great!")}
        
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

        this.input.once('pointerdown', () => {
            sound.play();
            this.bgm.stop();
            this.scene.start('selectScreen');
        });
    }
    update() {

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

        let box1 = this.add.isobox(game.config.width*.3, game.config.height*.7, 300, 200, 0x2bd62b, 0x1b961b, 0x14c714);
        let box2 = this.add.isobox(game.config.width*.7, game.config.height*.7, 300, 200, 0xd91630, 0xb3172c, 0xe80c29);

        let player_og = this.add.image(game.config.width*.7, game.config.height*.57, 'player_og').setInteractive()
        let player = this.add.image(game.config.width*.3, game.config.height*.57, 'player').setInteractive()

        player.on('pointerover', ()=> {box1.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)})
        player.on('pointerout', ()=> {box1.setFillStyle(0x2bd62b, 0x1b961b, 0x14c714)})
        player.on('pointerdown', ()=>{
            sound.play()
            this.scene.start('cutscene', {playersprite: spriteSelect})
        })

        player_og.on('pointerover', ()=> {box2.setFillStyle(0xffffff, 0xcccccc, 0xabcdef)})
        player_og.on('pointerout', ()=> {box2.setFillStyle(0xd91630, 0xb3172c, 0xe80c29)})
        player_og.on('pointerdown', ()=>{
            sound.play()
            this.scene.start('cutscene', {playersprite: spriteSelect_og})
        })
    }
}