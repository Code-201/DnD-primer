'use strict';
retrieveCharacter();


var dialogArray = [`Congratulations Master ${player.name}! You have successfully defeated the Great Dragon EnemyName from the EnemyOrigin, you are well on your way to becoming a great adventurer! ` +
  ' where does your intrepid soul take you now?', `The long fought battle has ended in tragedy.  ${player.name}, the mighty Dragon EnemyName has thrown you off the battlefield` +
' and you lay upon the ground contemplating you next move.  The fate of this fair village rests with you.  What is your will?'];
var parentDialogElement = document.getElementById('results-dialog');
var parentNavLinksElement = document.getElementById('navigation-links');
var parentImageElement = document.getElementById('image-display');


function generatePage(didWin = false) {
  if (didWin) {
    generateDialog(0);
    generateImage(didWin);
    generateButtons(didWin);
  } else {
    generateDialog(1);
    generateImage(didWin);
    generateButtons(didWin);
  }
}

function generateButtons(didWin = false) {
  if (didWin) {
    returnHomeButton();
  }
  else {
    returnHomeButton();
    returnToBattle();
  }
  wizButton();
}

function generateDialog(index) {
  if (index >= dialogArray.length) {
    console.log('index is greater than the length of dialogArray');
  }
  else {
    parentDialogElement.innerHTML = '';
    var createDialogElement = document.createElement('p');
    createDialogElement.innerHTML = dialogArray[index];
    parentDialogElement.appendChild(createDialogElement);
  }
}

function wizButton() {
  var wizOfCoastButton = document.createElement('input');
  wizOfCoastButton.setAttribute('type', 'button');
  wizOfCoastButton.setAttribute('value', 'Visit Wizards of the Coast');
  wizOfCoastButton.setAttribute('onclick', 'handleWizVisit()');
  parentNavLinksElement.appendChild(wizOfCoastButton);
}

function returnHomeButton() {
  var returnHomeButton = document.createElement('input');
  returnHomeButton.setAttribute('type', 'button');
  returnHomeButton.setAttribute('value', 'Return to Home');
  returnHomeButton.setAttribute('onclick', 'handleReturnHome()');
  parentNavLinksElement.appendChild(returnHomeButton);

}

function returnToBattle() {
  var returnToBattle = document.createElement('input');
  returnToBattle.setAttribute('type', 'button');
  returnToBattle.setAttribute('value', 'Return to Battle');
  returnToBattle.setAttribute('onclick', 'handleReturnToBattle()');
  parentNavLinksElement.appendChild(returnToBattle);

}
function handleWizVisit() {
  window.location.href = 'https://dnd.wizards.com/';
}

function handleReturnHome() {
  window.location.href = '../index.html';
}
function handleReturnToBattle() {
  window.location.href = '../html/battle.html';
}

function generateImage(didWin) {
  var imgElement = document.createElement('img');

  if (didWin) {
    imgElement.setAttribute('src', 'https://kirby.nintendo.com/assets/img/kirby-blast.jpg');
  } else {
    imgElement.setAttribute('src', 'https://upload.wikimedia.org/wikipedia/en/5/52/Star_Fox_SNES.jpg');
  }
  parentImageElement.appendChild(imgElement);
}
///Executable Code
generatePage(player.didWin);
