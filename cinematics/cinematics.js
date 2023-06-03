class cutscene extends Phaser.Scene {
    constructor(){
        super('cutscene');
    }
    preload() {
        this.load.image('player', 'player.png');
        this.load.image('space', 'space.jpg');
    }
    create() {

        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "Click to start", {font: "80px Verdana"}).setOrigin(0.5);

        let background = this.add.image(game.config.width*.5, game.config.height*.5, 'space')
        let player = this.add.image(game.config.width*.5, game.config.height*.8, 'player');
        background.angle = 90
        background.scale = 2

        //fx
        const backfx = background.preFX.addVignette(0.5, 0.8, 0.2, 0.5);
        //const fx = player.preFX.addVignette(0.5, 0.5, 0, 0.2);


        //activate fx on click
        this.input.once('pointerdown', () => {
            title.destroy()

            this.tweens.add({
                targets: [backfx],
                radius: 3,
                duration: 6000,
                hold: 1000,
            });

            this.tweens.add({
                targets: [player],
                y: -500,
                duration: 5000, 
            });

            this.timedEvent = this.time.delayedCall(6000, this.event, [], this);
        });



        this.add.text(game.config.width*.5, game.config.height*.9, "cutscene", {font: "40px Arial"}).setOrigin(0.5);

        /*
        this.input.once('pointerdown', () => {
            this.scene.start('titleScreen');
        });
        */
    }
    event() {
        console.log('bruh')
        this.scene.start('titleScreen');
    }
}

class titleScreen extends Phaser.Scene{
    constructor(){
        super('titleScreen');
    }
    create() {

        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "Title", {font: "80px Verdana"}).setOrigin(0.5);

        //play button
        let button = this.add.rectangle(game.config.width *.5, game.config.height*.5, 500, 200, 0x3c78d8).setInteractive();
        let buttontext = this.add.text(game.config.width*.5,game.config.height*.5, "Play", {font: "80px Verdana"}).setOrigin(0.5);

        button.on('pointerover',()=>{
            button.scale +=.3;
        })
        .on('pointerout',()=> {
            button.scale -=.3;
        })


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
        
        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "You passed!", {font: "80px Verdana"}).setOrigin(0.5);

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
        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "You Win!", {font: "80px Verdana"}).setOrigin(0.5);

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
        //title
        let title = this.add.text(game.config.width*.5,game.config.height*.1, "You lose!", {font: "80px Verdana"}).setOrigin(0.5);

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
    scene: [cutscene, titleScreen, transitionScreen, victoryScreen, loseScreen],
}

let game = new Phaser.Game(config);