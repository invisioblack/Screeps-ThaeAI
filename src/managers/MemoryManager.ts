"use strict";

export class MemoryManager {

  static buildRoomMemory(refresh: boolean = false) {
    if (!Memory.rooms)
      Memory.rooms = {};

    for (let r in Game.rooms) {
      let room = Game.rooms[r];
      if (room.controller && room.controller.my) {
        //this is my room, now do stuff
        //it doesn't exist yet or we are forcing a regen
        if (Memory.rooms[r] == undefined || refresh) {
          let mem : any = {};

          mem.sources = [];
          for (let s of room.find<Source>(FIND_SOURCES)) {
            mem.sources.push(s.id);
            _.set(Memory, `sources.${s.id}.room`, room.name);
          }

          mem.spawns = [];
          for (let s of room.find<Spawn>(FIND_MY_SPAWNS)) {
            mem.spawns.push(s.name);
          }

          mem.spawnQueue = [];

          if (refresh)
            delete Memory.rooms[r];
          Memory.rooms[r] = mem;
        }
      }
    }
  }

  static garbageCollection() {
    for (let c in Memory.creeps) {
      if (!Game.creeps[c])
        delete Memory.creeps[c];
    }

    //if not a room I control, remove it
    //eventually need to maintain memory of rooms i reserved, etc
    for (let r in Memory.rooms) {
      if (!Game.rooms[r])
        delete Memory.rooms[r];
    }

    for (let s in Memory.sources) {
      if (!Game.creeps[Memory.sources[s].dedicatedMiner])
        delete Memory.sources[s].dedicatedMiner;
    }
  }
}