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
      console.log(ulItems);
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
  console.log(diceRollNumber);
  if (nextClicks === 0) { setStats(); }
}

function handleNext(event) {
  event.preventDefault();
  //nextClicks legend:
  //0: function to handle statBuilding
  if (nextClicks === 0) { setStats(); }
  if (nextClicks === 1) { setSavingThrows() }
  //1: function setSavingThrows 
  //2: function setSkills (will be .includes with proficiency array.  If proficient skill = stat+2)
  //3: function setRaceAndClass
  //4: function setOtherAttributes
  //5: function setAttacksAndEquipment

  //nextClicks++;
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
  var calcIntimidate = player.statArray[5] + 2;
  var calcPerception = player.statArray[4] + 2;



}

function setSavingThrows() {

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
  console.log(checkButton.disabled);
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






