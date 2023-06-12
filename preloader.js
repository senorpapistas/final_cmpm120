class Preloader extends Phaser.Scene {
    constructor() {
        super('preloader');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('player', 'player.png');
        this.load.image('player_og', 'player_og.png');
        this.load.image('enemy', 'enemy.png');
        this.load.image('enemy2', 'enemy2.png');
        this.load.image('bullet', 'bullet.png');
        this.load.image('space', 'Spacebackground.png');
        this.load.audio('boost', 'boost.wav');
        this.load.audio('bgm', 'creamy tomato.mp3');
        this.load.image('planet1', 'planet1.png')
        this.load.image('planet2','planet2.png')
    }
    create() {
        this.scene.start('selectScreen');
    }
}