'use strict';

Object.defineProperty(Room.prototype, 'mineableEnergy', {
  configurable: true,
  get: function() : number {
    let ret = 0;
    if (!(this._mineableEnergy)) {
      for (let s of this.memory.sources) {
        ret += (Game.getObjectById<Source>(s).energy);
      }
      this._mineableEnergy = ret;
    } else {
      ret = this._mineableEnergy;
    }
    return ret;
  }
});