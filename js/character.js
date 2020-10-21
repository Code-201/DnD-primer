'use strict';


//Globals

var diceRollNumber;
var useDiceNumber = false;
var doThreeRoll = false;
var nextClicks = 0;
var diceClicks = 0;
var player = new Character('bob', 100);
var dialogArray = [`Hey there adventurer! This is the character creation page.  You look like a fighter, so we will assign you the class fighter! Cool, right?` +
  '  Ok, first thing is first.  These are the dice, go ahead and click \'NEXT\' and take some rolls!', 'These are your stats, they will be the sum'
+ ' of three 10-sided dice rolls.  We will take the hard work out of it and sum it up for you.  So go ahead an roll for your initial stats', 'We are gonna set your Saving Throws' +
' We will set these up. Math Math Math.', 'We will set your skills, since are a fighter, you can eat INTIMIDATE some rotten tomatoes so we will add some to your INTIMIDATE skill.  ' +
'Since you have trained and done lots of pushups, you have a heightened PERCEPTION, so we will add to that!.', 'Now you can choose your Race <span id="raceClass"></span>. ' +
'  there are tons to choose from, but for this scenario you can choose ELF or HUMAN.  We have already determined you are a FIGHTER class. After you select your race, click \'NEXT\'', 'These are other attributes. Armor, Equipment.  Don\'t worry about Attack, we will get to that later', ' But ' +
'I suppose you need some money, don\'t we all, so here is 100 gold!  Your\'re welcome!', `Ok! You\'re all set ${player.name}!  Let's get you some Armor and Weaponry`];
//
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
  if (nextClicks === 1) { doThreeRoll = true; }
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

  if (nextClicks === 1) { setStats(); }
}

function displayDialog(indexNumber) {
  console.log('displaying Dialog: ' + indexNumber);
  if (indexNumber >= dialogArray.length) {
    console.log('displayDialog indexNumber exceeds length of dialogArray length');
  } else {
    var parentElement = document.getElementById('dialog-text');
    console.log('parentElement: ' + parentElement);
    parentElement.innerHTML = dialogArray[indexNumber];
  }
}
function handleNext() {

  console.log('next-clicks: ' + nextClicks);
  //nextClicks legend:
  if (nextClicks === 0) { displayDialog(0); forceDiceRoll(); }
  //0: function to handle statBuilding
  else if (nextClicks === 1) { setStats(); }
  //1: function setSavingThrows 
  else if (nextClicks === 2) { displayDialog(2); setSavingThrows(); }
  //2: function setSkills (will be .includes with proficiency array.  If proficient skill = stat+2)
  else if (nextClicks === 3) { displayDialog(3); setSkills(); }
  // //3: function setRaceAndClass
  else if (nextClicks === 4) { displayDialog(4); raceAndClassDialog(); }
  // //4: function setOtherAttributes
  else if (nextClicks === 5) { displayDialog(5); setOtherAttributes(); }
  // //5: function setAttacksAndEquipment
  else if (nextClicks === 6) { displayDialog(6); setAttackAndEquipment(); }
  //6: Move on to the next Page
  else if (nextClicks === 7) { displayDialog(7); }

  else {
    window.location.href = '/html/open.html';
    console.log('Don\'t need this anymore');
  }
  //if (nextClicks === 6) {loadNextPage}
  if (nextClicks > 1) { nextClicks++; }
}
function setSavingThrows() {
  console.log('setSavingThrows');
  for (var i = 0; i < player.statArray.length; i++) {
    if (i === 0) { updateStat('st-list', i, player.statArray[i] + 2); }
    else if (i === 2) { updateStat('st-list', i, player.statArray[i] + 2); }
    else { updateStat('st-list', i, player.statArray[i]); }
  }



}
//
function forceDiceRoll() {
  nextButtonDisabled(true);
  console.log("Go ahead, roll them dice");
  nextClicks++;
}

function setSkills() {
  console.log('setSkills');
  //2 skills are intimidate and perception. Hard Coding the 2 skills
  //TODO: update using a .includes to search the array for proficiencies to apply.
  var intimidate = document.getElementById('intimidate');
  var perception = document.getElementById('perception');
  var calcIntimidate = player.statArray[5] + player.proficiencyBonus;
  var calcPerception = player.statArray[4] + player.proficiencyBonus;
  intimidate.textContent = `Intimidate: ${calcIntimidate}`;
  perception.textContent = `Perception: ${calcPerception}`;

}
function setAttackAndEquipment() {
  console.log('setAttackAndEquipment');
  updateEquipment('equipment', player.equipment, player.equipmentName);

}
function raceAndClassDialog() {
  console.log('raceAndClassDialog');
  console.log('Insert the instructions here');

}
function setOtherAttributes() {
  setRaceAndClass();

  updateStat('other-list', 0, 8);
  updateStat('other-list', 1, player.modArray[1]);
  player.speed = 30;
  updateStat('other-list', 2, player.speed);
  updateStat('other-list', 3, (10 + player.statArray[2]));
  updateStat('other-list', 4, player.proficiencyBonus);

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
  displayDialog(1);

  diceClicks++;
  if (diceClicks >= player.statArray.length) {
    nextClicks++;
    player.modifierCalc();
    nextButtonDisabled(false);
    doThreeRoll = false;

  }
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

//Executable Code here :>
///TODO: create a prompt for user to enter thier Name, and store when creating the Character object
displayDialog(0);





