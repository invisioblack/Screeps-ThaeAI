'use strict';

/**
 * Creep method optimizations "getActiveBodyparts"
 */
Creep.prototype.getActiveBodyparts = function (type) {
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
 * Fast check if bodypart exists
 */
Creep.prototype.hasActiveBodyparts = function (type) {
  for (let i = this.body.length; i-- > 0;) {
    if (this.body[i].hits > 0) {
      if (this.body[i].type === type) {
        return true;
      }
    } else break;
  }
  return false;
};