class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }
    init(data) {
        this.bgm = data.bgm;
        this.playersprite = data.playersprite;
        this.cameras.main.fadeIn(100);
            const fxCamera = this.cameras.main.postFX.addPixelate(40);
            this.add.tween({
                targets: fxCamera,
                duration: 700,
                amount: -1,
            });
    }
    create() {
        this.stars = this.add.image(game.config.width*.5, game.config.height*.5, 'space');
        this.stars2 = this.add.image(game.config.width*.5, game.config.height*1.5, 'space');

        let creditstext = this.add.text(50, 50, 'Audio Assets:\n\nBackground Music - creamy tomato, by human gazpacho,\nfrom Free Music Archive, CC BY-NC\nAll sound effects found on YouTube and edited by Ivan\n\nImage Assets:\n\nBeta assets drawn by Ewin\nAlpha assets AI generated using craiyon by Alan\nExplosion animation found and implemented by Ivan\n\nRoles:\n\nIvan - Production lead, Audio, UI/UX,\n          Secondary programmer\nEwin - Technology lead, Beta assets, Gameplay, Levels,\n          Primary programmer\nJoshua - Testing lead\nAlan - 1st Design lead, Alpha assets\nAndrew - 2nd Design lead');
        creditstext.setFont('35px Verdana');
        this.input.on('pointerdown', () => {
            this.scene.start('titleScreen', {bgm: this.bgm, playersprite: this.playersprite})
        })
    }
    update() {
        if (this.stars.y >= game.config.height*1.5) {this.stars.y = game.config.height*-.5}
        this.stars.y += 5;
        if (this.stars2.y >= game.config.height*1.5) {this.stars2.y = game.config.height*-.5}
        this.stars2.y += 5;
    }
}