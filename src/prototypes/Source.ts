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
    let ret;
    if (_.isUndefined(this.memory.usableFields)) {
      let walls = _.countBy(this.room.lookForNear(LOOK_TERRAIN, true), 'structure')['wall'];
      ret = 9 - walls;
      this.memory.usableFields = ret;
    } else {
      ret = this.memory.usableFields;
    }
    return ret;
  },
  configurable: true,
});

Object.defineProperty(Source.prototype, "openFields", {
  get: function (): number {
    return this.usableFields - this.memory.minerCount;
  },
  configurable: true,
});