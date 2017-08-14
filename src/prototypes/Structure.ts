'use strict';

Structure.prototype.toString = function (htmlLink = true): string {
  return `[structure (${this.structureType}) #${this.id} ${this.pos.toString(htmlLink, this.id, 'structures.' + this.id)}]`;
};

Object.defineProperty(Structure.prototype, "memory", {
  get: function () {
    if (!Memory.structures) {
      Memory.structures = {};
    }
    if (!Memory.structures[this.id]) {
      Memory.structures[this.id] = {};
    }
    return Memory.structures[this.id];
  },
  set: function (v) {
    return _.set(Memory, `structures.${this.id}`, v);
  },
  configurable: true,
  enumerable: false,
});