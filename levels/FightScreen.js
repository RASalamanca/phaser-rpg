//This is the fight screen UI. 
//It is to be called on combat start.

var FightScreen = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function BootScreen(){
    Phaser.Scene.call(this, {key: 'FightScreen'});
  },

  preload: function () {
    //load up Skilll icons and other UI elements

    //Armor and HP bar elements
    this.load.image( 'ArmorBarFrame', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/PlayerArmorBarBox.png');
    this.load.image( 'ArmorBarBack', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/PlayerArmorBarBack.png');
    this.load.image( 'ArmorBar', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/PlayerArmorBar.png');
    this.load.image( 'Heart', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/Hearth.png');
    this.load.image( 'Star', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/Star.png');
    this.load.image( 'DivisionSign', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/DivisionSign.png');
    this.load.image( 'PercentageSign', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/PercentageSign.png');
    this.load.spritesheet('HPNumbers', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/HPNumbers.png',
    { frameWidth: 8, frameHeight: 10});
    this.load.spritesheet('ArmorNumbers', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/ArmorNumbers.png',
    { frameWidth: 5, frameHeight: 8});

    this.load.image( 'PortraitPlaceholder', 
    'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/UIElements/PlayerPortraitPlaceHolder.png');







  },

  create: function () {
    //Draw UI elements on screen.
  },

  update: function () {

  },

});