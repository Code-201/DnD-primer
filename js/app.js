'use strict';
var player;


function diceValue(sides) {
  return Math.floor((Math.random() * sides)) + 1;
}

function Character(name, hitPoints = 100) {
  //fighter
  this.name = name;
  this.hitPoints = hitPoints;
  this.race = '';
  this.class = 'warrior';
  this.statArray = [0, 0, 0, 0, 0, 0];
  this.modArray = [0, 0, 0, 0, 0, 0];
  //this.skillsArray = [0, 0, 0, 0, 0, 0];
  this.proficiencyBonus = 2;
  this.proficiencyArray = ['intimidate', 'perception', 'str-save', 'con-sav']; //set for Fighter
  this.armor = 8;
  this.weapon = 5;
  this.useTenSided = false;
  this.equipment = [100]; // GOLD
  this.equipmentName = ['Gold'];
  this.speed;

}

Character.prototype.generateAllStats = function () {
  for (var i = 0; i < this.statArray.length; i++) {
    // TO-DO: USE FOUR DICE AND DROP LOWEST NUMBER
    var diceVal = [diceValue(6), diceValue(6), diceValue(6)];

    // var diceValue = rollDice();
    console.log(diceVal);
    // Getting sum of numbers
    var sum = sumArray(diceVal);
    console.log(sum); // Prints: 15
    this.statArray[i] = sum;
  }
  console.log(this.statArray);
};

Character.prototype.modifierCalc = function () {

  for (var i = 0; i < this.statArray.length; i++) {
    this.modArray[i] = Math.floor((this.statArray[i] - 10) / 2);

  }
  console.log(this.modArray);
};

function sumArray(array) {
  var sum = array.reduce(function (a, b) {
    return a + b;
  }, 0);
  return sum;
}

//Storage Functions
function retrieveCharacter(storageKey = 'character') { //Normally 'character'
  var characterFromLocalStorage = localStorage.getItem(storageKey);
  console.log('from Storage: ' + characterFromLocalStorage);
  if (characterFromLocalStorage) {
    player = rebuildInstanceForObjLiteral(JSON.parse(characterFromLocalStorage));
    console.log('player: ' + player.name);
    // } else {
    //   //Re run character information through constructor
    //   player = new Character(parsedCharacter[0].name, parsedCharacter.hitPoints);
    //   //TODO: What to do if it can't find the object data in storage
  }
}



function saveCharacter(charObj, storageKey = 'character') {

  var stringifyArray = JSON.stringify(charObj);
  localStorage.setItem(storageKey, stringifyArray);
  console.log(`Saved Character ${charObj.name} to Storage`);
}

function rebuildInstanceForObjLiteral(parsedObj) {
  player = new Character(parsedObj.name);
  player.name = parsedObj.name;
  player.hitPoints = parsedObj.hitPoints;
  player.race = parsedObj.race;
  player.class = parsedObj.class;
  player.statArray = parsedObj.statArray;
  player.modArray = parsedObj.modArray;
  player.proficiencyBonus = parsedObj.proficiencyBonus;
  player.proficiencyArray = parsedObj.proficiencyArray;
  player.armor = parsedObj.armor;
  player.weapon = parsedObj.armor;
  player.useTenSided = parsedObj.useTenSided;
  player.equipment = parsedObj.equipment; // GOLD
  player.speed = parsedObj.speed;
  return player;
}

function calcRoll(stat, sides, prof) { //stat: array index of the modifier we need, die: max for rollDice function, prof: name of skill used
  // var baseRoll = dieRoll;
  var finalRoll;
  var withMod = diceValue(sides) + player.modArray[stat];

  if (player.proficiencyArray.includes(prof)) {
    //profBool = true;
    finalRoll = withMod + player.proficiencyBonus;
  }
  else {
    finalRoll = withMod;
  }
  return finalRoll;
}