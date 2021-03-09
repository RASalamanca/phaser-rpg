function Weapon(name, level, variance){
  damage = level * 10;
  this.name = name;
  this.minDamage = damage - (damage * variance);
  this.maxDamade = damage + (damage * variance);
}

function Armor(name, level, healthPoints, defence, thoughness){
  this.name = name;
  his.level = level;
  this.healthPoints = healthPoints;
  this.defence = defence;
  this.thoughness = thoughness;
}

function Skill(name, cost, elements, affinities){
  this.name = name;
  this.elements = elements;
  this.eleAffinity = eleAffinity
  this.cost = cost;
  this.damageMultiplier = ( 0.5 * (cost ^ 2) ) + ( 0.5 * cost);

  //assigns elemental multipliers based on the skill's elements
  var elementalMult = 1 / this.elements.lenght;
  this.fire = this.elements.includes('fire') ? elementalMult : 0;
  this.ice = this.elements.includes('ice') ? elementalMult : 0;
  this.lightning = this.elements.includes('lightning') ? elementalMult : 0;
  this.chaos = this.elements.includes('chaos') ? elementalMult : 0;
  this.physical = this.elements.includes('physical') ? elementalMult : 0;

  //assigns elemental affinities based on the skill's affinities
  var affinitylMult = 1 / this.affinities.lenght;
  this.fireAff = this.affinities.includes('fire') ? affinityMult : 0;
  this.iceAff = this.affinities.includes('ice') ? affinityMult : 0;
  this.lightningAff = this.affinities.includes('lightning') ? affinityMult : 0;
  this.chaosAff = this.affinities.includes('chaos') ? affinityMult : 0;
  this.physicalAff = this.affinities.includes('physical') ? affinityMult : 0;
  
  //only basic damage skills so far.
  this.use = function(user, target){

    //energy cost of the skill
    user.energy -= this.cost;

    //elemental multiplier gains and losses from using the skill
    user.fireMult += this.cost * ( this.fireAff - this.fire);
    user.iceMult += this.cost * ( this.iceAff - this.ice);
    user.lightningMult += this.cost * ( this.lightningAff - this.lightning);
    user.chaosMult += this.cost * ( this.chaosAff - this.chaos);
    user.physicalMult += this.cost * ( this.physicalAff - this.physical);

    //Damage calculations
    var damageRange = ( ser.maxDamade - user.minDamage ) + 1;   //Math.random always returns a number less than 1
    var baseDamage = user.minDamage + Math.floor(Math.random() * damageRange);
    var skillDamage = baseDamage * this.damageMultiplier;        
    var assignedDamage = skillDamage - target.defence;
    var totalDamage = 0

    if( assignedDamage > 0){
      totalDamage += target.fireMult * this.fire * assignedDamage;
      totalDamage += target.iceMult * this.ice * assignedDamage;
      totalDamage += target.lightningMult * this.lightning * assignedDamage;
      totalDamage += target.chaosMult * this.chaos * assignedDamage;
      totalDamage += target.physicalMult * this.physical * assignedDamage;
      target.health -= totalDamage;
      target.defence = 0;
    } else {
      target.defence -= assignedDamage;
    }   
  };
}

function Combatant(name, level, armor, weapon, skills){
  this.name = name;
  this.level = level;
  this.armor = armor;
  this.weapon = weapon;
  this.skills = skills;
  this.maxDefence = armor.defence;
  this.defence = armor.defence;
  this.maxHealth = armor.healthPoints;
  this.health = armor.healthPoints;
  this.thoughness = armor.thoughness;
  this.minDamage = weapon.minDamage;
  this.maxDamage = weapon.maxDamage;  

  //hardcoded values
  this.maxEnergy = 8;
  this.energy = 0;
  this.armorTimer = 0;
  this.fireMult = 1;
  this.iceMult = 1;
  this.lightningMult = 1;
  this.chaosMult = 1;
  this.physicalMult = 1;

  //Methods
  this.checkSkill = function(skill){     //Checks if a skill can be used.
    return this.energy >= skill.cost;
  };

  this.checkDefence = function(){   //Checks if combatant still has defence, and penalises it if it doesn't
    if (this.defence <= 0 && this.armorTimer == 0){
      this.energy = 0;
      this.armorTimer == 2;
    }
    if (this.armorTimer > 0){
      this.armorTimer -= 1;
      this.defence = this.armorTimer == 0 ? this.maxDefence : this.defence;
    }
  };

  this.checkAlive = function(){ 
    return this.health > 0;
  }

  this.startTurn = function(){
    if ( this.checkAlive() ){
      this.checkDefence();
      this.energy += this.energy < this.maxEnergy ? 1 : 0;
    } else {
      console.log( this.name + 'is dead');
    }  
  }
}