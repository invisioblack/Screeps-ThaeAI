'use strict';

import {CreepSetup} from '../creep/setup/base'

export class CreepManager {

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
        } else {
          role.act(creep);
        }
      }
    }
  }

  static spawn(setup : CreepSetup, room: Room) : boolean {
    let maxEnergy = room.energyCapacityAvailable;
    let energyAvailable = room.energyAvailable;
    let spawner : Spawn = null;
    let rclSetup = setup.RCL[room.controller.level];

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
    let maxMult = setup.getMaxMulti(room);
    let name = setup.role + '-' + Game.time;
    let body: string[] = rclSetup.baseBody;
    let mem: any = {
      spawnRoom:  room.name,
      name:       name,
      target:     '',
      role:       setup.role,
      action:     'idle',
      singing:    'This|is|the|song|that|never|ends|It|goes|on|and|on|my|friends|A|few|creeps|started|singing|it|not|knowing|what|it|was|They\'re|singing|forever|and|ever|for|the|reason|just|because'
    };

    //if we can make body bigger, find the max amount multiBody we can add with avail energy, accounting for base body, not exceeding maxMult
    if (maxMult > 0)
      maxMult = Math.min(Math.floor((maxEnergy - CreepSetup.getBodyCost(body)) / CreepSetup.getBodyCost(rclSetup.multiBody)), maxMult);

    while (maxMult > 0) {
      maxMult--;
      body = body.concat(rclSetup.multiBody);
    }

    //not enough energy to make the maxed out body
    //TODO try and make a smaller creep?
    //TODO add emergency worker creep for when we break spawning here, check age of spawn queue
    let cost = CreepSetup.getBodyCost(body);
    if (cost > energyAvailable) {
      log.debug('Attempted to make a ' + name + " but there wasn't enough energy! Deficit of: " + (cost - energyAvailable));
      return false;
    }

    //sort the body
    //TODO maybe different sort for differing purposes?
    body = CreepSetup.sortBody(body);

    //we have memory, a body, and a name. Checked for energy, try and spawn it now
    if (spawner.canCreateCreep(body, name) === OK) {
      spawner.createCreep(body, name, mem);
      log.debug("Spawned: " + name + ' PartsUsed: ' + body.join() + ' Memory: ' + ex(mem));
      return true;
    }
    return false;
  }

  static populationCheck(room: Room) {
    let rcl = room.controller.level;
    let q = <CreepSetup[]>[];

    //wipe spawn queue for now
    if (room.memory.spawnQueue)
      delete room.memory.spawnQueue;

    room.memory.spawnQueue = <string[]>[];

    //iterate over each role, check for num vs max, build spawn list
    for (let role in CreepSetups) {
      let roleSetup: CreepSetup = CreepSetups[role];

      //is the rcl high enough for this creep
      if (rcl >= roleSetup.minRCL) {
        let creepNeeded = roleSetup.getMaxSpawnable(room) - room.find(FIND_MY_CREEPS, {filter: (c : Creep) => c.memory.role == role}).length;
        while (creepNeeded > 0) {
          //spawn queue
          q.push(roleSetup);
          creepNeeded--;
        }
        //sort the array if we even have anything
        if (q.length > 0) {
          q = _.sortBy(q, function(a : CreepSetup) { return -a.RCL[rcl].weight; });
          for (let itm in q) {
            room.memory.spawnQueue.push(q[itm].role);
          }
        }
      }
    }
  }

  static processSpawnQueue(room: Room) {
    let q = room.memory.spawnQueue;
    if (!q || q.length < 1)
      return;
    let done = false;
    while (!done) {
      let tmp: CreepSetup = CreepSetups[q.shift()];
      if (tmp) {
        //if unable to spawn, were either out of energy, or no more spawns free
        if (!CreepManager.spawn(tmp, room)) {
          q.unshift(tmp.role);
          done = true;
        }
      } else {
        done = true;
      }
    }
  }
}