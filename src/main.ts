'use strict';
import './setupGlobals';

import {MemoryManager} from './managers/MemoryManager';
import {CreepManager} from './managers/CreepManager';
import {RoomManager} from './managers/RoomManager';

injectLoAN();

log.DEBUG_ENABLED = true;
log.LOG_ENABLED = true;

module.exports.loop = function () {
  let gTick = Game.time;
  log.debug('***************NEW TICK***************' + gTick + '***************');

  if(Game.cpu.bucket < 2500)
    log.err(`bucket is at or less than 25% ${Game.cpu.bucket}`);
  else if(Game.cpu.bucket < 5000)
    log.warn(`bucket is at or less than 50% ${Game.cpu.bucket}`);

  //cleans up memory
  MemoryManager.garbageCollection();

  //check and build Memory.room every 10 ticks
  if ((gTick % 10) == 0)
    MemoryManager.buildRoomMemory((gTick % 100) == 0);

  //TODO room manager?

  //every 5th tick do pop check
  if ((gTick % 5) == 0) {
    for (let r in Memory.rooms) {
      CreepManager.populationCheck(Game.rooms[r]);
    }
  }

  //process spawn queues
  for (let r in Memory.rooms) {
    CreepManager.processSpawnQueue(Game.rooms[r]);
  }

  //processes every owned room
  RoomManager.processRooms();

  //processes every creep and does .act()
  CreepManager.doActions();


};