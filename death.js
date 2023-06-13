class Death extends Phaser.Scene {
    constructor() {
        super('death');
    };
    preload() {
        this.load.path = '../assets/'
        this.load.audio('lose', '/audio/lose.mp3');
    }
    create() {
        let losesfx = this.sound.add('lose', { loop: true});
        losesfx.play()
        this.add.text(game.config.width*.5, game.config.height*.2, 'YOU DIED', {fontSize: 120, color: '#ff0000'}).setOrigin(.5);
        this.add.text(game.config.width*.5, game.config.height*.3, "Click to restart", {fontSize: 40}).setOrigin(.5);
        this.input.on('pointerdown', () => {
            this.scene.start('level1');
        });
    };
};