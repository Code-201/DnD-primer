'use strict';
var player;

retrieveCharacter();
var base = document.getElementById('stats');
console.log(player);

function renderStatsSection() {
  var nameTag = document.createElement('p');
  nameTag.textContent = player.name;

  var raceTag = document.createElement('p');
  raceTag.textContent = Character.race;

  var hitTag = document.createElement('p');
  hitTag.textContent = Character.hitPoints;

  var ulElement = document.createElement('ul');
  for (var i = 0; i < Character.statArray.length; i++) {
    var liElement = document.createElement('li');
    liElement.textContent = statArray[i];
    ulElement.appendChild(liElement);
  }

  var goldTag = document.createElement('p');
  goldTag.textContent = Character.equipment;

}