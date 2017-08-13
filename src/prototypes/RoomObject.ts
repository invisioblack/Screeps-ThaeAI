'use strict';

RoomObject.prototype.lookNear = function(asArray: boolean, range: number = 1): LookAtResultMatrix | LookAtResultWithPos[] {
  let {x,y} = this.pos;
  return this.room.lookAtArea(	Math.max(0, y-range),
    Math.max(0, x-range),
    Math.min(49, y+range),
    Math.min(49, x+range),
    asArray);
};

RoomObject.prototype.lookForNear = function(lookFor: string, asArray: boolean = false, range: number = 1): LookAtResultMatrix | LookAtResultWithPos[] {
  let {x,y} = this.pos;
  return this.room.lookForAtArea(lookFor,
    Math.max(0, y-range),
    Math.max(0, x-range),
    Math.min(49, y+range),
    Math.min(49, x+range),
    asArray);
};