"use strict";

class MemoryManager {
  constructor() {

  }


  //TODO make this usable every loop to update new rooms I own? Or add a new function add a new room to memory
  static buildRoomMemory() {
    if (!Memory.rooms)
      Memory.rooms = {};

    for (let r in Game.rooms) {
      let room = Game.rooms[r];
      if (room.find(FIND_MY_STRUCTURES).length > 0) {
        //this is my room, now do stuff
        //it doesnt exist yet
        if (Memory.rooms[r] == undefined) {
          let mem = {};

          mem.sources = [];
          for (let s of room.find(FIND_SOURCES)) {
            mem.sources.push(s.id);
          }

          mem.spawns = [];
          for (let s of room.find(FIND_MY_SPAWNS)) {
            mem.spawns.push(s.name);
          }

          mem.spawnQueue = [];

          Memory.rooms[r] = mem;
        }
      }
    }
  }

  //TODO iterate over rooms memory and clear out ones that i dont own
  static garbageCollection() {
    for (let c in Memory.creeps) {
      if (!Game.creeps[c])
        delete Memory.creeps[c];
    }
    //removes .miner from source memory if that creep is dead
    //allows a new one to take over
    for (let c in Memory.sources) {
      if (!Game.creeps[Memory.sources[c].miner])
        delete Memory.sources[c].miner;
    }

    //if the Memory.room doesnt exist in my rooms, delete it.
    //later may need to save rooms, for now leave as is
    for (let r in Memory.rooms){
      if (!_.find(Game.rooms, (o) => o.name == r))
        delete Memory.rooms[r];
    }
  }
}

global.MemoryManager = MemoryManager;