class Pause extends Phaser.Scene {
    constructor() {
        super('pause');
    };
    init(data) {
        this.bgm = data.bgm;
    }
    create() {
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
    }
}