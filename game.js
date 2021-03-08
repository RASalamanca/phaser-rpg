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