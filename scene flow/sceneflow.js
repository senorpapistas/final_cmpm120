class titleScreen extends Phaser.Scene{
    constructor(){
        super('titleScreen');
    }
    //Pixelate code credit: https://labs.phaser.io/edit.html?src=src/fx/pixelate/pixelate%20transition%20scene.js
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create(){
        let title = this.add.text(120, 860, "[TITLE]")
            .setFontSize(200)
        this.add.text(120, 1200, "(tap to begin)")
            .setFontSize(100)
        const pixelated = this.cameras.main.postFX.addPixelate(-1);
        this.input.on('pointerdown', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('transitionScene');
                }
            })
        });
    }

    update(){
        
    }

}

class gameplayScene1 extends Phaser.Scene { 
    constructor() {
        super('gameplayScene1');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create(){
        let title = this.add.text(30, 860, "Gameplay: Level 1")
            .setFontSize(100)
        this.add.text(30, 1000, "(Press W to continue)")
            .setFontSize(80)
        const pixelated = this.cameras.main.postFX.addPixelate(-1);
        this.input.keyboard.on('keydown-W', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('transitionScene2');
                }
            })
        })
    }
    
}

class gameplayScene2 extends Phaser.Scene{
    constructor(){
        super('gameplayScene2');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create() {
        let title = this.add.text(30, 860, "Gameplay: Level 2")
            .setFontSize(100)
        this.add.text(30, 1000, "(Press W to continue)")
            .setFontSize(80)
        const pixelated = this.cameras.main.postFX.addPixelate(-1);
        this.input.keyboard.on('keydown-W', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('transitionScene3');
                }
            })
        });
    }
    
}
class gameplayScene3 extends Phaser.Scene{
    constructor(){
        super('gameplayScene3');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create() {
        let title = this.add.text(30, 860, "Gameplay: Level 3")
            .setFontSize(100)
        this.add.text(30, 1000, "(Press W to continue)")
            .setFontSize(80)
        const pixelated = this.cameras.main.postFX.addPixelate(-1);
        this.input.keyboard.on('keydown-W', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('transitionScene4');
                }
            })
        });
    }
    
}

class gameplayScene4 extends Phaser.Scene{
    constructor(){
        super('gameplayScene4');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create() {
        let title = this.add.text(30, 860, "Gameplay: Level 4")
            .setFontSize(100)
        this.add.text(30, 1000, "(Press W to continue)")
            .setFontSize(80)
        const pixelated = this.cameras.main.postFX.addPixelate(-1);
        this.input.keyboard.on('keydown-W', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('victoryScene');
                }
            })
        });
    }
    
}

class transitionScene extends Phaser.Scene{
    constructor() {
        super('transitionScene');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create(){
        let title = this.add.text(0, 860, "[Level 1]")
            .setFontSize(200)
        this.add.text(120, 1200, "(tap to begin)")
            .setFontSize(100)
        const pixelated = this.cameras.main.postFX.addPixelate(-1); //might delete, in case it breaks
        this.input.on('pointerdown', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('gameplayScene1');
                }
            })
        })
    }
}


class transitionScene2 extends Phaser.Scene{
    constructor() {
        super('transitionScene2');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create(){
        let title = this.add.text(0, 860, "[Level 2]")
            .setFontSize(200)
        this.add.text(120, 1200, "(tap to begin)")
            .setFontSize(100)
        const pixelated = this.cameras.main.postFX.addPixelate(-1); //might delete, in case it breaks
        this.input.on('pointerdown', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('gameplayScene2');
                }
            })
        })
    }
}

class transitionScene3 extends Phaser.Scene{
    constructor() {
        super('transitionScene3');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create(){
        let title = this.add.text(0, 860, "[Level 3]")
            .setFontSize(200)
        this.add.text(120, 1200, "(tap to begin)")
            .setFontSize(100)
        const pixelated = this.cameras.main.postFX.addPixelate(-1); //subject to change
        this.input.on('pointerdown', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('gameplayScene3');
                }
            })
        })
    }
}

class transitionScene4 extends Phaser.Scene{
    constructor() {
        super('transitionScene4');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create(){
        let title = this.add.text(0, 860, "[Level 4]")
            .setFontSize(200)
        this.add.text(120, 1200, "(tap to begin)")
            .setFontSize(100)
        const pixelated = this.cameras.main.postFX.addPixelate(-1); //might delete
        this.input.on('pointerdown', () => {
            // Transition to next scene
            this.add.tween({
                targets: pixelated,
                duration: 700,
                amount: 40,
                onComplete: () => {
                    this.cameras.main.fadeOut(100);
                    this.scene.start('gameplayScene4');
                }
            })
        })
    }
}

class victoryScreen extends Phaser.Scene {
    constructor(){
        super('victoryScene');
    }
    init ()
    {
        this.cameras.main.fadeIn(100);
        const fxCamera = this.cameras.main.postFX.addPixelate(40);
        this.add.tween({
            targets: fxCamera,
            duration: 700,
            amount: -1,
        });
    }
    create(){
        this.add.text(50, 800, "Congratualations")
            .setFontSize(100)
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
    scene: [titleScreen, gameplayScene1, gameplayScene2, gameplayScene3, gameplayScene4,
    transitionScene, transitionScene2, transitionScene3, transitionScene4, victoryScreen],
}

let game = new Phaser.Game(config);
