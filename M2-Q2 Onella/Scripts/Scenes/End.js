export default class endScene extends Phaser.Scene {
    constructor(){
        super('endScene');
    }

    init (data) { // get data score from gamescene

        console.log('init', data);
        this.finalScore = data.score;
        
     }
preload(){
    this.load.image('background', './Assets/Images/space.jpg ');
}

create(){
    this.cameras.main.fadeIn(1000, 0, 0, 0)
    this.add.image(400, 300, 'background').setScale (2,2.5);
    
    this.add.text(215,250, 'You got ' + this.finalScore + ' points!',{fontSize:'60px',stroke: '#fff', strokeThickness: 3,  fontStyle: 'bold', fill: '#0000FF'});
    
    let menu = this.add.text(360,400, 'Main Menu', {fontSize: '40px'});
    
    menu.setInteractive({useHandCursor: true});
   menu.on('pointerdown', () => this.menuButton());

}

menuButton(){
    console.log("Returning");
    this.cameras.main.fadeOut(1000, 0, 0, 0)
    this.scene.start('menuScene');
}

}