'use strict';
//var fs = require('fs');
var _ = require('lodash');
var debug = true;
var Monster = require('./decorator/monster.js');
var BMF = require('./base_map_fun');
var Items = require('./decorator/items.js');
var monster = new Monster.Monster();
var items = new Items.Items();

exports.Grassy = function(){
  this.monsters = [];
  this.mapData = {};
  this.map = [];
  this.maps = [];
  this.branches = [];
  this.rooms = [];
	this.locationSprites = [];
  this.locations = [];
  this.mapFeatures = [];
  this.horizon = [];
};
exports.Grassy.prototype = {
  clear: function clear() {
		this.mapData = {};
    this.mapSize = 0;
    this.map = [];
		this.rooms = [];
    this.locationSprites = [];
    this.locations = [];
    this.mapFeatures = [];
    this.horizon = [];
  },
  countRooms: function countRooms (array) {
    var n = 0;
    var N = [];
    loop:
    for (var j = 0; j < 12; j++) {
      n = 0;
      for (var i = 0; i < array.length; i++) {
        if (array[i].type === 4 && array[i].subtype === j) {
          n++;
        }
      }
      N.push(n);
    }
    return N;
  },
  inMapBounds: function inMapBounds (object, mapWidth, mapHeight) {
    if (object.x < 0 || object.x + object.width > mapWidth || object.y < 0 || object.y + object.height > mapHeight) {
      return false;
    }
    return true;
  },
  intersect: function intersect(a, b) {
    if (a.width <= 0 || a.height <= 0 || b.width <= 0 || b.height <= 0) {
      return false;
    }
    return !(a.x + a.width < b.x || a.y + a.height < b.y || a.x > b.x + b.width || a.y > b.y + b.height);
  },
  intersectAll: function intersectAll(object, group) {
    for (var i = 0; i < group.length; i++) {
      if (this.intersect(object, group[i])) {
        return true;
      }
    }
    return false;
  },
  makeFeature: function makeFeature(x, y, width, height, boundLeft, boundRight, boundTop, boundBottom, color, type, subtype) {
    var feature = {};
    feature = {
      "x": x,
      "y": y,
      "width": width,
      "height": height,
      "boundLeft": boundLeft,
      "boundRight": boundRight,
      "boundTop": boundTop,
      "boundBottom": boundBottom,
      "color": color,
      "type": type,
      "subtype": subtype
    };
    return feature;
  },
  makeTerrain: function makeTerrain(x, y, width, height, mapWidth, mapHeight, color) {
    for (var z = 0; z < width; z++){
      for (var i = 0; i < height; i++){
        this.map[x+y*mapWidth+z+i*mapWidth] = color;
      }
    }
  },
  Random: function Random(rndMin, rndMax) {
    if (rndMin < rndMax) {
      var x = Math.floor(Math.random()*(rndMax-rndMin+1)+rndMin);
      return x;
    } else {
      return rndMin;
    }
  },
  randomSpacing: function randomSpacing(value, coeff1, coeff2, buffer1, buffer2) {
    var Val = 0;
    var Values = [];
    var n = 0;
    if (value < coeff1 || value < coeff2) {
      n = 1;
    } else {
      n = this.Random(Math.floor(value/coeff1)+1,Math.floor(value/coeff2));
    }
    for (var i = 0; i < n; i++) {
      Val = this.Random(i*Math.floor(value/n)+buffer1,(i+1)*Math.floor(value/n)-buffer2);
      Values[i] = Val;
    }
    return Values;
  },
  randomTerrain: function randomTerrain(n, x, y, width, height, mapWidth, mapHeight, color) {
    var N = Math.floor((mapHeight*mapWidth)/n);
    var X = 0;
    var Y = 0;
    for (var i = 0; i < N; i++) {
      X = this.Random(x,x+width);
      Y = this.Random(y,y+height);
      if (this.map[X + mapWidth*Y] !== 0) {
        this.map[X + mapWidth*Y] = color;
      }
    }
  },
  makeHorizon: function makeHorizon(x, y, width, height, mapWidth, mapHeight) {
    var Width = 0;
    var Height = 0;
    var Hills = this.randomSpacing(width, 200, 100, 50, 50);
    for (var i = 0; i < Hills.length; i++) {
      X = Hills[i];
      if (i == 0) {
        Width = X + this.Random(0, 2*X);
      } else if (i == Hills.length - 1) {
        Width = width - X + this.Random(0, 2*(width - X));
      } else {
        Width = (Hills[i+1] - X);
      }
      Height = Math.sqrt(Width);
      this.makeHill(x+X,y+Math.floor(height/2),Width,Height);
    }
  },
  makeHill: function makeHill(x, y, width, height, mapWidth, mapHeight) {
    var hill = {};
    hill = this.makeFeature(x, y, width, height, 0, 0, 0, 0, 0, 1, 0);
    this.horizon.push(hill);
    this.mapFeatures.push(hill);
    //draw the terrain
    var Length = [];
    var X = [];
    var L = 0;
    var R = 0;
    Length[0] = this.Random(1, Math.floor(width/2));
    X[0] = this.Random(height, width - Length[0] - height);
    for (var i = 1; i < Height) {    
      L = this.Random(height - i, X[i - 1] - 1);
      R = this.Random(X[i - 1] + Length[i - 1]);
      Length[i] = R - L;
      X[i] = L;
      this.makeTerrain(X[i], y + i, Length[i], 1, mapWidth, mapHeight, 1);
    }
  },
  outcroppings: function outcroppings() {

  },
  pits: function pits() {

  }
};

























