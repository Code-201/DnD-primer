'use strict';

//Global Variables:
//variable for easy access of each section:
var statsSection = document.getElementById('stats');
var diceSection = document.getElementById('diceRoll');
var dmSection = document.getElementById('dmBox');
var recentRoll = 0;



//Event Listeners:
document.getElementById('rollD20').addEventListener('click', function () {
  diceRoll(20);
});
document.getElementById('rollD10').addEventListener('click', function () {
  diceRoll(10);
});
document.getElementById('rollD8').addEventListener('click', function () {
  diceRoll(8);
});
document.getElementById('nextButton').addEventListener('click', renderDmSection);
document.getElementById('nextButton').addEventListener('click', renderUserSection);

//event listener for armor choice div:
document.getElementById('heavyArmorButton').addEventListener('click', handleHeavyArmor);
document.getElementById('lightArmorButton').addEventListener('click', handleLightArmor);

//event listener for acquisition
document.getElementById('steal').addEventListener('click', handleSteal);
document.getElementById('buy').addEventListener('click', handleBuy);
document.getElementById('intimidate').addEventListener('click', handleIntimidate);


// retrieves character info from storage

var player = retrieveCharacter();

//renders the player stats portion of the window
function renderStatsSection() {
  statsSection.innerHTML = '';
  renderPStats();
  renderBaseStats();
}

//Renders all stats connected to P elements
function renderPStats() {

  var statsNames = ['Name: ', 'Race: ', 'Hit Points: ', 'AC: ', 'Gold: '];
  var statsValues = [player.name, player.race, player.hitPoints, player.armor, player.equipment[0]];
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


//Renders dialogue for DM section
var nextClick = 0;
function renderDmSection() {
  var dmDialogue = [`Allo Allo ${player.name}. What can I do for you this fine day?  I have a wide selection of mediocre and slightly below standard armament and cutlery.`, 'How about this beaver\'s helm?  Or this skunk shoe?  Or Or Or this!  An imported replica of a sloth sleeping.', 'Harry sees your confusion, "Ahh, here are two options of weaponry and armor.  Both Kits will increase you DAMAGE OUTPUT and ARMOR CLASS, but the LONG SWORD Kit will most beneficial if you have higher STR, and the  LONGBOW kit will benefit those with higher DEX', 'A fine choice squire!  That should last a few days for sure!', 'How would you like to pay for this gov\'ner?', `Going outside you meet up with the old man, "Well met Master ${player.name} I see you have a nice low level ${player.weaponName}, that should help you, because take a look.  Over there.  No, THERE!  Yep, it's a Dragon!  Nasty one too.Well, there you go, take care of that for us will you ? There's a good chap!  Off you go!  Pip pip!`];
  var scenario = document.getElementById('displayDmDialogue');
  scenario.textContent = dmDialogue[nextClick];
  nextClick++;
}

//Renders dialogue for user section
var nextNext = 0;
function renderUserSection() {
  var usersDialogue = ['You listen to Harry slightly bemused.  He seems really proud of his sub-standard equipment.', 'Wait? What!  This is an ARMOR and WEAPON shop, or at least is is SUPPOSED to be.  You tell Harry you just want something to damage things and something to help you survive', 'Not a lot of choice here, better pick one.', 'Looking at the dented equipment and the worn weaponry, you doubt it was a fine choice.', 'You are at an impasse.  You can try to STEAL it and run (SLEIGHT OF HAND and DEX play into this action), just buy the junk, or try to INTIMIDATE Harry into handing it over (INTIMIDATE and CHA play into this action).  ROLL A D20 and CHOOSE an ACTION', `A @#!$ing DRAGON!  ARE YOU SERIOUS!  With this cheap ${player.weaponName}!  By the gods!  Well, here we go!`];
  var userPrompt = document.getElementById('displayUserDialogue');
  userPrompt.textContent = usersDialogue[nextNext];

  if (nextNext === 2) {

    displayChoice1();
  }

  if (nextNext === 4) {
    displayChoice2();
  }
  if (nextNext === 5) {
    document.getElementById('armorAcquisition').innerHTML = '';
    document.getElementById('attemptResult').innerHTML = '';
  }

  if (nextNext === usersDialogue.length) {
    endDialogue();
  }
  nextNext++;
}

//removes event listener and clears the next button from the page
function endDialogue() {
  document.getElementById('nextButton').removeEventListener('click', renderDmSection);
  document.getElementById('nextButton').removeEventListener('click', renderUserSection);
  document.getElementById('nextButtonContainer').innerHTML = '';
  displayNextPageButton();
}

//displays the button that moves to the next page
function displayNextPageButton() {
  var nextPageForm = document.getElementById('nextPageButtonContainer');
  var nextPageButton = document.createElement('input');
  nextPageButton.setAttribute('type', 'submit');
  nextPageButton.setAttribute('value', 'Onward to battle!');
  nextPageForm.appendChild(nextPageButton);
  saveCharacter(player);
}

//displays buttons for the first user choice
function displayChoice1() {
  var heavyArmorButtonContainer = document.getElementById('heavyArmorButton');
  var lightArmorButtonContainer = document.getElementById('lightArmorButton');

  nextButtonDisabled(true);

  var heavy = document.createElement('button');
  heavy.textContent = 'select heavy armor and long sword';
  heavy.setAttribute('id', 'heavyButton');
  heavyArmorButtonContainer.appendChild(heavy);


  var light = document.createElement('button');
  light.textContent = 'select light armor and long bow';
  lightArmorButtonContainer.appendChild(light);
}

//updates the players armor and weapon stat to reflect newly aquired items
function handleHeavyArmor() {
  //update armor class
  console.log(player.modArray[1]);
  if (player.modArray[1] > 2) {
    player.armor = 14;
  } else {
    player.armor = 12 + player.modArray[1];
  }
  console.log(player.armor);

  //update weapon mod
  player.weapon = player.modArray[0];
  player.weaponName = 'Long Sword';
  console.log(player.modArray[0]);
  console.log(player.weapon);

  console.log(player);

  //remove event listener and buttons
  document.getElementById('heavyArmorButton').removeEventListener('click', handleHeavyArmor);
  document.getElementById('armorChoiceButtons').innerHTML = '';

  nextButtonDisabled(false);

}

//updates the players armor and weapon stat to reflect newly aquired items
function handleLightArmor() {
  //update armor class
  player.armor = 12 + player.modArray[1];
  console.log(player.modArray[1]);
  console.log(player.armor);

  //update weapon mod
  player.weapon = player.modArray[1];
  player.weaponName = 'Longbow';
  console.log(player.modArray[1]);
  console.log(player.weapon);

  //remove event listener and buttons
  document.getElementById('lightArmorButton').removeEventListener('click', handleLightArmor);
  document.getElementById('armorChoiceButtons').innerHTML = '';

  nextButtonDisabled(false);

}

function displayChoice2() {
  var stealContainer = document.getElementById('steal');
  var buyContainer = document.getElementById('buy');
  var intimidateContainer = document.getElementById('intimidate');

  nextButtonDisabled(true);

  var steal = document.createElement('button');
  steal.textContent = 'steal it!';
  stealContainer.appendChild(steal);

  var buy = document.createElement('button');
  buy.textContent = 'pay for it';
  buyContainer.appendChild(buy);

  var intimidate = document.createElement('button');
  intimidate.textContent = 'bully for it';
  intimidateContainer.appendChild(intimidate);

}

function handleSteal() {
  var stealDifficultyClass = 13;
  var calculatedRoll = calcRoll(1, recentRoll, 'sleight of hand');
  var resultsContainer = document.getElementById('attemptResult');
  // if calulated > difficultyclass
  //disable steal and intimidate
  if (calculatedRoll < stealDifficultyClass) {
    resultsContainer.textContent = 'Really?  There is ONE Door.  Just buy it.  I can\'t believe you.';

    document.getElementById('steal').removeEventListener('click', handleSteal);
    document.getElementById('intimidate').removeEventListener('click', handleIntimidate);
  } else {
    renderStatsSection();
    resultsContainer.textContent = 'Success you stole a pile of junk, aren\'t you happy.  Now get OUT of there!';
    nextButtonDisabled(false);
    renderStatsSection();
  }

  console.log(recentRoll);
  console.log(calculatedRoll);
}


function handleIntimidate() {
  var intimidateDifficultyClass = 13;
  var calculatedRoll = calcRoll(1, recentRoll, 'intimidate');
  var resultsContainer = document.getElementById('attemptResult');

  if (calculatedRoll < intimidateDifficultyClass) {
    resultsContainer.textContent = 'Harry just laughs at you.  He is TWICE your size';

    document.getElementById('steal').removeEventListener('click', handleSteal);
    document.getElementById('intimidate').removeEventListener('click', handleIntimidate);
  } else {
    renderStatsSection();
    resultsContainer.textContent = 'Harry\'s eyes shift side to side, and quickly hands over the goods';
    nextButtonDisabled(false);
    renderStatsSection();
  }

  console.log('whatever');

}

function handleBuy() {
  player.equipment[0] = player.equipment[0] - 10;
  renderStatsSection();
  document.getElementById('attemptResult').textContent = 'You dig deep in your EQUIPMENT satchel and buy the kit for 10 GOLD';
  console.log(player.equipment[0]);
  nextButtonDisabled(false);
  renderStatsSection();
}

function nextButtonDisabled(isDisabled) {
  var checkNext = document.getElementById('nextButton');
  if (isDisabled) {
    checkNext.disabled = true;

  } else {
    checkNext.disabled = false;
  }
}

//function calls:
renderStatsSection();
renderDmSection();
renderUserSection();

