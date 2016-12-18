'use strict';

require('./requires');

module.exports.loop = function () {
  let gTick = Game.time;
  log.log('***************NEW TICK***************' + gTick + '***************');

  //cleans up memory
  MemoryManager.garbageCollection();

  //check and build Memory.room every 10 ticks
  if ((gTick % 10) == 0)
    MemoryManager.buildRoomMemory();

  //TODO room manager?

  //every 5th tick do pop check
  if ((gTick % 5) == 0) {
    for (let r in Memory.rooms) {
      CreepFactory.populationCheck(Game.rooms[r]);
    }
  }

  //process spawn queues
  for (let r in Memory.rooms) {
    CreepFactory.processSpawnQueue(Game.rooms[r]);
  }

  //processes every creep and does .act()
  CreepFactory.doActions();

};