'use strict';

Room.prototype.sing = function(sentence: string, pub = true): void{
  let words = sentence.split("|");
  let creeps = _.filter(Game.creeps, (c) => c.room.name == this.name);

  if (creeps.length > 0)
    creeps[Math.floor(Math.random()*creeps.length)].say(words[Game.time % words.length], pub);
};

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

Object.defineProperty(Room.prototype, 'pickableEnergy', {
  configurable: true,
  get: function() : number {
    let ret = 0;
    if (_.isUndefined(this._pickableEnergy)) {
      for (let s of this.find(FIND_DROPPED_RESOURCES, { filter : { resourceType : RESOURCE_ENERGY }})) {
        if (s.amount > 20) //enough to matter
          ret += s.amount;
      }
      this._pickableEnergy = ret;
    } else {
      ret = this._pickableEnergy;
    }
    return ret;
  }
});

Object.defineProperty(Room.prototype, 'hasRepairables', {
  configurable: true,
  get: function() : boolean {
    let ret = false;
    if (_.isUndefined(this._hasRepairables)) {
      let places = this.find(FIND_STRUCTURES, { filter : function (o: Structure) { return o.structureType != STRUCTURE_WALL && o.structureType != STRUCTURE_RAMPART}});

      if (places.length > 0)
        for (let p in places) {
          if (places[p].hits < places[p].hitsMax) {
            ret = true;
            break;
          }
        }
      this._hasRepairables = ret;
    } else {
      ret = this._hasRepairables;
    }
    return ret;
  }
});

Object.defineProperty(Room.prototype, 'neededBatteryEnergy', {
  configurable: true,
  get: function() : number {
    let ret = 0;
    if (_.isUndefined(this._neededBatteryEnergy)) {
      let ext = this.find(FIND_MY_STRUCTURES, {filter : (s : OwnedStructure) =>  s.structureType == STRUCTURE_TOWER});
      for (let e of ext) {
        ret += (e.energyCapacity - e.energy);
      }
      this._neededBatteryEnergy = ret;
    } else {
      ret = this._neededBatteryEnergy;
    }
    return ret;
  }
});

Object.defineProperty(Room.prototype, 'storedEnergy', {
  configurable: true,
  get: function() : number {
    let ret = 0;
    if (_.isUndefined(this._storedEnergy)) {
      for (let s of this.find(FIND_STRUCTURES, { filter : function (s: Structure) {return s.structureType == STRUCTURE_CONTAINER || s.structureType == STRUCTURE_STORAGE; }})) {
        ret += s.store[RESOURCE_ENERGY];
      }
      this._storedEnergy = ret;
    } else {
      ret = this._storedEnergy;
    }
    return ret;
  }
});