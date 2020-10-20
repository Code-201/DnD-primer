'use strict';
var player;

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

Character.prototype.generateStats = function () {
  for (var i = 0; i < this.statArray.length; i++) {
    var diceValue = [diceValue(6), diceValue(6), diceValue(6)];

    // var diceValue = rollDice();
    console.log(diceValue);


    // Getting sum of numbers
    var sum = diceValue.reduce(function (a, b) {
      return a + b;
    }, 0);

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

function diceValue(sides) {
  return Math.floor((Math.random() * sides)) + 1;

}

//Storage Functions
function retrieveCharacter(storageKey = 'character') { //Normally 'character'
  var characterFromLocalStorage = localStorage.getItem(storageKey);
  console.log('from Storage: ' + characterFromLocalStorage);
  if (characterFromLocalStorage) {
    player = rebuildInstanceForObjLiteral(JSON.parse(characterFromLocalStorage));
    console.log('player: ' + player.name);
  } else {
    //Re run character information through constructor
    player = new Character(parsedCharacter[0].name, parsedCharacter.hitPoints);
    //TODO: What to do if it can't find the object data in storage
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
