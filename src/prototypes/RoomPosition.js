'use strict';

Object.defineProperty(RoomPosition.prototype, "isOccupied", {
  enumerable: true,
  get: function() {
    return(Game.rooms[this.roomName].lookForAt(LOOK_CREEPS,this.x,this.y).length > 0);
  }
});

Object.defineProperty(RoomPosition.prototype, "isOpen", {
  enumerable: true,
  get: function() {
    return(wall !== Game.rooms[this.roomName].lookForAt(LOOK_TERRAIN,this.x,this.y));
  }
});
