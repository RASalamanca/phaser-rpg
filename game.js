//config objet
var config = {
	type: Phaser.AUTO,
	width: 420,
	height: 340,
	parent: 'game-container',
	pixelArt: true,
	zoom: 2,
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

//Game Globals
var controls;

//creates the game and injects the canvas element
var game = new Phaser.Game(config);

function preload () {

	//loads floating island tileset
	this.load.image('Island', '/assets/tilesets/floatingIslands.png');
	this.load.tilemapTiledJSON('map', '/assets/maps/Area2.json');
}

function create () {
	//renders level map
	const map = this.make.tilemap({ key: "map" });
	const tileset = map.addTilesetImage("Island", "Island");
	
	//draws map layers
	this.clifLayer = map.createLayer("Cliffs", tileset, 0, 0);
	this.baseLayer = map.createLayer("Base", tileset, 0, 0);
	this.detailLayer = map.createLayer("Details", tileset, 0, 0);

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