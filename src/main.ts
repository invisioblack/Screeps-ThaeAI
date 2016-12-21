'use strict';

import './setupGlobals';

import {MemoryManager} from './managers/MemoryManager';
import {CreepManager} from './managers/CreepManager';

module.exports.loop = function () {
  let gTick = Game.time;
  log.log('***************NEW TICK***************' + gTick + '***************');

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

  //processes every creep and does .act()
  CreepManager.doActions();

};