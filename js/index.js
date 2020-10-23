'use strict'

var player = retrieveCharacter();
var custom_Title;
var introDialog = `  Welcome to our Primer for Dungeons and Dragons! In this tutorial, we will take you through basic
creation of a character and a simple scenario that allows you to experience the flow of game play during a
campaign.`;


function buttonDisable(elementButton, isDisabled) {
  var buttonSwitch = document.getElementById(elementButton);
  buttonSwitch.disabled = isDisabled;
function setDisplayName() {
  if (player) {
    custom_Title = `Ah! Master ${player.name}!  Good to see you returning! `;
    document.getElementById('saved-char').setAttribute('value', `I'll use ${player.name}`);
  } else {
    custom_Title = `Greetings Adventurer!`;
    buttonDisable('saved-char', true);
  }
  document.getElementById('introduction').innerHTML = custom_Title + introDialog;
}
setDisplayName();
