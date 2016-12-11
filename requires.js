'use strict';

require('helperFunctions');

//roleClasses
require('creepRoleBase');
require('creepRoleCarrier');
require('creepRoleMiner');

//require('roleRepairer');
//require('roleUpgrader');
//require('roleBuilder');

//setupClasses
require('creepSetupBase');


require('memoryManager');
//require('populationManager');
require('creepFactory');


//define memory prototypes for structures and sources
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


//globals credit of semperrabbit and warinternal
global.LOGGING_ENABLED = true;
global.logging = function (bool) {
  global.LOGGING_ENABLED = bool
};
global.log = {
  log: function log(arg) {
    if (global.LOGGING_ENABLED)return console.log(arg)
  },
  warn: function warn(arg) {
    if (global.LOGGING_ENABLED)return console.log('<span style=color:#FFBF3F>' + arg + '</span>');
  },
  err: function err(arg) {
    if (global.LOGGING_ENABLED)return console.log('<span style=color:#D18F98>' + arg + '</span>');
  },
  error: function error(arg) {
    if (global.LOGGING_ENABLED)return console.log('<span style=color:#D18F98>' + arg + '</span>');
  },
};

global.ex = (x) => JSON.stringify(x, null, 2);

global.errName = function (err) {
  switch (err) {
    case ERR_NOT_OWNER:
      return 'ERR_NOT_OWNER';
    case ERR_NO_PATH:
      return 'ERR_NO_PATH';
    case ERR_NAME_EXISTS:
      return 'ERR_NAME_EXISTS';
    case ERR_BUSY:
      return 'ERR_BUSY';
    case ERR_NOT_FOUND:
      return 'ERR_NOT_FOUND';
    case ERR_NOT_ENOUGH_RESOURCES:
      return 'ERR_NOT_ENOUGH_ENERGY/ERR_NOT_ENOUGH_RESOURCES/ERR_NOT_ENOUGH_EXTENSIONS';
    case ERR_INVALID_TARGET:
      return 'ERR_INVALID_TARGET';
    case ERR_FULL:
      return 'ERR_FULL';
    case ERR_NOT_IN_RANGE:
      return 'ERR_NOT_IN_RANGE';
    case ERR_INVALID_ARGS:
      return 'ERR_INVALID_ARGS';
    case ERR_TIRED:
      return 'ERR_TIRED';
    case ERR_NO_BODYPART:
      return 'ERR_NO_BODYPART';
    case ERR_RCL_NOT_ENOUGH:
      return 'ERR_RCL_NOT_ENOUGH';
    case ERR_GCL_NOT_ENOUGH:
      return 'ERR_GCL_NOT_ENOUGH';
  }
  return '';
};

//not as expected when called at the top of each loop
global.clearLog = function () {
  console.log("<script>angular.element(document.getElementsByClassName('fa fa-trash ng-scope')[0].parentNode).scope().Console.clear()</script>")
};