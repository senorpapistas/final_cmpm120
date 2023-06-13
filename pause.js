class Pause extends Phaser.Scene {
    constructor() {
        super('pause');
    };
    init(data) {
        this.bgm = data.bgm;
        this.pauseButton = data.pB;
        this.currLevel = data.currLevel;
    }
    create() {
        /*
        this.add.text(320, 800, "PAUSED", {fontSize: 120});
        this.add.text(200, 920, "Click button below to resume", {fontSize: 40});
        
        // button for resuming the game
        this.add.text(485, 1000, "▶️", {fontSize: 80})
            .setInteractive()
            .on('pointerdown', () => {
                this.scene.resume('demo', {bgm: this.bgm});
                this.scene.stop();
            })
            

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
        
        // button for making game fullscreen
        let fullscreenButton = this.add.text(this.w*0.87, this.h*0.09, "FULL?")
            .setStyle({fontSize: `${4 * this.s}px`, color: '#00ff00'})
            .setInteractive({useHandCursor: true})
            .on('pointerdown', () => {
                if (this.scale.isFullscreen) {
                    this.scale.stopFullscreen();
                } else {
                    this.scale.startFullscreen();
                }
            });
        */

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

        //
        //NEED GLOBAL VARIABLES FOR FULLSCREEN AND SUBTITLES
        //
        //let subtitles = 0;
        //let fullscreen = 0;
        //let music = 1;

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
            if (this.bgm.mute) {
                musicimage.setText('🔊')
                this.bgm.mute = false;
            } else {
                musicimage.setText('🔈')
                this.bgm.mute = true;
            }
        })

        //quit to main menu
        let quitbuttonbody = this.add.rectangle(game.config.width*.5, game.config.height*.8, 550, 250, 0x000000).setOrigin(.5)
        let quitbutton = this.add.rectangle(game.config.width*.5, game.config.height*.8, 500, 200, 0xff0000).setOrigin(.5).setInteractive()
        let quittext = this.add.text (game.config.width*.5, game.config.height*.8, "ABORT", {font: "80px Verdana"}).setOrigin(.5)

        quitbutton.on('pointerover',()=>{quittext.setScale(1.2)})
        quitbutton.on('pointerout',()=>{quittext.setScale(1)})
        quitbutton.on('pointerdown',()=>{
            this.scene.start('titleScreen')
            this.scene.stop(this);
            this.scene.stop(this.currLevel);
            
        })
        //exit pause screen
        exit.on('pointerover',()=>{exit.setScale(1.05)})
        exit.on('pointerout',()=>{exit.setScale(1)})
        exit.on('pointerdown',()=>{
            this.pauseButton.setAlpha(1);
            this.scene.resume(this.currLevel, {bgm: this.bgm});
            this.scene.stop();
        })    
    }
}