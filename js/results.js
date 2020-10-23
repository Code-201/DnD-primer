'use strict';
retrieveCharacter();


var dialogArray = [`Congratulations Master ${player.name}! You have successfully defeated the somewhat good Dragon Karl!  You are slowly making your way to becoming a great adventurer! Well then, where does your intrepid soul take you now?`, `The battle has ended in tragedy.  I suppose it makes sense with Harry's mediocre armament.  It did almost all fall off after the first attack.  Do you want to tape the pieces back together a battle again?  Take you time, it\'s all right, only the fate of this fair village rests with you, and as luck would have it, only you.  What is your will?`];

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
    imgElement.setAttribute('src', '');
  } else {
    imgElement.setAttribute('src', '../img/loss-image.jpg');
  }
  parentImageElement.appendChild(imgElement);
}
///Executable Code
generatePage(player.didWin);
