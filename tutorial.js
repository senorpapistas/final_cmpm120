class Tutorial extends Phaser.Scene {
    constructor() {
        super('tutorial');
    }
    init(data) {
        this.currScene = data.currScene;
    }
    create() {
        this.add.rectangle(540, 960, 1080, 1920, 0xffffff, 0.3);
        this.add.rectangle(540, 960, 20, 1920, 0xffffff, 0.5);
        this.add.circle(810, 960, 150, 0xffffff, 0.5);
        this.add.circle(810, 960, 90, 0xffffff, 0.5);
        this.add.circle(270, 960, 150, 0xffffff, 0.5);
        this.add.circle(270, 960, 90, 0xffffff, 0.5);
        this.add.rectangle(270, 650, 320, 200, 0xffffff, 0.8);
        this.add.rectangle(810, 650, 320, 200, 0xffffff, 0.8);
        this.add.text(270, 650, '  Tap to\njump left', {font: '50px Verdana', color: '#000000'}).setOrigin(0.5);
        this.add.text(810, 650, '   Tap to\njump right', {font: '50px Verdana', color: '#000000'}).setOrigin(0.5);
        this.input.on('pointerdown', () => {
            this.time.delayedCall(200, () => {
                this.scene.resume(this.currScene);
                this.scene.stop();
            });
        });
    }
}