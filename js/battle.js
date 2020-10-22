'use strict';

var player = retrieveCharacter();
var basicAttackTutorialRun = true;
var secondWinRunTutorial = true;
var dragon = new Enemy('Karl', 20);
var statsSection = document.getElementById('stats');
var usedSecondWind = false;
var recentRoll = 1;
var inBattle = false;
var dodgeSuccess = false;
var saveThrow = false;
var saveThrowValue = 0;

function checkEndGame() {

  if (player.hitPoints <= 0 || dragon.hitPoints <= 0) {
    var parentElement = document.getElementById('dmBox');
    var endofgameButton = document.createElement('input');
    endofgameButton.setAttribute('type', 'button');
    endofgameButton.setAttribute('onclick', 'offWeGo()');
  }

  if (player.hitPoints <= 0) {
    console.log('The Battle has Been Lost!');
    inBattle = false;
    endofgameButton.setAttribute('value', 'YOU FAILED');
    shutAllButtonsDown(true);
    parentElement.appendChild(endofgameButton);
  } else if (dragon.hitPoints <= 0) {
    console.log(`${player.name}, the battle has been consummated. You are victorious!`);
    endofgameButton.setAttribute('value', 'YOU WON!');
    inBattle = false;
    shutAllButtonsDown(true);
    parentElement.appendChild(endofgameButton);
  }

  console.log('Dragon Hitpoints: ' + dragon.hitPoints);
  console.log('Player Hitpoints' + player.hitPoints);
}
function offWeGo() {
  window.location.href = '../html/results.html';
}

function dragonAttack() {

  var dialogue = `Dragon Attacks!`;
  var attackDamage = 0;
  if (!dragon.usedFireBreath) {
    if(!saveThrow){
      saveThrow = true;
      dialogue += 'The dragon leans forward and opens his large toothy mouth. As the heat starts pooling around you, you realize he is preparing for a fiery breath attack! Make a DEXTERITY SAVING THROW to avoid some of the damage! (Roll a D20, and we will add your dexterity mod for you.)';
      renderSaveThrowButton();
    }else{
      for (var i = 0; i < 2; i++) {
        attackDamage += diceValue(6);
      }
      if(saveThrowValue < 12){
        dragon.usedFireBreath = true;
        dialogue += ` You fail your saving throw! He heaves his mighty frame, and spew out his mouth and nose pure fire from hell!  He deals ${attackDamage} to you!`;
      }else{
        dragon.usedFireBreath = true;
        attackDamage = Math.floor(attackDamage / 2);
        dialogue += ` The fire blast blows around you but you dodge behind a rock at the last second and reduce some damage. He only hits you for ${attackDamage} damage.`;
      }
      document.getElementById('saveThrowButtonContainer').innerHTML = '';
    }
  } else {

    attackDamage = diceValue(6) + dragon.str;
    dialogue += ` He lunges forward and wraps his maw around you frame and crunches you pancreas for ${attackDamage} point of damage!`;
  }
  if (dodgeSuccess === true) {
    attackDamage = Math.floor(attackDamage / 2);
    dialogue += `But you hid your pitiful self behind a rock and he only dealt ${attackDamage} of damage to you!`;
    dodgeSuccess = false;
  }
  player.hitPoints -= attackDamage;
  renderStatsSection();
  document.getElementById('dragon-speak').innerHTML = dialogue;
}

function renderSaveThrowButton(){
  var saveThrowButton = document.createElement('input');
  saveThrowButton.setAttribute('value', 'Saving Throw');
  saveThrowButton.setAttribute('type', 'button');
  saveThrowButton.setAttribute('onclick', 'handleSaveThrow()');
  document.getElementById('saveThrowButtonContainer').appendChild(saveThrowButton);
}

function handleSaveThrow(){
  console.log('I live!');
  saveThrowValue = recentRoll + player.modArray[1];
  dragonAttack();
}

function basicAttack() {
  var attackPoints;
  attackPoints = calcRoll(1, recentRoll);
  var diceName;
  var statName;
  var statNumber;
  if (player.weaponName === 'Longbow') { diceName = 'd6'; }
  else if (player.weaponName === 'Long Sword') { diceName = 'd10'; }

  if (basicAttackTutorialRun) {
    var tutorial = `To perform this basic attack with your ${player.weaponName}, you need to roll a ${diceName} and click the \'BASIC ATTACK\' again to apply the damage.`;
    basicAttackTutorialRun = false;
    attackPoints = 0;
  } else {
    /// Pulling Negative Modifiers Out with Longbow
    if (player.weaponName === 'Longbow') {
      statName = 'DEX';
      statNumber = player.modArray[1];
      attackPoints = calcRoll(1, recentRoll);
    }
    else if (player.weaponName === 'Long Sword') {
      statName = 'STR';
      statNumber = player.modArray[0];
      attackPoints = calcRoll(0, recentRoll);
    }

    var tutorial = `Ok!  You used your ${player.weaponName} on the ${dragon.name}!  You rolled a ${recentRoll} and added your +${statNumber} ${statName} modifier You did ${attackPoints} damage to ${dragon.name}!  Good Job!`;
    dragonAttack();
  }
  document.getElementById('dynamic-dialogue').innerHTML = tutorial;
  //

  //

  dragon.hitPoints -= attackPoints;

  checkEndGame();

}

function cower() {
  var dialogue;
  console.log('Attempting to Cower');
  if (recentRoll >= 10) {
    dialogue = `Good job putting your head in the sand!  When ${dragon.name} attacks next, you will receive half damage!`;
    dodgeSuccess = true;
  } else {
    dialogue = `Awww.  Your to slow.  You can't cower in fear this time!`;
  }
  document.getElementById('dynamic-dialogue').innerHTML = dialogue;
  document.getElementById('dragon-speak').innerHTML = '';
  dragonAttack();
}

function secondWind() {

  if (!usedSecondWind) {
    player.hitPoints += recentRoll + player.modArray[2];
    document.getElementById('dynamic-dialogue').innerHTML = `You received your second wind!  Your CON modifier: ${player.modArray[2]} +  your roll of ${recentRoll} gains raises your HP to ${player.hitPoints}`;
    //
    document.getElementById('dragon-speak').innerHTML = '';
    //
    usedSecondWind = true;
    buttonDisable('secondWind', true);
    renderStatsSection();
  }
}
function shutAllButtonsDown(isShutdown) {
  buttonDisable('secondWind', isShutdown);
  buttonDisable('basicAttack', isShutdown);
  buttonDisable('dodge', isShutdown);
  buttonDisable('rollD20', isShutdown);
  buttonDisable('rollD10', isShutdown);
  buttonDisable('rollD8', isShutdown);

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

function buttonDisable(elementButton, isDisabled) {
  var buttonSwitch = document.getElementById(elementButton);
  buttonSwitch.disabled = isDisabled;
}
function whoAttacksFirst() {
  var init = diceValue(20) + player.modArray[1];
  console.log('Initiative Roll: ' + init);
  if (init < 13) {
    dragonAttack();
  }
}
//Executable Code
renderStatsSection();
whoAttacksFirst();
