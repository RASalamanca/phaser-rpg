//config objet
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
  scene: {
		preload: preload,
		create: create,
		update: update
	}
};

//Scene Globals
var controls;

//creates the game and injects the canvas element
var game = new Phaser.Game(config);

function preload () {

	//loads floating island tileset & Tilemap
	this.load.image('Island', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/tilesets/floatingIslands.png');
  
	this.load.tilemapTiledJSON('map', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/maps/Area2.json');

  //loads up spritesheets
  this.load.spritesheet('player', 
  'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/sprites/Zack.png',
  { frameWidth: 24, frameHeight: 32});

  this.load.spritesheet('bandit', 
  'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/sprites/Bandido.png',
  { frameWidth: 24, frameHeight: 32});
}

function create () {
	//renders level map
	const map = this.make.tilemap({ key: "map" });
	const tileset = map.addTilesetImage("Island", "Island");
	
	//draws map layers
	this.clifLayer = map.createLayer("Cliffs", tileset, 0, 0);
	this.baseLayer = map.createLayer("Base", tileset, 0, 0);
	this.detailLayer = map.createLayer("Details", tileset, 0, 0);

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
}

function update (time, delta) {

	//apply the controls to the camera each tick of the game
	controls.update(delta);
	
}