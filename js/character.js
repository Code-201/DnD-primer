'use strict';
// TO-DO: USE FOUR DICE AND DROP LOWEST NUMBER

var player = new Character('bob', 100);
player.generateStats();

player.modifierCalc();
saveCharacter(player);

