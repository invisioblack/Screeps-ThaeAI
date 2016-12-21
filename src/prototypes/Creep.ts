'use strict';

/**
 * Get the quantity of live body parts of the given type. Fully damaged parts do not count. Optimized by
 * @param type A body part type, one of the following body part constants: MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
 */
Creep.prototype.getActiveBodyparts = function (type: string) {
  let count = 0;
  for (let i = this.body.length; i-- > 0;) {
    if (this.body[i].hits > 0) {
      if (this.body[i].type === type) {
        count++;
      }
    } else break;
  }
  return count;
};

/**
 * Gets whether or not a live body part exists. Fully damaged parts do not count. Written by
 * @param type A body part type, one of the following body part constants: MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
 */
Creep.prototype.hasActiveBodyparts = function (type: string) {
  for (let i = this.body.length; i-- > 0;) {
    if (this.body[i].hits > 0) {
      if (this.body[i].type === type) {
        return true;
      }
    } else break;
  }
  return false;
};