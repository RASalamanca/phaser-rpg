//Boot Scene
//This is the scene we use to declare global information that we reuse trought the Game
//Mostly animation data
var BootScreen = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BootScreen(){
    Phaser.Scene.call(this, {key: 'BootScreen'});
  },

  init: function () {},

  preload: function () {

    //loads up spritesheets
    this.load.spritesheet('player', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/sprites/Zack.png',
    { frameWidth: 24, frameHeight: 32});

    this.load.spritesheet('bandit', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/sprites/Bandido.png',
    { frameWidth: 24, frameHeight: 32});
  },

  create: function () {

    //Player sprite animations
    {
     //Walking animation
     {
        this.anims.create({               // <--Walk Up
          key: 'walkUp',
          frames: this.anims.generateFrameNumbers('player', {start: 9, end: 11}),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({               // <--Walk Right
          key: 'walkRight',
          frames: this.anims.generateFrameNumbers('player', {start: 21, end: 23}),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({               // <--Walk Down
          key: 'walkDown',
          frames: this.anims.generateFrameNumbers('player', {start: 33, end: 35}),
          frameRate: 10,
          repeat: -1
        });
        this.anims.create({               // <--Walk Left
          key: 'walkLeft',
          frames: this.anims.generateFrameNumbers('player', {start: 45, end: 47}),
          frameRate: 10,
          repeat: -1
        });
      }

      //Standing animations
      {
        this.anims.create({               // <--Stand Up
          key: 'standUp',
          frames: [{key: 'player', frame: 10}],
          frameRate: 20,
        });
        this.anims.create({               // <--Stand Right
          key: 'standRight',
          frames: [{key: 'player', frame: 22}],
          frameRate: 20,
        });
        this.anims.create({               // <--Stand Down
          key: 'standDown',
          frames: [{key: 'player', frame: 34}],
          frameRate: 20,
        });
        this.anims.create({               // <--Stand Left
          key: 'standLeft',
          frames: [{key: 'player', frame: 46}],
          frameRate: 20,
        });
      }
    }

    //Tittle Screen Text
    const titleText = this.add.text(55, 100, "PHASER RPG", {fill: '#ffffff', fontSize: 48} );

    //Start Button
    const startButton = this.add.text(175, 200, "Start", {fill: '#ff0000'} );
    startButton.setInteractive( { useHandCursor: true });    
    startButton.on('pointerover', () => { startButton.setBackgroundColor("#ffffff") });
    startButton.on('pointerout', () => { startButton.setBackgroundColor("#000000") });
    startButton.on('pointerdown', () => { this.scene.start('FloatingIsland'); });

    //Switch to Game
//    this.time.addEvent({
//      delay: 100,
//      loop: false,
//      callback: () => {
//        this.scene.start('FloatingIsland');
//      }
//    });
  },

  update: function () {  
  },
});