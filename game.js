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

  //Scene Globals
  player: undefined,
  cursors: undefined,

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
    this.detailLayer.setDepth(10);

    //creates Player
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'SpawnPoint');
    player = this.physics.add.sprite( spawnPoint.x, spawnPoint.y, 'player', 34);
    player.setBodySize(8, 8, true);
    player.setOffset(8, 22);

    //map colliders
    this.baseLayer.setCollisionByProperty({ Collides: true });
    this.detailLayer.setCollisionByProperty({ Collides: true });
    this.physics.add.collider( player, this.baseLayer);
    this.physics.add.collider( player, this.detailLayer);
   		
	  cursors = this.input.keyboard.createCursorKeys();

    //Creates Camera, asigns it follow player and costrains it to the inside of tilemap
  	const camera = this.cameras.main;
    camera.startFollow(player);
	  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }, 

  update: function (time, delta) {
    const speed = 175;
    const prevVelocity = player.body.velocity.clone();

    // Stop any previous movement from the last frame
    player.body.setVelocity(0);

    // Horizontal movement
    if (cursors.left.isDown) {
      player.body.setVelocityX(-speed);
    } else if (cursors.right.isDown) {
      player.body.setVelocityX(speed);
    }

    // Vertical movement
    if (cursors.up.isDown) {
      player.body.setVelocityY(-speed);
    } else if (cursors.down.isDown) {
      player.body.setVelocityY(speed);
    }

    // Normalize and scale the velocity so that player can't move faster along a diagonal
    player.body.velocity.normalize().scale(speed);

    // Update the animation last and give left/right animations precedence over up/down animations
    if (cursors.left.isDown) {
      player.anims.play("walkLeft", true);
    } else if (cursors.right.isDown) {
      player.anims.play("walkRight", true);
    } else if (cursors.up.isDown) {
      player.anims.play("walkUp", true);
    } else if (cursors.down.isDown) {
      player.anims.play("walkDown", true);
    } else {
      player.anims.stop();

      // If we were moving, pick and idle frame to use
      if (prevVelocity.x < 0){ 
        player.anims.play("standLeft");
      }else if (prevVelocity.x > 0){
        player.anims.play("standRight");
      }else if (prevVelocity.y < 0){
        player.anims.play("standUp");
      }else if (prevVelocity.y > 0){
        player.anims.play("standDown");	
      }
    }
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