class Demo extends Phaser.Scene{
    constructor() {
        super('demo')
    }
    preload() {
        this.load.image('player', 'player.png');
    }
    create() {
        this.player = this.physics.add.sprite(540, 960, 'player').setScale(1).setMaxVelocity(200, 300).setVelocityX(0);
        this.physics.add.existing(new Phaser.GameObjects.Rectangle(this, 540, 960, 10, 1920)).body.allowGravity = false;
        
    }
    update(time, delta) {
        this.input.on('pointerdown', () => {
            this.player.setVelocityX(100);
            this.player.setVelocityY(-100);
        });
    }
}

const game = new Phaser.Game({
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 1080,
        height: 1920
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 200
            }
        }
    },
    scene: [Demo],
    title: 'Core Gameplay Demo'
});