class Death extends Phaser.Scene {
    constructor() {
        super('death');
    };
    preload() {
        this.load.path = '../assets/'
        this.load.audio('lose', '/audio/lose.mp3');
    };
    init(data) {
        this.level = data.level;
    }
    create() {

        let click = this.sound.add('click')

        let losesfx = this.sound.add('lose', { loop: true});
        losesfx.play()
        this.add.text(game.config.width*.5, game.config.height*.2, 'YOU DIED', {fontSize: 120, color: '#ff0000'}).setOrigin(.5);
        /*
        this.add.text(game.config.width*.5, game.config.height*.3, "Click to restart", {fontSize: 40}).setOrigin(.5);
        this.input.on('pointerdown', () => {
            losesfx.stop();
            this.scene.start(this.level);
        });
        */

        //gamepad support
        this.pads = this.input.gamepad.gamepads;
        this.input.gamepad.on('down', () => {
            losesfx.stop();
            click.play();
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(whoosh)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }

            this.scene.start(this.level);
        })

        //restart button
        let restartbuttonbody = this.add.rectangle(game.config.width*.5, game.config.height*.5, 550, 250, 0x000000).setOrigin(.5)
        let restartbutton = this.add.rectangle(game.config.width*.5, game.config.height*.5, 500, 200, 0x14c714).setOrigin(.5).setInteractive()
        let restarttext = this.add.text (game.config.width*.5, game.config.height*.5, "RESTART?", {font: "80px Verdana"}).setOrigin(.5)

        restartbutton.on('pointerover',()=>{restarttext.setScale(1.2)})
        restartbutton.on('pointerout',()=>{restarttext.setScale(1)})
        restartbutton.on('pointerdown',()=>{
            losesfx.stop();
            click.play();
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(whoosh)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }

            this.scene.start(this.level);
        })
    

        //quit to main menu button
        let quitbuttonbody = this.add.rectangle(game.config.width*.5, game.config.height*.65, 550, 250, 0x000000).setOrigin(.5)
        let quitbutton = this.add.rectangle(game.config.width*.5, game.config.height*.65, 500, 200, 0xff0000).setOrigin(.5).setInteractive()
        let quittext = this.add.text (game.config.width*.5, game.config.height*.65, "ABORT", {font: "80px Verdana"}).setOrigin(.5)

        quitbutton.on('pointerover',()=>{quittext.setScale(1.2)})
        quitbutton.on('pointerout',()=>{quittext.setScale(1)})
        quitbutton.on('pointerdown',()=>{
            click.play();
            if (game.config.captions == true) {
                let boosttext = this.add.text(game.config.width*.5, 1800, '(whoosh)', {fontSize: '40px'}).setOrigin(.5);
                this.time.delayedCall(500, () => {this.tweens.add({targets: boosttext, alpha: 0, duration: 500})});
            }

            losesfx.stop();
            this.scene.start('titleScreen')
            this.scene.stop();
            this.scene.stop(this.currLevel);
        })
    };
};