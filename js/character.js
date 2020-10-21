'use strict';


//Globals

var diceRollNumber;
var useDiceNumber = false;
var doThreeRoll = false;
var nextClicks = 0;
var diceClicks = 0;
//
var player = new Character('bob', 100);
//player.generateAllStats();

player.modifierCalc();
saveCharacter(player);


//updates value of stat by idName, index (0 being str) and value (value rolled for stat)
//only works for stats and throws and other-attributes
function updateStat(idName, index, value) {
  //steal the ul items
  var ulItems = document.getElementById(idName).children;
  var statValue = ulItems[index].children;
  statValue[1].innerHTML = value;
}

//parentId = div tag  attribute=which UL to select  listItem=index number of list item dataString=value to output.
function updateSkills(parentId, attribute, listItem, dataString) {

  var parentElement = document.getElementById(parentId).children;
  for (var i = 0; i < parentElement.length; i++) {
    if (parentElement[i].getAttribute('id') === attribute) {
      // debugger;
      var ulItems = parentElement[i].children;

      break;
    }
  }
  ulItems[listItem].innerHTML = dataString;
}

function getRaceSelection() {
  //returns a string
  return document.getElementById('race-choose').value;
}

function updateEquipment(idTag, equipArray, equipArrayName) {
  var hElement;
  var hElementName;
  var parentElement = document.getElementById(idTag);
  for (var i = 0; i < equipArray.length; i++) {
    hElement = document.createElement('h4');
    hElementName = document.createElement('h3');
    hElementName.innerHTML = equipArrayName[i];
    hElement.innerHTML = equipArray[i];
    parentElement.appendChild(hElementName);
    parentElement.appendChild(hElement);
  }
}

function handleRolls() {
  if (nextClicks === 0) { doThreeRoll = true; }
  var sumRoll;
  var parentElementHead = document.getElementById('dice-roll-header');
  var parentElement = document.getElementById('dice-value');

  if (doThreeRoll) {
    sumRoll = threeDiceRollsSum();
    parentElementHead.textContent = 'Three Roll Sum';


  } else {
    sumRoll = diceValue(6);
    parentElementHead.textContent = 'Roll Value';

  }
  parentElement.textContent = sumRoll;
  diceRollNumber = sumRoll;

  if (nextClicks === 0) { setStats(); }
}

function handleNext() {

  //nextClicks legend:
  //0: function to handle statBuilding
  if (nextClicks === 1) { setStats(); }
  //1: function setSavingThrows 
  if (nextClicks === 2) { setSavingThrows(); }
  //2: function setSkills (will be .includes with proficiency array.  If proficient skill = stat+2)
  if (nextClicks === 3) { setSkills(); }
  //3: function setRaceAndClass
  if (nextClicks === 4) { raceAndClassDialog(); }
  //4: function setOtherAttributes
  if (nextClicks === 5) { setOtherAttributes(); }
  //5: function setAttacksAndEquipment
  if (nextClicks === 6) { setAttackAndEquipment(); }
  //6: Move on to the next Page
  //if (nextClicks === 6) {loadNextPage}
  //nextClicks++;
}
function setAttackAndEquipment() {
  updateEquipment('equipment', player.equipArray, player.equipArrayName);
  nextClicks++;
}
function raceAndClassDialog() {
  console.log('Insert the instructions here');
  nextClicks++;
}
function setOtherAttributes() {
  setRaceAndClass();

  updateStat('other-list', 0, 8);
  updateStat('other-list', 1, player.modArray[1]);
  player.speed = 30;
  updateStat('other-list', 2, player.speed);
  updateStat('other-list', 3, (10 + player.statArray[2]));
  updateStat('other-list', 4, player.proficiencyBonus);
  nextClicks++;
}

function setRaceAndClass() {
  var nameHeader = document.getElementById('characterName');
  nameHeader.textContent = player.name;
  var raceHeader = document.getElementById('characterRaceDisplay');
  var playerClass = document.getElementById('playerClass');
  playerClass.textContent = 'Fighter';
  player.class = 'Fighter';
  var raceSelect = getRaceSelection();
  raceHeader.textContent = raceSelect;
  player.race = raceSelect;



}

function setStats() {
  nextButtonDisabled(true);
  doThreeRoll = true;
  player.statArray[diceClicks] = diceRollNumber;
  updateStat('stat-list', diceClicks, diceRollNumber);

  diceClicks++;
  if (diceClicks >= player.statArray.length) {
    nextClicks++;
    player.modifierCalc();
    nextButtonDisabled(false);
    doThreeRoll = false;
  }
}

function setSkills() {
  //2 skills are intimidate and perception. Hard Coding the 2 skills
  //TODO: update using a .includes to search the array for proficiencies to apply.
  var intimidate = document.getElementById('intimidate');
  var perception = document.getElementById('perception');
  var calcIntimidate = player.statArray[5] + player.proficiencyBonus;
  var calcPerception = player.statArray[4] + player.proficiencyBonus;
  intimidate.textContent = `Intimidate: ${calcIntimidate}`;
  perception.textContent = `Perception: ${calcPerception}`;
  nextClicks++;
}

function setSavingThrows() {
  for (var i = 0; i < player.statArray.length; i++) {
    if (i === 0) { updateStat('st-list', i, player.statArray[i] + 2); }
    else if (i === 2) { updateStat('st-list', i, player.statArray[i] + 2); }
    else { updateStat('st-list', i, player.statArray[i]); }
  }

  //

  nextClicks++;
}

function threeDiceRollsSum() {
  var rollArray = [];
  while (rollArray.length < 3) {
    rollArray.push(diceValue(6));
  }
  return sumArray(rollArray);
}

function nextButtonDisabled(isDisabled) {
  var checkNext = document.getElementById('next-button');
  if (isDisabled) {
    checkNext.disabled = true;

  } else {
    checkNext.disabled = false;
  }
}

function rollButtonDisabled(isDisabled) {
  var checkButton = document.getElementById('perform-roll');
  if (isDisabled) {
    checkButton.disabled = true;

  } else {
    checkButton.disabled = false;
  }

}

// var diceListener = document.getElementById('button-roller');
// diceListener.addEventListener('button', handleRolls);
// var nextButtonListener = document.getElementById('next-button').addEventListener('submit', handleNext);
//Executable Code here :>
//next button to iterate through all of the various components.

updateSkills('skills', 's-int', 0, 'suck it');
updateStat('st-list', 0, 9001);
updateStat('stat-list', 2, 'Super Metroid Rocks!');
updateStat('other-list', 2, 'In the end we all pay the maker.');
updateEquipment('equipment', player.equipment, player.equipmentName);






