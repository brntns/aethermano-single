'use strict';
var buttons = require('./buttons');
var arrow = require('./arrow');

function Menu(game) {
 this.game = game;
}

var menuBase =  {
  create: function create() {
    buttons.draw(this.game);
    arrow.draw(this.game);
  },
   update: function(cursors){
     arrow.move(cursors,buttons);
   }
}

var menu = {};
_.extend(menu, menuBase);

Menu.prototype = menu;

module.exports = Menu;
