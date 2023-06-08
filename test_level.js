class Demo extends Phaser.Scene {
    constructor() {
        super('demo');
    }
    preload() {
        this.load.path = './assets/';
        this.load.image('player', 'player.png');
    }
    create() {
        
    }
}