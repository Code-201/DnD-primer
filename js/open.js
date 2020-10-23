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

// retrieves character info from storage
retrieveCharacter();

//renders the player stats portion of the window
function renderStatsSection() {
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

}

//Renders dialogue for DM section
var nextClick = 0;
function renderDmSection() {
  var dmDialogue = ['Now come, come follow me.  Welcome to the town of Radcliffe!  No it is NOT named after Daniel, that upstart was named AFTER THIS TOWN and that is a different story.  The founder\'s  name was Ricardo.  Lovely Man.  He cut his own hair.  This is wonderful town, full of life, liberty and the pursuit of Ale!  Speaking Ale check out the Farting Pony.  We don\'t know why it is called, but it is.', 'Ahhh, here we are the Blacksmith!  Harry is a wonderful gentleman.  Sturdy and strong.  He is known to make the most high-lower end swords and armor in the land.  They are not AMAZING but they can slice watermelons like no ones business.  It also doesn\'t help he is the ONLY blacksmith withing 50 miles.'];
  var scenario = document.getElementById('displayDmDialogue');
  scenario.textContent = dmDialogue[nextClick];
  nextClick++;
}

//Renders dialogue for user section
var nextNext = 0;
function renderUserSection() {
  var usersDialogue = ['You follow behind the old man and observe the Farting Pony, and the wonderful smells that emanate from it.  You think you like here, maybe get a cottage?  Who knows the market is up.', 'You make your way into Harry the Blacksmith\'s shop, and begin to peruse the merchandise.'];
  var userPrompt = document.getElementById('displayUserDialogue');
  userPrompt.textContent = usersDialogue[nextNext];
  nextNext++;


  if (nextNext === usersDialogue.length) {
    endDialogue();
  }
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
  nextPageButton.setAttribute('value', 'Go to the Blacksmith!');
  nextPageForm.appendChild(nextPageButton);
}


renderStatsSection();
renderDmSection();
renderUserSection();
