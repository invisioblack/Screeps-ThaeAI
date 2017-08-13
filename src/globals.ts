'use strict';

global.CreepSetups = {};
global.CreepRoles = {};
global.CreepActions = {};

/**
 * Global Settings
 */
//Individual creep singing
global.CREEP_SINGING = false;
//singing on a roomwide scale
global.ROOM_SINGING = true;
//upgrade controller before all else at this threshold
global.EMERGENCEY_UPGRADE_THRESHOLD = 0.20;
//percentage of storage full where workers will lower fill priority
global.STORAGE_ENERGY_THRESHOLD = 0.50;


global.log = {
  LOG_ENABLED : false,
  WARN_ENABLED : true,
  ERROR_ENABLED : true,
  DEBUG_ENABLED : false,
  debug: function(arg: string): void {
    if (this.DEBUG_ENABLED)return console.log('<span style=color:#007b27>' + arg + '</span>')
  },
  log: function(arg: string): void {
    if (this.LOG_ENABLED)return console.log(arg)
  },
  warn: function (arg: string): void {
    if (this.WARN_ENABLED)return console.log('<span style=color:#FFBF3F>' + arg + '</span>');
  },
  err: function(arg: string): void {
    if (this.ERROR_ENABLED)return console.log('<span style=color:#D18F98>' + arg + '</span>');
  }
};

global.JSON_STRINGIFY_EXPANDED = false;
global.ex = function (x: any) : string {
    return JSON.stringify(x, null, JSON_STRINGIFY_EXPANDED ? 1 : 0);
};

global.rm = function() {
  Memory = <any>{};
  RawMemory.set('');
};

global.rf = function() {
  _.forEach(Game.flags, f => f.remove());
};

global.rc = function() {
  _.forEach(Game.creeps, c => c.suicide());
};

global.rcs = function() {
  _.forEach(Game.constructionSites, s => s.remove());
};

global.respawn = function(){
 rc();
 rcs();
 rf();
 rm();
};

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
      return 'ERR_NOT_ENOUGH_RESOURCES';
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

global.roomLink = function(roomArg: any): string {
  if (roomArg instanceof Room) {
    roomArg = roomArg.name;
  } else if (roomArg.pos != undefined) {
    roomArg = roomArg.pos.roomName;
  } else if (roomArg.roomName != undefined) {
    roomArg = roomArg.roomName;
  } else if (typeof roomArg === 'string') {
    //were good, just checking
  } else {
    console.log(`Invalid parameter to roomLink global function: ${roomArg} of type ${typeof roomArg}`);
  }
  return `<a href="#!/room/${roomArg}">${roomArg}</a>`;
};

global.roomLevels = function() {
  let gclString = `===== GCL =====`;
  let gclPercentage = ((Game.gcl.progress / Game.gcl.progressTotal) * 100.0).toFixed(2);
  gclString += `\n\tLEVEL: ${Game.gcl.level}\tprogress: ${gclPercentage} %\t<progress value="${Game.gcl.progress}" max="${Game.gcl.progressTotal}"></progress>`;
  let string = "\n===== Room Levels =====";

  // \/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/
  // change the contents of these 2 functions to take advantage of your own caching
  // commented out my own cached stuff to put in code that should work regardless of code base
  let structures = Object.keys(Game.structures).map(id=>Game.structures[id]);
  let structuresByRoom: any = _.groupBy(structures, s=>s.room.name);
  for (let roomName in structuresByRoom) structuresByRoom[roomName] = _.groupBy(structuresByRoom[roomName], 'structureType');
  function getRoomStructuresByType(room: Room) {
    return structuresByRoom[room.name] || {};
    //return room.structuresByType;
  }
  let constructionSites = Object.keys(Game.constructionSites).map(id=>Game.constructionSites[id]);
  let sitesByRoom: any = _.groupBy(constructionSites, s=>s.pos.roomName);
  for (let roomName in sitesByRoom) sitesByRoom[roomName] = _.groupBy(sitesByRoom[roomName], 'structureType');
  function getRoomConstructionSitesByType(room: Room) {
    return sitesByRoom[room.name] || {};
    //return room.constructionSitesByType;
  }
  // /\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\/\

  Object.keys(Game.rooms).map(name => Game.rooms[name])
    .filter( r => r.controller && r.controller.my )
    .sort( (a,b) => b.controller.level - a.controller.level || b.controller.progress - a.controller.progress )
    .forEach( room => {
      let rclPercentage = ((room.controller.progress / room.controller.progressTotal) * 100.0).toFixed(1);
      rclPercentage = " " + rclPercentage;
      rclPercentage = rclPercentage.substring(rclPercentage.length - 4);

      string += `\n\n\tRoom ${roomLink(room.name)} :\tLevel ${room.controller.level}`;
      if (room.controller.level < 8) {
        string += `\t\tProgress: ${rclPercentage} %\t<progress value="${room.controller.progress}" max="${room.controller.progressTotal}"></progress>`;
      }

      let roomLevel = room.controller.level;
      Object.keys(CONTROLLER_STRUCTURES).forEach( type => {
        let numStructures = (getRoomStructuresByType(room)[type] || []).length;
        numStructures = numStructures + (getRoomConstructionSitesByType(room)[type] || []).length;
        let numPossible = CONTROLLER_STRUCTURES[type][roomLevel];
        if (type !== STRUCTURE_CONTAINER && numPossible < 2500 && numStructures < numPossible) {
          string += `\t | <span style=color:#00ffff>${type}'s missing: ${numPossible - numStructures}</span>`;
        }
      });
    });

  console.log(gclString + string);
};
