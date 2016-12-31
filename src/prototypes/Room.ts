'use strict';


Object.defineProperty(Room.prototype, 'mineableEnergy', {
  configurable: true,
  get: function() {
    let ret;
    if (_.isUndefined(this._mineableEnergy)) {
      for (let s of this.memory.sources) {
        ret += Game.getObjectById<Source>(s).energy;
      }
      this._mineableEnergy = ret;
    } else {
      ret = this._mineableEnergy;
    }
    return ret;
  }
});