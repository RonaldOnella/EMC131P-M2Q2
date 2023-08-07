import menuScene from './Scenes/Menu.js'
import gameScene from './Scenes/Game.js'
import endScene from './Scenes/End.js'

let menu = new menuScene();
let game = new gameScene();
let end = new endScene();

let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    
};

let newgame = new Phaser.Game(config);
newgame.scene.add("menuScene", menu);
newgame.scene.add("gameScene", game);
newgame.scene.add("endScene", end);
newgame.scene.start("menuScene")

