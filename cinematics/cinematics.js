class titleScreen extends Phaser.Scene{
    constructor(){
        super('titleScreen');
    }
    create() {

        this.add.text(game.config.width*.5, game.config.height*.9, "titleScreen", {font: "40px Arial"}).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('transitionScreen');
        });
    }
    update() {

    }
}

class transitionScreen extends Phaser.Scene{
    constructor(){
        super('transitionScreen');
    }
    create() {

        this.add.text(game.config.width*.5, game.config.height*.9, "transitionScreen", {font: "40px Arial"}).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('victoryScreen');
        });
    }
    update() {

    }
}
    
class victoryScreen extends Phaser.Scene{
    constructor(){
        super('victoryScreen');
    }
    create() {

        this.add.text(game.config.width*.5, game.config.height*.9, "victoryScreen", {font: "40px Arial"}).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('loseScreen');
        });
    }
    update() {

    }
}

class loseScreen extends Phaser.Scene{
    constructor(){
        super('loseScreen');
    }
    create() {

        this.add.text(game.config.width*.5, game.config.height*.9, "loseScreen", {font: "40px Arial"}).setOrigin(0.5);

        this.input.once('pointerdown', () => {
            this.scene.start('titleScreen');
        });
    }
    update() {

    }
}

let config = {
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
    scene: [titleScreen, transitionScreen, victoryScreen, loseScreen],
}

let game = new Phaser.Game(config);