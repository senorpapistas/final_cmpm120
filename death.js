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
        let losesfx = this.sound.add('lose', { loop: true});
        losesfx.play()
        this.add.text(game.config.width*.5, game.config.height*.2, 'YOU DIED', {fontSize: 120, color: '#ff0000'}).setOrigin(.5);
        this.add.text(game.config.width*.5, game.config.height*.3, "Click to restart", {fontSize: 40}).setOrigin(.5);
        this.input.on('pointerdown', () => {
            losesfx.stop();
            this.scene.start(this.level);
        });

        this.pads = this.input.gamepad.gamepads;
        this.input.gamepad.on('down', () => {
            losesfx.stop();
            this.scene.start(this.level);
        })

        //quit to main menu button
        let quitbuttonbody = this.add.rectangle(game.config.width*.5, game.config.height*.8, 550, 250, 0x000000).setOrigin(.5)
        let quitbutton = this.add.rectangle(game.config.width*.5, game.config.height*.8, 500, 200, 0xff0000).setOrigin(.5).setInteractive()
        let quittext = this.add.text (game.config.width*.5, game.config.height*.8, "ABORT", {font: "80px Verdana"}).setOrigin(.5)

        quitbutton.on('pointerover',()=>{quittext.setScale(1.2)})
        quitbutton.on('pointerout',()=>{quittext.setScale(1)})
        quitbutton.on('pointerdown',()=>{
            this.scene.start('titleScreen')
            this.scene.stop();
            this.scene.stop(this.currLevel);
        })
    };
};