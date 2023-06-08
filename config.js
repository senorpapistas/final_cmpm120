let game = new Phaser.Game({
    input: {
        gamepad: true,
    },
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
                y: 700
            }
        }
    },
    type: Phaser.WEBGL,
    scene: [Demo],
    title: 'Hotline Albuquerque'
});