"use strict";

class HelperFunctions {

  static objOrFunc(obj, param) {
    if(obj == null)
      return null;
    if (typeof obj === 'function')
      return obj(param);
    else
      return obj;
  }

  static massSuicide() {
    for (let creep in Game.creeps) {
      Game.creeps[creep].suicide();
    }
  }
}



global.HelperFunctions = HelperFunctions;




/*
 Object.defineProperty(RoomPosition.prototype, "isOpen", {
 enumerable: true,
 get: function() {
 return(wall !== Game.rooms[this.roomName].lookForAt(LOOK_TERRAIN,this.x,this.y));
 }
 });



 function getBalancedBody(energy){
 // create a balanced body as big as possible with the given energy
 var numberOfParts = Math.floor(energy / 200);
 var body = [];
 for (let i = 0; i < numberOfParts; i++) {
 body.push(WORK);
 }
 for (let i = 0; i < numberOfParts; i++) {
 body.push(CARRY);
 }
 for (let i = 0; i < numberOfParts; i++) {
 body.push(MOVE);
 }
 return body;
 }


 Object.defineProperty(RoomPosition.prototype, "isOccupied", {
 enumerable: true,
 get: function() {
 return(Game.rooms[this.roomName].lookForAt(LOOK_CREEPS,this.x,this.y).length > 0);
 }
 });


 let find = Room.prototype.find;
 Room.prototype.find = function(c, opt) {
 if(_.isArray(c)) {
 return _(c)
 .map(x => find.call(this,x,opt))
 .flatten()
 .value();
 } else
 return find.apply(this, arguments);
 }


 RoomObject.prototype.lookNear = function(asArray, range=1) {
 let {x,y} = this.pos;
 return this.room.lookAtArea(	Math.max(0, y-range),
 Math.max(0, x-range),
 Math.min(49, y+range),
 Math.min(49, x+range),
 asArray);
 }

 RoomObject.prototype.lookForNear = function(lookFor, asArray, range=1) {
 let {x,y} = this.pos;
 return this.room.lookForAtArea(lookFor,
 Math.max(0, y-range),
 Math.max(0, x-range),
 Math.min(49, y+range),
 Math.min(49, x+range),
 asArray);
 }




*/

