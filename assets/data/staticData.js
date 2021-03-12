//This script imports the JSON data, and places it into the corresponding objects.
var armors = [];
var weapons = [];
var skills = [];
var characters = [];

//imports armor data -------------------------------------------
const requestArmor = new XMLHttpRequest();
requestArmor.open('GET', '/data/Armors.json');
requestArmor.responseType = 'json';
requestArmor.send();

//populates armor object ------------------
requestArmor.onload = function(){
  const armorData = requestArmor.response;
  for (const item in armorData){
    armors.push( Armor( item.Name, item.Level, item.HP, item.Defence, item.Thoughness ));
  }
}

//imports weapon data -------------------------------------------
const requestWeapons = new XMLHttpRequest();
requestWeapons.open('GET', '/data/Weapons.json');
requestWeapons.responseType = 'json';
requestWeapons.send();

//populates weapon object --------------------
requestWeapon.onload = function(){
  const weaponData = requestWeapons.response;
  for (const item in weaponData){
    weapons.push( Weapon( item.Name, item.Level, item.Variance ));
  }
}

//imports skill data ---------------------------------------------
const requestSkills = new XMLHttpRequest();
requestSkills.open('GET', '/data/Skills.json');
requestSkills.responseType = 'json';
requestSkills.send();

//populates skills object -------------------
requestSkills.onload = function(){
  const skillsData = requestSkills.response;
  for (const item in skillsData){
    skills.push( Skill( item.Name, item.Level, item.Elements, item.Affinities));
  }
}

//imports character data ------------------------------------------
const requestCharacters = new XMLHttpRequest();
requestCharacters.open('GET', '/data/CharacterSheets.json');
requestCharacters.responseType = 'json';
requestSkills.send();

//populates characters object ----------------------
requestCharacters.onload = function(){
  const charactersData = requestCharacters.response;
  for (const item in charactersData){
    characters.push( Combatant( item.Name, item.level, item.Armor, item.Weapon, item.Skills ));
  }
}