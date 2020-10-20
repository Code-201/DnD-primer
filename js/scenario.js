'use strict';

function rollDice(max){
  return Math.floor(Math.random() * (max - 1 + 1) + 1);
}

var questStartSection = document.getElementById('questStart');
var blackSmithSection = document.getElementById('blacksmith');
var dragonSection = document.getElementById('dragon');
var questStartTextArray = ['this is text'];


var characterFromLocalStorage = localStorage.getItem('character');
var parsedCharacter = JSON.parse(characterFromLocalStorage);
var userCharacter = new Character(parsedCharacter[0], 100);


//calculates the users roll based on the randomly generated number
function calcRoll(stat, die, prof){ //stat: array index of the modifier we need, die: max for rollDice function, prof: name of skill used
  var baseRoll = rollDice(die);
  var withMod = baseRoll + Character.modArray[stat];

  for(var i = 0; i < Character.proficiencyArray.length; i++){
    if(prof === Character.proficiencyArray[i]){
      var profBool = true;
    }
  }
  if(profBool === true){
    var finalRoll = withMod + 2;
  }else{
    finalRoll = withMod;
  }
  return finalRoll;
}




