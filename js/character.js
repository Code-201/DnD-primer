'use strict';


//Globals

var diceRollNumber;
var useDiceNumber = false;
var doThreeRoll = false;
var nextClicks = 0;
var diceClicks = 0;
var player = new Character('bob', 100);
player.name = prompt('Hold On! Hold On! Not to hasty, now!  Before you embark on your grand adventure we need to know by what words we should address you!');
var dialogArray = [`Well then ${player.name}! Let us begin!  What you see before you is the Character Creation Page.  Hmmm, by the looks of you I suppose you'd be a good fighter. Yes, indeed!  So I will take the liberty to assigning FIGHTER as you class!  Excellent!  To your right we have the dice!  They are a very important part of your adventure!  They will determine many things, but first lets set up your STATS.  Click NEXT and give them a ROLL!`, 'The first column on the left is your STATS.  These are determined by the sum of three rolls of a SIX sided DICE!  I have taken the liberty to add these up with EVERY roll you make.  So go ahead and finish filling you your stats!  Your stats are STR (Strength), DEX (Dexterity), CON (Constitution), INT (Intelligence), WIS (Wisdom), and CHA (Charisma)', `${player.name}, next to your STATS we have the SAVING THROWS.  These pearls can save your bacon, but saving from possible.. well.. let's nasty consequences.  We have calculated some MODIFIERS that will help or hinder depending on your STATS.  Since you are a FIGHTER you get an extra 2 POINTS on your STR and CON!  Isn't that nice?  Let's carry on! `, 'A quick word on modifiers.  These are the hidden elements that affect... Well pretty much EVERYTHING!  If you have a quill and scroll, and a friend with more than ten fingers you can calculate them as follows: (STAT - 10) / 2.  Remember parenthesis matter.  Skills!  These are calculated the same way as Saving Throws, but since you can best Bruce Lee (FIGHTER), will will add additional PERCEPTION and INTIMIDATE point!', 'Oh! Remind me again, what are you?  I hope your not a Human, terribly obnoxious.  Indeed! <span id="raceClass"></span>.  There are many races to come from, for this scenario you can choose ELF or... a HUMAN.  We know you are a FIGHTER.  Stop showing off.  After you select your race, click \'NEXT\'', 'These are other attributes: Armor, Initiative, Speed, Hit points, and Proficiency Bonus.  Don\'t mind most of these, expect HITPOINTS these are important for obvious reason, you don\'t want to die.  Grabbing the abacus we determined you HITPOINTS(HP) like this: 10 + CON modifier. Don\'t fret about Attack, we will get to that later and you Equipment is just that.  Equipment.', ' But I suppose you need some money, don\'t we all, so here is 100 gold!  Huzaah.  Money.', `Very good ${player.name}!  Adventure waits for no person, place, or thing!  It all begins with the first step, so let\' STEP to it! CHOP CHOP.`];







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

function insertRaceSelectionDrop() {

  var selectElement = document.createElement('select');
  selectElement.setAttribute('name', 'raceSelect');
  selectElement.setAttribute('id', 'race-choose');
  document.getElementById('raceClass').appendChild(selectElement);
  var optB = document.createElement('option');
  optB.setAttribute('value', 'None');
  optB.textContent = "NoneSelected";

  var opt1 = document.createElement('option');
  opt1.setAttribute('value', 'human');
  opt1.textContent = "Human";

  var opt2 = document.createElement('option');
  opt2.setAttribute('value', 'Elf');
  opt2.textContent = "Elf";

  selectElement.appendChild(optB);
  selectElement.appendChild(opt1);
  selectElement.appendChild(opt2);




  //  <select name="raceSelect" id="race-choose">
  //          <option value="human">Human</option>
  //          <option value="elf">elf</option>
  //        </select>
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
  else if (nextClicks === 2) { player.modifierCalc(); displayDialog(2); setSavingThrows(); setHitPoints(); }
  //2: function setSkills (will be .includes with proficiency array.  If proficient skill = stat+2)
  else if (nextClicks === 3) { displayDialog(3); setSkills(); }
  // //3: function setRaceAndClass
  else if (nextClicks === 4) { displayDialog(4); raceAndClassDialog(); insertRaceSelectionDrop(); }
  // //4: function setOtherAttributes
  else if (nextClicks === 5) { setRaceAndClass(); displayDialog(5); setOtherAttributes(); }
  // //5: function setAttacksAndEquipment
  else if (nextClicks === 6) { displayDialog(6); setAttackAndEquipment(); }
  //6: Move on to the next Page
  else if (nextClicks === 7) { displayDialog(7); }

  else {
    saveCharacter(player);
    window.location.href = '../html/open.html';
    console.log('Don\'t need this anymore');
  }
  //if (nextClicks === 6) {loadNextPage}
  if (nextClicks > 1) { nextClicks++; }
}
function setSavingThrows() {
  console.log('setSavingThrows');
  for (var i = 0; i < player.modArray.length; i++) {
    if (i === 0) { updateStat('st-list', i, player.modArray[i] + 2); }
    else if (i === 2) { updateStat('st-list', i, player.modArray[i] + 2); }
    else { updateStat('st-list', i, player.modArray[i]); }
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
  var calcIntimidate = player.modArray[5] + player.proficiencyBonus;
  var calcPerception = player.modArray[4] + player.proficiencyBonus;
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
  updateStat('other-list', 0, 8);
  updateStat('other-list', 1, player.modArray[1]);
  player.speed = 30;
  updateStat('other-list', 2, player.speed);
  updateStat('other-list', 3, (player.hitPoints));
  updateStat('other-list', 4, player.proficiencyBonus);

}

function setRaceAndClass() {
  var nameHeader = document.getElementById('characterName');
  nameHeader.textContent = player.name;
  var raceHeader = document.getElementById('characterRaceDisplay');
  var playerClass = document.getElementById('playerClass');
  playerClass.textContent = 'Fighter';
  player.class = 'Fighter';
  var raceSelect = document.getElementById('race-choose').value;
  raceHeader.textContent = raceSelect;
  player.race = raceSelect;



}

function setStats() {
  nextButtonDisabled(true);
  doThreeRoll = true;
  player.statArray[diceClicks] = diceRollNumber + 2;
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
function setHitPoints() {
  debugger;
  player.hitPoints = 10 + player.modArray[2];
  player.maxHitPoints = player.hitPoints;

}
//Executable Code here :>
///TODO: create a prompt for user to enter thier Name, and store when creating the Character object


displayDialog(0);





