'use strict';

import './setupGlobals';

import {MemoryManager} from './managers/MemoryManager';
import {CreepManager} from './managers/CreepManager';

module.exports.loop = function () {
  let gTick = Game.time;
  log.DEBUG_ENABLED = true;
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

  //processes every creep and does .act()
  CreepManager.doActions();


  //singing!
  for (let r in Memory.rooms) {
    if (ROOM_SINGING)
      Game.rooms[r].sing("1|2|3");

    let os : OwnedStructure[] = Game.rooms[r].find<OwnedStructure>(FIND_MY_STRUCTURES);
    for (let s in os) {
      //new RoomVisual(r).text(s.structureType, s.pos.x+1, s.pos.y);
    }
  }
};