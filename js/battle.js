'use strict';

var player = retrieveCharacter();
var basicAttackTutorialRun = true;
var dragon = new Enemy('Karl', 200);
player.weaponName = 'Longbow';
var statsSection = document.getElementById('stats');
var usedSecondWind = false;
var recentRoll = 0;

function battleSequence() {

  //Display Actions available to character
  //Have tutorial blurbs
  var standingInstructions = `${player.name} to fight against the ${dragon.name} you can perform a BASIC ATTACK (You know, Attack.. The dragon..), SECOND WIND (One time gain HP), or a DODGE (Try to save your hide)`;
  while (dragon.hitPoints >= 0 || player.hitPoints >= 0) {

    basicAttack();
  }
  //function that runs the dragon's action
  //function that implements player's actions
  //render the player stats every time the HP changes.
  //dice Calculation
}

function basicAttack() {
  debugger;
  var attackPoints;
  var diceName;
  var statName;
  var statNumber;
  if (player.weaponName === 'Longbow') { diceName = 'd6'; }
  else if (player.weaponName === 'Long Sword') { diceName = 'd10'; }



  // playersDice(d10) + modIndex[0] 

  if (basicAttackTutorialRun) {
    var tutorial = `To perform this basic attack with your ${player.weaponName}, you need to roll a ${diceName} and click the \'BASIC ATTACK\' again to apply the damage.`;
    basicAttackTutorialRun = false;
  } else {

    if (player.weaponName === 'Longbow') { statName = 'DEX'; statNumber = player.modArray[1]; attackPoints = calcRoll(1, recentRoll); }
    else if (player.weaponName === 'Long Sword') { statName = 'STR'; statNumber = player.modArray[0]; attackPoints = calcRoll(0, recentRoll); }

    var tutorial = `Ok!  You used your ${player.weaponName} on the ${dragon.name}!  You rolled a ${recentRoll} and added your +${statNumber} ${statName} modifier You did ${attackPoints} damage to ${dragon.name}!  Good Job!`
  }
  console.log(tutorial);

  dragon.hitPoints -= attackPoints;
  console.log('Dragon Health: ' + dragon.hitPoints);
}

function displayActionsAvail() {
  var parentElement = document.getElementById('dialogue');
  //basic attack with sword / bow  <--another function 
  //secondWind - bonusAction 1d10 + con = HP++
  //dodge

}


function renderStatsSection() {
  statsSection.innerHTML = '';
  renderPStats();
  renderBaseStats();
}

//Renders all stats connected to P elements
function renderPStats() {

  var statsNames = ['Name: ', 'Race: ', 'Hit Points: ', 'AC: ', 'Gold: '];
  var statsValues = [player.name, player.race, player.hitPoints, player.armor, player.equipment];
  for (var i = 0; i < statsNames.length; i++) {
    var newP = document.createElement('p');
    newP.textContent = statsNames[i] + statsValues[i];
    statsSection.appendChild(newP);
  }
}

//Renders all base stats connected to list items
function renderBaseStats() {
  var ulElement = document.createElement('ul');
  var statNames = ['STR: ', 'DEX: ', 'CON: ', 'INT: ', 'WIS: ', 'CHA: '];
  statsSection.appendChild(ulElement);
  for (var i = 0; i < player.statArray.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = statNames[i] + player.statArray[i];
    ulElement.appendChild(liElement);
  }
}

//gets base die Roll
function diceRoll(sides) {
  var resultContainer = document.getElementById('displayResult');
  var randomNum = diceValue(sides);
  resultContainer.textContent = `D${sides} rolled a ${randomNum}`;

  recentRoll = randomNum;
  console.log(recentRoll);
}
//Executable Code
console.log('player: ' + player);
console.log('Enemy: ' + dragon);
renderStatsSection();
