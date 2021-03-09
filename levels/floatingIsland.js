//Main Scene
var FloatingIsland = new Phaser.Class({
  Extends: Phaser.Scene,
  
  initialize: function FloatingIsland(){
    Phaser.Scene.call(this, {key: 'FloatingIsland'});
  },

  //Scene Globals
  player: undefined,
  cursors: undefined,
  fogLayer: undefined,

  init: function () {},

  preload: function () {
    //Loads fog texture (current texture is only a placeholder)
    this.load.image('fog', 'https://genekogan.com/code/p5js-perlin-noise/perlin2.png');
        
  	//loads floating island tileset & Tilemap
  	this.load.image('Island', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/tilesets/floatingIslands.png');
  
  	this.load.tilemapTiledJSON('map', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/maps/Area2.json');
  },

  create: function () {
    
  	//level map
  	const map = this.make.tilemap({ key: "map" });
  	const tileset = map.addTilesetImage("Island", "Island");
	
	  //draws map layers
	  this.cliffUnderLayer = map.createLayer("CliffsUnder", tileset, 0, 0);
    this.cliffBelowLayer = map.createLayer("CliffsBelow", tileset, 0, 0);
    fogLayer = this.add.tileSprite(300, 360, 840, 720, 'fog');
    fogLayer.setAlpha(0.34, 0.24, 0.41, 0.31);
    //fogLayer.setAlpha(0.34, 0.34, 0.34, 0.34);
    fogLayer.setScrollFactor(0, 1);
    this.baseLayer = map.createLayer("Base", tileset, 0, 0);
    this.baseUpperLayer = map.createLayer("BaseUpper", tileset, 0, 0);
	  this.detailLayer = map.createLayer("Details", tileset, 0, 0);
    this.detailLayer.setDepth(20);

    //Creates Player
    //The drawing order should depend on the Y cordinate, but that is to complicated.
    //Instead, we make an extra hitbox called Playerhead to check where does the terrain overlap with the 
    //player sprite, and adjust the draw order accordingly. 
    const spawnPoint = map.findObject('Objects', obj => obj.name === 'SpawnPoint');
    player = this.physics.add.sprite( spawnPoint.x, spawnPoint.y, 'player', 34);
    player.setBodySize(8, 8, true);
    player.setOffset(8, 24);


    //map colliders
    this.cliffBelowLayer.setCollisionByProperty({ Collides: true });
    this.baseLayer.setCollisionByProperty({ Collides: true });
    this.baseUpperLayer.setCollisionByProperty({ Collides: true });
    this.detailLayer.setCollisionByProperty({ Collides: true });
    this.physics.add.collider( player, this.cliffBelowLayer);
    this.physics.add.collider( player, this.baseLayer);
    this.physics.add.collider( player, this.baseUpperLayer);
    this.physics.add.collider( player, this.detailLayer);

    //Assigns cursors
	  cursors = this.input.keyboard.createCursorKeys();

    //Creates Camera, asigns it follow player and costrains it to the inside of tilemap
  	const camera = this.cameras.main;
    camera.setBackgroundColor('#03021c');
    camera.startFollow(player);
	  camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
  }, 

  update: function (time, delta) {

    //fogLayer.setTilePosition();
    fogLayer.tilePositionX += 5;
    fogLayer.tilePositionY -= 2;

    //Player controls---------------------------------------------------
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