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
    captions: false,
    type: Phaser.WEBGL,
    scene: [Preloader, selectScreen, cutscene, titleScreen, Level1, Pause, TransitionScreen, Death],
    title: 'Hotline Albuquerque',
});
game.config.captions = false;