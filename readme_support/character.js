'use strict';

function Character(name, hitPoints = 100) {
  this.name = name;
  this.hitPoints = hitPoints;
  this.race = '';
  this.class = 'warrior';
  this.statArray = [0, 0, 0, 0, 0, 0];
  this.modArray = [0, 0, 0, 0, 0, 0];
  this.proficiencyBonus = 2;
  this.proficiencyArray = [];
  this.armor = 8;
  this.weapon = 5;
  this.useTenSided = false;
  this.equipment = [100]; // GOLD
  this.speed;

}
