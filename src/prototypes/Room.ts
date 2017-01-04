'use strict';

Object.defineProperty(Room.prototype, 'mineableEnergy', {
  configurable: true,
  get: function() : number {
    let ret = 0;
    if (_.isUndefined(this._mineableEnergy)) {
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

Object.defineProperty(Room.prototype, 'neededSpawnEnergy', {
  configurable: true,
  get: function() : number {
    let ret = 0;
    if (_.isUndefined(this._neededSpawnEnergy)) {
      let ext = this.find(FIND_MY_STRUCTURES, {filter : (s : OwnedStructure) =>  s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN});
      for (let e of ext) {
        ret += (e.energyCapacity - e.energy);
      }
      this._neededSpawnEnergy = ret;
    } else {
      ret = this._neededSpawnEnergy;
    }
    return ret;
  }
});

Object.defineProperty(Room.prototype, 'hasConstructionSites', {
  configurable: true,
  get: function() : boolean {
    let ret = false;
    if (_.isUndefined(this._hasConstructionSites)) {
      ret = this.find(FIND_MY_CONSTRUCTION_SITES).length > 0;
      this._hasConstructionSites = ret;
    } else {
      ret = this._hasConstructionSites;
    }
    return ret;
  }
});
