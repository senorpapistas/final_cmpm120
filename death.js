class Death extends Phaser.Scene {
    constructor() {
        super('death');
    };
    create() {
        this.add.text(300, 960, 'YOU DIED', {fontSize: 120, color: '#ff0000'});
        this.add.text(400, 1100, "Click to restart", {fontSize: 40});
        this.input.on('pointerdown', () => {
            this.scene.start('level1');
        });
    };
};