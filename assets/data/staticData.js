//This script imports the JSON data, and places it into the corresponding objects.
var armors = [];
var weapons = [];
var skills = [];
var characters = [];

//imports armor data -------------------------------------------
var requestArmor = new XMLHttpRequest();
requestArmor.open('GET', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/data/Armors.json');
requestArmor.responseType = 'json';
requestArmor.send();

//populates armor object ------------------
requestArmor.onload = function(){
  var armorData = requestArmor.response;
  for (const item in armorData){
    armors.push( new Armor( armorData[item].Name, armorData[item].Level, armorData[item].HP, armorData[item].Defence, armorData[item].Thoughness ) );
  }
}

//imports weapon data -------------------------------------------
var requestWeapons = new XMLHttpRequest();
requestWeapons.open('GET', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/data/Weapons.json', true);
requestWeapons.responseType = 'json';
requestWeapons.send();

//populates weapon object --------------------
requestWeapons.onload = function(){
  var weaponData = requestWeapons.response;
  for (const item in weaponData){
    weapons.push( new Weapon( weaponData[item].Name, weaponData[item].Level, weaponData[item].Variance ));
  }
}

//imports skill data ---------------------------------------------
var requestSkills = new XMLHttpRequest();
requestSkills.open('GET', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/data/Skills.json', true);
requestSkills.responseType = 'json';
requestSkills.send();

//populates skills object -------------------
requestSkills.onload = function(){
  var skillsData = requestSkills.response;
  for (const item in skillsData){
    skills.push( new Skill( skillsData[item].Name, skillsData[item].Cost, skillsData[item].Elements, skillsData[item].Affinities ));
  }
}

//imports character data ------------------------------------------
var requestCharacters = new XMLHttpRequest();
requestCharacters.open('GET', 'https://raw.githubusercontent.com/RASalamanca/phaser-rpg/master/assets/data/CharacterSheets.json', true);
requestCharacters.responseType = 'json';
requestCharacters.send();

//populates characters object ----------------------
requestCharacters.onload = function(){
  var charactersData = requestCharacters.response;
  for (const item in charactersData){
    characters.push( new Combatant( charactersData[item].Name, charactersData[item].level, charactersData[item].Armor, charactersData[item].Weapon, charactersData[item].Skills ));
  }
}