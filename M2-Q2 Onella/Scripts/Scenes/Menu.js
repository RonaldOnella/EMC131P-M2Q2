export default class menuScene extends Phaser.Scene {
    constructor(){
        super('menuScene');
    }

preload(){
    this.load.image('background', './Assets/Images/space.jpg ');
}

create(){
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.add.image(400, 300, 'background').setScale (2,2.5);
    
    this.add.text(255,250, 'Space Shooter',{fontSize:'60px',stroke: '#fff', strokeThickness: 3,  fontStyle: 'bold', fill: '#0000FF'});
    
    let start = this.add.text(360,400, 'Start Game', {fontSize: '40px'});
    this.add.text(270,600, 'Win Condition: get 25 points', {fontSize: '25px'});
    start.setInteractive({useHandCursor: true});
    start.on('pointerdown', () => this.startButton());

}

startButton(){
    console.log("Game Start!");
    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.scene.start('gameScene');
}

}