'use strict';
import {HelperFunctions as hf} from '../helperFunctions'

export class CreepManager {
  static doActions() {
    //iterate over creeps and load their handlers
    for (let c in Game.creeps) {
      let creep = Game.creeps[c];
      let loadedCreep = null;

      //we didn't load, something went wrong
      if (loadedCreep === null)
        return;

      //builds the creep memory and runs its act() function
      //loadedCreep.act();
    }
  }


  static spawn(role : any, room: Room) : boolean {
    let maxEnergy = room.energyCapacityAvailable;
    let spawner : Spawn = null;

    for (let s of room.find<Spawn>(FIND_MY_SPAWNS)){
      if (!s.spawning)
        spawner = s;
    }

    //no available spawns
    if (spawner == null)
      return false;

    let mem = null;
    let body = null;


    let name = role + '-' + Game.time;
    //console.log("TrySpawn: " + name + ' PartsUsed: ' + Math.floor(maxEnergy / 200) + ' Memory: ' + JSON.stringify(mem));
    if (spawner.canCreateCreep(body, name) === OK) {
      let creep = spawner.createCreep(body, name, mem);
      log.log("Spawned: " + name + ' PartsUsed: ' + Math.floor(maxEnergy / 200) + ' Memory: ' + ex(mem));

      //creep success, perform post processing

    }
  }


  //Uses passed room object to check for mim pop and adds missing creeps to the spawn queue
  static populationCheck(room: Room) {
    let rcl = room.controller.level;

    //wipe spawn queue for now
    if (room.memory.spawnQueue)
      delete room.memory.spawnQueue;

    room.memory.spawnQueue = [];

    //iterate over each role, check for num vs max, build spawn list
    for (let role in CreepSetups) {
      let roleSetup = CreepSetups[role];

      //is the rcl high enough for this creep
      if (rcl >= roleSetup.minRCL) {
        let creepNeeded = hf.objOrFunc(roleSetup.RCL[rcl].maxSpawned, room) - _.sum(room.find(FIND_MY_CREEPS, {filter: (c : Creep) => c.memory.role == role}));
        while (creepNeeded > 0) {
          //spawn queue
          room.memory.spawnQueue.push(roleSetup.RCL[rcl]);
          creepNeeded--;
        }
      }
    }
  }

  static processSpawnQueue(room: Room) {
    let arr = room.memory.spawnQueue;
    if (!arr || arr.length < 1)
      return;
    let done = false;
    let q = _.sortBy(arr, function(a : any) { return -a.weight; });
    while (!done) {
      let tmp = q.shift();
      if (tmp) {
        //only attempt first in queue, if not possible, quit
        if (!CreepManager.spawn(tmp, room))
        {
          q.unshift(tmp);
          done = true;
        }
      } else {
        done = true;
      }
    }
  }
}