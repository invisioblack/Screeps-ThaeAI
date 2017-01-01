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
    let ret = 0;
    if (_.isUndefined(this.memory.minerCount)) {
      this.memory.minerCount = ret;
    } else {
      ret = this.memory.minerCount;
    }
    return ret;
  },
  set: function (v): any {
    return _.set(Memory, `sources.${this.id}.minerCount`, v);
  },
  configurable: true,
});
