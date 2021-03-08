
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
    const speed = 112;
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