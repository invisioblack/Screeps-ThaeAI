'use strict';

/**
 * Wrapper for lookAtArea to look in range of an object. Credit: warinternal
 * @param asArray return the reults as an array or not
 * @param range range to look, defaults to one
 * @returns {LookAtResultMatrix|LookAtResultWithPos[]}
 */
RoomObject.prototype.lookNear = function(asArray: boolean, range: number = 1): LookAtResultMatrix | LookAtResultWithPos[] {
  let {x,y} = this.pos;
  return this.room.lookAtArea(	Math.max(0, y-range),
    Math.max(0, x-range),
    Math.min(49, y+range),
    Math.min(49, x+range),
    asArray);
};

/**
 * Wrapper for lookForAtArea to look in range of an object. Credit: warinternal
 * @param lookFor Object searching for
 * @param asArray return reulsts as array or not
 * @param range range to look. defaults to one
 * @returns {LookAtResultMatrix|LookAtResultWithPos[]}
 */
RoomObject.prototype.lookForNear = function(lookFor: string, asArray: boolean, range: number = 1): LookAtResultMatrix | LookAtResultWithPos[] {
  let {x,y} = this.pos;
  return this.room.lookForAtArea(lookFor,
    Math.max(0, y-range),
    Math.max(0, x-range),
    Math.min(49, y+range),
    Math.min(49, x+range),
    asArray);
};