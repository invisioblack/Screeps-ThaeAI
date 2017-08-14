'use strict';

StructureSpawn.prototype.toString = function (htmlLink = true): string {
  return `[structure (${this.structureType}) #${this.id} ${this.pos.toString(htmlLink, this.id, 'spawns.' + this.name)}]`;
};