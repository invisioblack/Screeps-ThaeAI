'use strict';

/**
 *  Global Creep lists, Setups, Roles, Actions
 */
global.CreepSetups = {};
global.CreepRoles = {};
global.CreepActions = {};

/**
 * Logging functions
 *  prints a string to the console, differing colors
 */
global.log = {
  LOG_ENABLED : true,
  WARN_ENABLED : true,
  ERROR_ENABLED : true,
  log: function log(arg: string) {
    if (this.LOG_ENABLED)return console.log(arg)
  },
  warn: function warn(arg: string) {
    if (this.WARN_ENABLED)return console.log('<span style=color:#FFBF3F>' + arg + '</span>');
  },
  err: function err(arg: string) {
    if (this.ERROR_ENABLED)return console.log('<span style=color:#D18F98>' + arg + '</span>');
  }
};

/**
 * JSON.stringify wrapper
 *  JSON_STRINGIFY_EXPANDED if true will make the returned string multiline
 * @param x object to turn into a string
 * @returns {string} object as a string
 */
global.JSON_STRINGIFY_EXPANDED = false;
global.ex = function (x: any) : string {
    return JSON.stringify(x, null, JSON_STRINGIFY_EXPANDED ? 1 : 0);
};

/**
 * Converts an error code into a string equivalent
 * @param err ERR_* constant number value
 * @returns {string} string version of the ERR_* constant
 */
global.errName = function (err: number): string {
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

//many of these credit of semperrabbit and warinternal