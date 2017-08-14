'use strict';

Flag.prototype.toString = function (htmlLink = true): string {
  return `[flag ${this.name} ${this.pos.toString(htmlLink, this.name, 'flags.'+this.name)}]`;
};