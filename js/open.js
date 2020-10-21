'use strict';
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

document.getElementById('button').addEventListener('click',);



retrieveCharacter(); //SOF (save our function :( )

//renders the player stats portion of the window
function renderStatsSection() {
  var nameTag = document.createElement('p');
  nameTag.textContent = 'Name: ' + player.name;
  statsSection.appendChild(nameTag);

  var raceTag = document.createElement('p');
  raceTag.textContent = `Race: ${player.race}`;
  statsSection.appendChild(raceTag);

  var hitTag = document.createElement('p');
  hitTag.textContent = 'Hit Points: ' + player.hitPoints;
  statsSection.appendChild(hitTag);

  var ulElement = document.createElement('ul');
  var statNames = ['STR: ', 'DEX: ', 'CON: ', 'INT: ', 'WIS: ', 'CHA: ']
  statsSection.appendChild(ulElement);
  for (var i = 0; i < player.statArray.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = statNames[i] + player.statArray[i];
    ulElement.appendChild(liElement);
  }

  var goldTag = document.createElement('p');
  goldTag.textContent = 'Gold: ' + player.equipment;
  statsSection.appendChild(goldTag);
}

function diceRoll(sides) {
  var resultContainer = document.getElementById('displayResult');
  var randomNum = diceValue(sides);
  resultContainer.textContent = `D${sides} rolled a ${randomNum}`;

}


var nextClick = 0;
function renderDmSection() {
  var dmDialogue = ['dia 1 ', 'dia 2 ', 'dia 3 '];
  var scenario = document.getElementById('displayDmDialogue');
  scenario.textContent = dmDialogue[nextClick];
  nextClick++;

}

var nextNext = 0;
function renderUserSection() {
  var usersDialogue = ['user 1 ', 'user 2 ', 'user 3 '];
  var userPrompt = document.getElementById('displayUserDialogue');
  userPrompt.textContent = usersDialogue[nextNext];
  nextNext++;


  if (nextNext === usersDialogue.length) {
    document.getElementById('nextButton').removeEventListener('click', renderDmSection);
    document.getElementById('nextButton').removeEventListener('click', renderUserSection);
    document.getElementById('nextButtonContainer').innerHTML = '';
    displayNextPageButton();
  }
}
function displayNextPageButton() {
  var nextPageContainer = document.getElementById('nextPageButtonContainer');
  var nextPageButton = document.createElement('button');
  nextPageButton.textContent = 'Go to the Blacksmith!';
  nextPageContainer.appendChild(nextPageButton);
}


renderStatsSection();
renderDmSection();
renderUserSection();
