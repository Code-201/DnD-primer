'use strict';
//Global Variables:
//variable for easy access of each section:
var statsSection = document.getElementById('stats');
var diceSection = document.getElementById('diceRoll');

var player;

//Event Listeners:
document.getElementById('rollD20').addEventListener('click', diceRoll);
document.getElementById('rollD10').addEventListener('click', diceRoll);
document.getElementById('rollD8').addEventListener('click', diceRoll);


retrieveCharacter(); //SOF (save our function :( )

//renders the player stats portion of the window
function renderStatsSection() {
  var nameTag = document.createElement('p');
  nameTag.textContent = player.name;
  statsSection.appendChild(nameTag);

  var raceTag = document.createElement('p');
  raceTag.textContent = `Race: ${player.race}`;
  statsSection.appendChild(raceTag);

  var hitTag = document.createElement('p');
  hitTag.textContent = player.hitPoints;
  statsSection.appendChild(hitTag);

  var ulElement = document.createElement('ul');
  statsSection.appendChild(ulElement);
  for (var i = 0; i < player.statArray.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = player.statArray[i];
    ulElement.appendChild(liElement);
  }

  var goldTag = document.createElement('p');
  goldTag.textContent = player.equipment;
  statsSection.appendChild(goldTag);
}

function diceRoll(sides){
  var resultContainer = document.createElement('p');
  var randomNum = diceValue(sides);
  resultContainer.textContent = `D${sides} rolled a ${randomNum}`;
  diceSection.appendChild(resultContainer);
}

renderStatsSection();
