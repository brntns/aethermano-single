'use strict';

function Map(game, player, myGame) {
	this.myGame = myGame;
	this.player = player;
	this.game = game;
	this.bg = null;
  this.maps = null;
	this.room = null;
  this.tilemap = null;
  this.currentMap = null;
	this.tileset = null;
	this.collisionLayer = null;
  this.portal = {};
  this.portal.x = null;
  this.portal.y = null;
	this.bleft = null;
	this.bright =  null;
	this.btop =  null;
	this.bbottom =  null;
  this.client = null;
	this.lastPos = null;
  this.locationSprites = [];
}

var mapBase = {

	create: function (data) {
    console.log(data);
     this.maps = data;
    // console.log(this.maps[0]);
  //   this.tilemap = this.game.load.tilemap(this.maps[0].id, null, this.maps[0], Phaser.Tilemap.TILED_JSON );
  //   this.tileset = this.game.add.tilemap(this.maps[0].id);
		// this.tileset.addTilesetImage('tiles-1');
		// this.tileset.setCollisionByExclusion([
		// 	0
		// ]);
		// this.currentTile = this.tileset.getTile(2, 3);
	 //  this.collisionLayer =	this.tileset.createLayer('Tile Layer 1');
		// this.collisionLayer.renderSettings.enableScrollDelta = true;
		// this.collisionLayer.resizeWorld();
		// this.tileset.setCollision([11]);
		// this.marker = this.game.add.graphics();
		// this.marker.lineStyle(2, 0x000000, 1);
		// this.marker.drawRect(0, 0,16,16);
      this.setCurrentLevel(this.maps[0].map[0],'map',this.maps[0].map[0].type);

		//add groups
	},
  setCurrentLevel: function setCurrentLevel(level,name,type) {
		console.log(level);
		this.player.sprite.x = 400;
		this.player.sprite.y = 200;
		//console.log(level);
    // this.currentMap = level;
    if (this.collisionLayer !== null) {
      this.collisionLayer.destroy();
    	//console.log('destroyed');
    }
    this.tilemap = this.game.load.tilemap(level.id, null, level, Phaser.Tilemap.TILED_JSON );
    this.tileset = this.game.add.tilemap(level.id);
    this.tileset.addTilesetImage('tiles-1');
    this.tileset.setCollisionByExclusion([
      0
    ]);
    //set collisionLayer
    this.collisionLayer = this.tileset.createLayer('Tile Layer 1');
		this.collisionLayer.renderSettings.enableScrollDelta = true;
    this.collisionLayer.resizeWorld();
		if (type === 'room') {
			this.room = this.game.add.sprite(this.game.world.centerX - 32,this.game.world.centerY , 'door_inner');
			this.game.physics.arcade.enable(this.room);
			this.room.body.allowGravity  = false;
		} else {
			if(this.room){
				this.room.kill();
			}
		}
  }
}

var map = {};
_.extend(map, mapBase);

Map.prototype = map;

module.exports = Map;
