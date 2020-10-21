'use strict';
// TO-DO: USE FOUR DICE AND DROP LOWEST NUMBER

var player = new Character('bob', 100);
player.generateAllStats();

player.modifierCalc();
saveCharacter(player);


//updates value of stat by idName, index (0 being str) and value (value rolled for stat)
function updateStat(idName, index, value){
  //steal the ul items
  var ulItems = document.getElementById(idName).children;
  var statValue = ulItems[index].children;
  statValue[1].innerHTML = value;
}
//only works for stats and throws
updateStat('st-list', 0, 9001);

function updateSkills(parentId, attribute, listItem, dataString){

  var parentElement = document.getElementById(parentId).children;
  // var included = parentElement[1].children;
  for(var i = 0; i < parentElement.length; i++){
    if (parentElement[i].getAttribute('id') === attribute){
      // debugger;
      var ulItems = parentElement[i].children;
      console.log(ulItems);
      break;
    }
  }
  ulItems[listItem].innerHTML = dataString;
  // console.log(parentElement[1].getAttribute(attribute));
  // console.log(included[0].innerHTML);
}

updateSkills('skills', 's-int', 0, 'suck it');
