'use strict';

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

Creep.prototype.sing = function(sentence: string, pub?: boolean): void {
  if(pub === undefined)
    pub= true;
  let words = sentence.split("|");
  this.say(words[Game.time % words.length], pub);
};
