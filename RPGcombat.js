class Weapon {
  constructor(name, level, variance) {
    var damage = level * 10;
    this.name = name;
    this.minDamage = damage - (damage*variance);
    this.maxDamade = damage + (damage*variance);
  }
}

class Armor {
  constructor(name, level, healthPoints, defence, thoughness) {
    this.name = name;
    this.level = level; 
    this.healthPoints = healthPoints;
    this.defence =  defence;
    this.thoughness = thoughness;
  }
}

class Skill {
  constructor( name, cost, elements, affinities) {
    this.name = name;
    this.elements = elements;
    this.eleAffinity = affinities;
    this.cost = cost;
    this.damageMultiplier = ( 0.5 * (cost ^ 2) ) + ( 0.5 * cost);
      
    //assigns elemental multipliers based on the skill's elements
    var elementalMult = 1 / this.elements.length;
    this.fire = this.elements.includes('fire') ? elementalMult : 0;
    this.ice = this.elements.includes('ice') ? elementalMult : 0;
    this.lightning = this.elements.includes('lightning') ? elementalMult : 0;
    this.chaos = this.elements.includes('chaos') ? elementalMult : 0;
    this.physical = this.elements.includes('physical') ? elementalMult : 0;

    //assigns elemental affinities based on the skill's affinities
    var affinityMult = 1 / this.eleAffinity.length;
    this.fireAff = this.eleAffinity.includes('fire') ? affinityMult : 0;
    this.iceAff = this.eleAffinity.includes('ice') ? affinityMult : 0;
    this.lightningAff = this.eleAffinity.includes('lightning') ? affinityMult : 0;
    this.chaosAff = this.eleAffinity.includes('chaos') ? affinityMult : 0;
    this.physicalAff = this.eleAffinity.includes('physical') ? affinityMult : 0;
  }

  //only basic damage skills so far.
  use( user, target) {

    //energy cost of the skill
    user.energy -= this.cost;

    //elemental multiplier gains and losses from using the skill
    user.fireMult += 0.25 * this.cost * ( this.fireAff - this.fire);
    user.iceMult += 0.25 * this.cost * ( this.iceAff - this.ice);
    user.lightningMult += 0.25 * this.cost * ( this.lightningAff - this.lightning);
    user.chaosMult += 0.25 * this.cost * ( this.chaosAff - this.chaos);
    user.physicalMult += 0.25 * this.cost * ( this.physicalAff - this.physical);

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

class Combatant {
  constructor(name, level, armor, weapon, skills) {
    this.name = name;
    this.level = level;
    this.armor = armor;
    this.weapon = weapon;
    this.skills = skills;
    this.maxDefence = this.armor.defence;
    this.defence = this.armor.defence;
    this.maxHealth = this.armor.healthPoints;
    this.health = this.armor.healthPoints;
    this.thoughness = this.armor.thoughness;
    this.minDamage = weapon.minDamage;
    this.maxDamage = weapon.maxDamage;

    //hardcoded values
    this.maxEnergy=8;
    this.energy=0;
    this.armorTimer=0;
    this.fireMult=1;
    this.iceMult=1;
    this.lightningMult=1;
    this.chaosMult=1;
    this.physicalMult=1;
  }

//Methods
  equipArmor(item) {
    if(this.level >= item.level) {
      this.weapon = item;
      this.minDamage = weapon.minDamage;
      this.maxDamage = weapon.maxDamage;
    } else {
      console.log('too weak...');
    }
  }

  equipWeapon(item) {
    if(this.level >= item.level) {
      this.armor = item;
      this.maxDefence = armor.defence;
      this.defence = armor.defence;
      this.maxHealth = armor.healthPoints;
      this.health = armor.healthPoints;
      this.thoughness = armor.thoughness;
    } else {
      console.log('too weak...');
    }
  }

  checkSkill(skill) {
    return this.energy>=skill.cost;
  }

  checkDefence() {
    if(this.defence <= 0 && this.armorTimer == 0) {
      this.energy = 0;
      this.armorTimer = 2;
    }
    if(this.armorTimer > 0) {
      this.armorTimer -= 1;
      this.defence = this.armorTimer == 0 ? this.maxDefence : this.defence;
    }
  }

  checkAlive() {
    return this.health > 0;
  };

  startTurn() {
    if(this.checkAlive()) {
      this.checkDefence();
      this.energy+=this.energy<this.maxEnergy? 1:0;
    } else {
      console.log(this.name+'is dead');
    } 
  }

}
