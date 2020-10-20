'use strict';

// function rollDice(max){
//   return Math.floor(Math.random() * (max - 1 + 1) + 1);
// }

//Global variables for each section
var questStartSection = document.getElementById('questStart');
var blackSmithSection = document.getElementById('blacksmith');
var dragonSection = document.getElementById('dragon');
//Arrays with text for each section
var questStartTextArray = ['this is text'];
//Array to hold most recent die roll
var roll20Result = 0;

//Retrieve Character information from local storage
// var characterFromLocalStorage = localStorage.getItem('character');
// var parsedCharacter = JSON.parse(characterFromLocalStorage);
// //Re run character information through constructor
// var userCharacter = new Character(parsedCharacter[0]);

// object name is 'player'
retrieveCharacter();

//calculates the users roll based on the randomly generated number
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

//event listeners
// document.getElementById('D20').addEventListener('click', handleD20);
// document.getElementById('D10').addEventListener('click', handleD10);
// document.getElementById('D8').addEventListener('click', handleD8);

//renders the entire questStart section
// function renderQuestStart(){

// }

// renders the DM box div of the quest start section
function renderQuestStartDMBox() {
  //tracks how many lines of dialogue have been displayed
  var buttonClickTracker = 0;
  //grabs section and appends p element
  var base = document.getElementById('questStartDMBox');
  var text = document.createElement('p');
  //fills text element with text from array
  text.textContent(questStartTextArray[buttonClickTracker]);
  //append text to element
  base.appendChild(text);
  //increments variable
  buttonClickTracker++;
}

function handleD20() {
  var randomNumber = diceValue(20);
  roll20Result = randomNumber;
}

/// Execution Code <<--Gnarly-->>

console.log('Roll Dice from app.js: ' + diceValue(10));
console.log('in scenario player: ' + player);



