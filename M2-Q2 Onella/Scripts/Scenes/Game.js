export default class gameScene extends Phaser.Scene
{

    constructor(){
        super("gameScene");
    }

    init(){
        this.lives = 3
        this.score =0;
        this.scoreText;
        this.livesText;
    }

    preload ()
    {
        this.load.image('background', './Assets/Images/space.jpg ');
        this.load.spritesheet('ship', './Assets/Sprites/ship.png', { frameWidth: 89, frameHeight: 110 });
        this.load.spritesheet('meteor', './Assets/Sprites/meteor.png',{frameWidth: 192, frameHeight: 156});
        this.load.spritesheet('bomb','./Assets/Sprites/bomb.png', {frameWidth: 484, frameHeight:600 });
        this.load.spritesheet('blaster', './Assets/Sprites/bullet.png', {frameWidth: 20, frameHeight: 30});
        this.load.audio('spaceNoise','./Assets/Sounds/SpaceAmbiance.mp3');
        this.load.audio('exp','./Assets/Sounds/Explode.wav');
        this.load.audio('blast','./Assets/Sounds/Blaster.mp3');
    }

    create(){
        this.add.image(400, 300, 'background').setScale (2,2.5);
        this.spaceNoise = this.sound.add('spaceNoise');
        this.laser = this.sound.add('blast');
        this.explode = this.sound.add('exp');

        let soundConfig ={
            mute: false,
            volume: 0.8,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }

        this.spaceNoise.play(soundConfig);

        this.cursors = this.input.keyboard.createCursorKeys();
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //player
        this.ship = this.physics.add.sprite(400,750, 'ship');
        this.ship.setCollideWorldBounds(true);
        

        this.bomb1 = this.physics.add.sprite(Phaser.Math.Between(50,950), -150, 'bomb').setScale(0.2);
        this.bomb2 = this.physics.add.sprite(Phaser.Math.Between(50,950), -150, 'bomb').setScale(0.2);
        this.bomb3 = this.physics.add.sprite(Phaser.Math.Between(50,950), -150, 'bomb').setScale(0.2);

        this.bombs = this.physics.add.group();
        this.bombs.add(this.bomb1);
        this.bombs.add(this.bomb2);
        this.bombs.add(this.bomb3);
        

        this.meteor1 = this.physics.add.sprite(Phaser.Math.Between(50,950), -100, 'meteor').setScale(1);
        this.meteor2 = this.physics.add.sprite(Phaser.Math.Between(50,950), -100, 'meteor').setScale(1.2);
        this.meteor3 = this.physics.add.sprite(Phaser.Math.Between(50,950), -100, 'meteor').setScale(0.8);
        
      
        this.meteors = this.physics.add.group();
        this.meteors.add(this.meteor1);
        this.meteors.add(this.meteor2);
        this.meteors.add(this.meteor3);
        

        this.livesText = this.add.text(250,40, 'Lives:' + this.lives, {font: '24px'})
        this.scoreText = this.add.text(650,40, 'Score:' + this.score, {font: '24px'})



        this.physics.add.overlap(this.ship,this.bombs, this.loseLife, null, this);
        this.physics.add.overlap(this.ship,this.meteors, this.loseLife2, null, this);

    }

    update(){
        if (this.cursors.left.isDown) {
            this.ship.setVelocityX(-300);
        }
        else if (this.cursors.right.isDown) {
            this.ship.setVelocityX(300);
        }
        else {
            this.ship.setVelocityX(0);
        }

        if (Phaser.Input.Keyboard.JustDown(this.spacebar)) {

            this.blasters = this.physics.add.sprite(this.ship.x, this.ship.y-30, 'blaster');
            this.laser.play();
            this.blasters.setVelocityY(-500);

            this.physics.add.overlap(this.blasters, this.meteors, this.exp, null, this);

            }

        this.moveBomb(this.bomb1, 1.25)
        this.moveBomb(this.bomb2, 2)
        this.moveBomb(this.bomb3, 2.5)
        this.moveMeteor(this.meteor1, 1.2)
        this.moveMeteor(this.meteor3, 1)
        this.moveMeteor(this.meteor2, 0.8)

    }

    loseLife(ship,bomb)
    {
        this.explode.play();
        this.resetBomb(bomb);
        this.ship.x = 400;
        this.ship.y = 750;
        this.lives -= 1;
        this.livesText.setText('Lives' + this.lives);
        if (this.lives == 0){
            this.spaceNoise.stop();
            this.physics.pause();
            this.scene.start('endScene', {score: this.score});
        }

    }

    loseLife2(ship,meteor)
    {
        this.explode.play();
        this.resetMeteor(meteor);
        this.ship.x = 400;
        this.ship.y = 450;
        this.lives -= 1;
        this.livesText.setText('Lives' + this.lives);
        if (this.lives == 0){
            this.spaceNoise.stop();
            this.physics.pause();
            this.scene.start('endScene', {score: this.score});
        }

    }

    exp(blasters,meteor) 
    {
        blasters.destroy();
        this.resetMeteor(meteor);
    
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        if(this.score == 25) {
            this.spaceNoise.stop()
            this.scene.start("endScene", {score: this.score});
        }
    }

    resetMeteor(meteor)
    {
        meteor.y = -150;
        let random = Phaser.Math.Between(150,700);
        meteor.x = random;
    }

    resetBomb(bomb){
        bomb.y = -150;
        let random = Phaser.Math.Between(150,700);
        bomb.x = random;

    }

    moveMeteor(meteor,speed){
        if (meteor.y > 970){
            this.resetMeteor(meteor);
        }
        meteor.y += speed;
    }

    moveBomb(bomb,speed){
        if (bomb.y > 970){
            this.resetBomb(bomb);
        }
        bomb.y += speed;
    }
        
    }

    

