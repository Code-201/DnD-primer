'use strict';

//TO-DO: RE SEND CHARACTER DATA TO LOCAL STORAGE TO UPDATE ARMOR/ATTACK/ETC.

//Global Variables:
//variable for easy access of each section:
var statsSection = document.getElementById('stats');
var diceSection = document.getElementById('diceRoll');
var dmSection = document.getElementById('dmBox');

var player;

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


// retrieves character info from storage
retrieveCharacter();

//renders the player stats portion of the window
function renderStatsSection() {
  renderPStats();
  renderBaseStats();
}

//Renders all stats connected to P elements
function renderPStats(){
  var statsNames = ['Name: ', 'Race: ', 'Hit Points: ', 'AC: ', 'Gold: '];
  var statsValues = [player.name, player.race, player.hitPoints, player.armor, player.equipment];
  for(var i =0; i < statsNames.length; i++){
    var newP = document.createElement('p');
    newP.textContent = statsNames[i] + statsValues[i];
    statsSection.appendChild(newP);
  }
}

//Renders all base stats connected to list items
function renderBaseStats(){
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

}

//Renders dialogue for DM section
var nextClick = 0;
function renderDmSection() {
  var dmDialogue = ['dia 0', 'dia 1', 'select armor', 'dia 3', 'armor aquisition strategy', 'dia 5'];
  var scenario = document.getElementById('displayDmDialogue');
  scenario.textContent = dmDialogue[nextClick];
  nextClick++;
}

//Renders dialogue for user section
var nextNext = 0;
function renderUserSection() {
  var usersDialogue = ['user 0', 'user 1', 'select armor', 'user 3', 'armor aquisition strategy', 'user 5'];
  var userPrompt = document.getElementById('displayUserDialogue');
  userPrompt.textContent = usersDialogue[nextNext];

  if(nextNext === 2){
    displayChoice1();
  }

  if (nextNext === usersDialogue.length) {
    endDialogue();
  }
  nextNext++;
}

//removes event listener and clears the next button from the page
function endDialogue(){
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
}

//displays buttons for the first user choice
function displayChoice1(){
  var heavyArmorButtonContainer = document.getElementById('heavyArmorButton');
  var lightArmorButtonContainer = document.getElementById('lightArmorButton');


  var heavy = document.createElement('button');
  heavy.textContent = 'select heavy armor and long sword';
  heavy.setAttribute('id', 'heavyButton');
  heavyArmorButtonContainer.appendChild(heavy);


  var light = document.createElement('button');
  light.textContent = 'select light armor and long bow';
  lightArmorButtonContainer.appendChild(light);
}

//updates the players armor and weapon stat to reflect newly aquired items
function handleHeavyArmor(){
  //update armor class
  console.log(player.modArray[1]);
  if(player.modArray[1] > 2){
    player.armor = 14;
  } else {
    player.armor = 12 + player.modArray[1];
  }
  console.log(player.armor);

  //update weapon mod
  player.weapon = player.modArray[0];
  console.log(player.modArray[0]);
  console.log(player.weapon);

  //remove event listener and buttons
  document.getElementById('heavyArmorButton').removeEventListener('click', handleHeavyArmor);
  document.getElementById('armorChoiceButtons').innerHTML = '';
}

//updates the players armor and weapon stat to reflect newly aquired items
function handleLightArmor(){
  //update armor class
  player.armor = 12 + player.modArray[1];
  console.log(player.modArray[1]);
  console.log(player.armor);

  //update weapon mod
  player.weapon = player.modArray[1];
  console.log(player.modArray[1]);
  console.log(player.weapon);

  //remove event listener and buttons
  document.getElementById('lightArmorButton').removeEventListener('click', handleLightArmor);
  document.getElementById('armorChoiceButtons').innerHTML = '';
}

//function calls:
renderStatsSection();
renderDmSection();
renderUserSection();
