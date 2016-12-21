'use strict';
//import {HelperFunctions} from '../helperFunctions'
import {CreepSetup} from '../creep/setup/base'

/**
 * CreepManager
 *  Static class that handles all of the creeps actions each tick
 */
export class CreepManager {
  /**
   * Iterates over all of the creeps and runs their roles act()
   */
  static doActions() {
    //iterate over creeps and load their handlers
    for (let c in Game.creeps) {
      let creep = Game.creeps[c];
      if (!creep.spawning) {
        let role = CreepRoles[creep.memory.role];

        //TODO give the creep a role based on layout? or try and default to worker if possible or suicide it
        if (!role) {
          log.err('Creep with no role, committing seppuku');
          creep.suicide();
          return;
        }

        role.act(creep);
      }
    }
  }

  /**
   * Spawns a creep in the chosen Room based on provided CreepSetup object
   * @param role  CreepSetup object to generate a creep from
   * @param room  Room object to spawn the creep in
   * @returns {boolean} whether or not the spawn was successful
   */
  static spawn(role : CreepSetup, room: Room) : boolean {
    let maxEnergy = room.energyCapacityAvailable;
    let energyAvailable = room.energyAvailable;
    let spawner : Spawn = null;
    let rclSetup = role.RCL[room.controller.level];

    //cant even spawn with min body size
    if (maxEnergy < rclSetup.minEnergy || rclSetup.minEnergy > energyAvailable)
      return false;

    for (let s of room.find<Spawn>(FIND_MY_SPAWNS)){
      if (!s.spawning)
        spawner = s;
    }

    //no available spawns
    if (spawner == null)
      return false;

    //able to try and spawn now, generate parts needed to spawn
    let maxMult = CreepSetup.objOrFunc(rclSetup.maxMulti, room);
    let name = role.role + '-' + Game.time;
    let body: string[] = rclSetup.baseBody;
    let mem: any = {
      spawnRoom:  room.name,
      name:       name,
      target:     null,
      role:       role.role,
      action:     null
    };

    //if we can make body bigger, find the max amount multiBody we can add with avail energy, accounting for base body
    if (maxMult > 0)
      maxMult = Math.floor((energyAvailable - CreepSetup.getBodyCost(body)) / CreepSetup.getBodyCost(rclSetup.multiBody));

    while (maxMult > 0) {
      maxMult--;
      body.concat(rclSetup.multiBody);
    }

    //we have memory, a body, and a name. Checked for energy, try and spawn it now
    if (spawner.canCreateCreep(body, name) === OK) {
      spawner.createCreep(body, name, mem);
      log.log("Spawned: " + name + ' PartsUsed: ' + body.join() + ' Memory: ' + ex(mem));
      return true;
    }
    return false;
  }


  /**
   * Builds a rooms spawn queue based on the population required in the Room provided.
   *  Sorts the queue by the weight of the missing creeps
   * @param room Room to generate a spawn queue for
   */
  static populationCheck(room: Room) {
    let rcl = room.controller.level;
    let q = <CreepSetup[]>[];

    //wipe spawn queue for now
    if (room.memory.spawnQueue)
      delete room.memory.spawnQueue;

    room.memory.spawnQueue = <CreepSetup[]>[];

    //iterate over each role, check for num vs max, build spawn list
    for (let role in CreepSetups) {
      let roleSetup: CreepSetup = CreepSetups[role];

      //is the rcl high enough for this creep
      if (rcl >= roleSetup.minRCL) {
        let creepNeeded = CreepSetup.objOrFunc(roleSetup.RCL[rcl].maxSpawned, room) - _.sum(room.find(FIND_MY_CREEPS, {filter: (c : Creep) => c.memory.role == role}));
        while (creepNeeded > 0) {
          //spawn queue
          q.push(roleSetup);
          creepNeeded--;
        }
        //sort the array if we even have anything
        if (q.length > 0)
          room.memory.spawnQueue = _.sortBy(q, function(a : CreepSetup) { return -a.RCL[rcl].weight; });
      }
    }



  }

  /**
   * Processes the provided rooms spawn queue, attempting to spawn as many as possible
   * @param room Room to be processed
   */
  static processSpawnQueue(room: Room) {
    let q = room.memory.spawnQueue;
    if (!q || q.length < 1)
      return;
    let done = false;
    while (!done) {
      let tmp: CreepSetup = q.shift();
      if (tmp) {
        //if unable to spawn, were either out of energy, or no more spawns free
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