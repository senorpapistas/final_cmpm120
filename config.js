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
            debug: false,
            gravity: {
                x: 0,
                y: 700
            }
        }
    },
    captions: false,
    lvl1score: 0,
    lvl2score: 0,
    lvl3score: 0,
    type: Phaser.WEBGL,
    scene: [Preloader, selectScreen, cutscene, titleScreen, Level1, Level2, Level3, Pause, Tutorial, TransitionScreen, victoryScreen, Death],
    title: 'Hotline Albuquerque',
});
game.config.captions = false;
game.config.lvl1score = 0;
game.config.lvl2score = 0;
game.config.lvl3score = 0;