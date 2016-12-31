'use strict';

/**
 * Get the quantity of live body parts of the given type. Fully damaged parts do not count. Optimized version. Credit: proximo
 * @param type A body part type, one of the following body part constants: MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
 * @returns {number} number of live body parts of type provided
 */
Creep.prototype.getActiveBodyparts = function (type: string): number {
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
 * Gets whether or not a live body part exists. Fully damaged parts do not count. Credit: proximo
 * @param type A body part type, one of the following body part constants: MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
 * @returns {boolean} whether or not a live body part exists of type provided
 */
Creep.prototype.hasActiveBodyparts = function (type: string): boolean {
  for (let i = this.body.length; i-- > 0;) {
    if (this.body[i].hits > 0) {
      if (this.body[i].type === type) {
        return true;
      }
    } else break;
  }
  return false;
};

Object.defineProperty(Creep.prototype, 'carrySum', {
  configurable: true,
  get: function() {
    let ret = 0;
    if (_.isUndefined(this._carrySum)) {
      ret = _.sum(this.carry);
    } else {
      ret = this._carrySum;
    }
    return ret;
  }
});