'use strict';

Object.defineProperty(Source.prototype, "memory", {
  get: function () {
    if (!Memory.sources) {
      Memory.sources = {};
    }
    if (!Memory.sources[this.id]) {
      Memory.sources[this.id] = {};
    }
    return Memory.sources[this.id];
  },
  set: function (v) {
    return _.set(Memory, `sources.${this.id}`, v);
  },
  configurable: true,
  enumerable: false,
});
