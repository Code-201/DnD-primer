'use strict';


//Globals

var diceRollNumber;
var useDiceNumber = false;
//
var player = new Character('bob', 100);
player.generateAllStats();

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

function handleRolls(event) {
  event.preventDefault();
  diceRollNumber = diceValue(6);
  //function to display the value in the 'dice-roller' area.
  //write a function to track and update different values with diceRollNumber.
  // sum of three rolls.
}

// function threeRollsStats (){
//   var rollArray = [];
//   while(rollArray.length < 3){

//   }
// }

var diceListener = document.getElementById('dice-roller').addEventListener('submit', handleRolls);

//Executable Code here :>
//next button to iterate through all of the various components.

updateSkills('skills', 's-int', 0, 'suck it');
updateStat('st-list', 0, 9001);
updateStat('stat-list', 2, 'Super Metroid Rocks!');
updateStat('other-list', 2, 'In the end we all pay the maker.');
updateEquipment('equipment', player.equipment, player.equipmentName);
console.log(typeof (getRaceSelection()));


