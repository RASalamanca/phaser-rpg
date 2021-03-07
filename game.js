//Boot Scene
//This is the scene we use to delcare global information that we reuse trought the Game
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
          key: 'StandUp',
          frames: [{key: 'player', frame: 10}],
          frameRate: 20,
        });
        this.anims.create({               // <--Stand Right
          key: 'StandRight',
          frames: [{key: 'player', frame: 22}],
          frameRate: 20,
        });
        this.anims.create({               // <--Stand Down
          key: 'StandDown',
          frames: [{key: 'player', frame: 34}],
          frameRate: 20,
        });
        this.anims.create({               // <--Stand Left
          key: 'StandLeft',
          frames: [{key: 'player', frame: 46}],
          frameRate: 20,
        });
      }
    }

    //Switch to Game
    this.time.addEvent({
      delay: 10,
      loop: false,
      callback: () => {
        this.scene.start('FloatingIsland');
      }
    });
  },

  update: function () {},
});

//Main Scene
var FloatingIsland = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function FloatingIsland(){
    Phaser.Scene.call(this, {key: 'FloatingIsland'});
  },

  init: function () {},

  preload: function () {
        
  	//loads floating island tileset & Tilemap
  	this.load.image('Island', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/tilesets/floatingIslands.png');
  
  	this.load.tilemapTiledJSON('map', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/maps/Area2.json');
  },

  create: function () {
    
  	//renders level map
  	const map = this.make.tilemap({ key: "map" });
  	const tileset = map.addTilesetImage("Island", "Island");
	
	  //draws map layers
	  this.clifLayer = map.createLayer("Cliffs", tileset, 0, 0);
	  this.baseLayer = map.createLayer("Base", tileset, 0, 0);
	  this.detailLayer = map.createLayer("Details", tileset, 0, 0);

    //creates Player
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'SpawnPoint');
    var player = this.physics.add.sprite( spawnPoint.x, spawnPoint.y, 'player', 34);

    //map colliders
    this.baseLayer.setCollisionByProperty({ Collides: true });
    this.detailLayer.setCollisionByProperty({ Collides: true });
   
  	//Creates Camera and camera controls
  	const camera = this.cameras.main;
		
	  const cursors = this.input.keyboard.createCursorKeys();
	  controls = new Phaser.Cameras.Controls.FixedKeyControl({
  		camera: camera,
	    left: cursors.left,
		  right: cursors.right,
		  up: cursors.up,
		  down: cursors.down,
		  speed: 0.5
		});

	  //costrains camera to the inside of tilemap
	  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }, 

  update: function (time, delta) {

	  //apply the controls to the camera each tick of the game
	  controls.update(delta);
	
  }
});

//Game config objet
var config = {
	type: Phaser.AUTO,
	width: 420,
	height: 340,
	parent: 'game-container',
	pixelArt: true,
	zoom: 2,
  physics: {
    default: "arcade",
    gravity: { y: 0}
  },
  scene: [BootScreen, FloatingIsland]
};

//creates the game and injects the canvas element
var game = new Phaser.Game(config);