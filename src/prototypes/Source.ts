'use strict';

Object.defineProperty(Source.prototype, "memory", {
  get: function (): any {
    if (!Memory.sources) {
      Memory.sources = {};
    }
    if (!Memory.sources[this.id]) {
      Memory.sources[this.id] = {};
    }
    return Memory.sources[this.id];
  },
  set: function (v): any {
    return _.set(Memory, `sources.${this.id}`, v);
  },
  configurable: true,
  enumerable: false,
});


Object.defineProperty(Source.prototype, "usableFields", {
  get: function (): number {
    let ret = 0;
    if (!this.memory.usableFields) {
      ret = 9 - _.countBy(this.lookForNear(LOOK_TERRAIN, true), 'terrain')['wall'];
      this.memory.usableFields = ret;
    } else {
      ret = this.memory.usableFields;
    }
    return ret;
  },
  configurable: true,
});


Object.defineProperty(Source.prototype, "minerCount", {
  get: function (): number {
    let ret = 99;
    if (_.isUndefined(this.memory.dedicatedMiner)) {
      ret = this.room.find(FIND_MY_CREEPS, { filter : (c : Creep) => c.memory.target == this.id && c.memory.action == 'mine'}).length;
    }
    return ret;
  },
  configurable: true,
});


Object.defineProperty(Source.prototype, "dedicatedMiner", {
  get: function (): number {
    return this.memory.dedicatedMiner;
  },
  set: function (v: string): string {
    this.memory.dedicatedMiner = v;
    return this.memory.dedicatedMiner;
  },
  configurable: true,
});