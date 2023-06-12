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
        this.load.image('planet1', 'planet1.png');
        this.load.image('planet2','planet2.png');

        this.load.image('megumin1', 'megumin/megumin1.png');
        this.load.image('megumin2', 'megumin/megumin2.png');
        this.load.image('megumin3', 'megumin/megumin3.png');
        this.load.image('megumin4', 'megumin/megumin4.png');
        this.load.image('megumin5', 'megumin/megumin5.png');
        this.load.image('megumin6', 'megumin/megumin6.png');
        this.load.image('megumin7', 'megumin/megumin7.png');
    }
    create() {
        this.scene.start('selectScreen');
    }
}