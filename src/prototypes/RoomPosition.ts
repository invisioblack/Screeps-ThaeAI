'use strict';

/**
 * Is a location occupied by a creep
 */
Object.defineProperty(RoomPosition.prototype, "isOccupied", {
  enumerable: true,
  get: function(): boolean {
    return(Game.rooms[this.roomName].lookForAt(LOOK_CREEPS,this.x,this.y).length > 0);
  }
});
