'use strict';

global.CreepManager = class {
  static doActions() {
    //iterate over creeps and load their handlers
    for (let c in Game.creeps) {
      let creep = Game.creeps[c];
      let loadedCreep = null;
      switch (creep.memory['role']) {
        case 'builder':
          loadedCreep = new RoleBuilder(creep);
          break;
        case 'miner':
          loadedCreep = new RoleMiner(creep);
          break;
        case 'repairer':
          loadedCreep = new RoleRepairer(creep);
          //console.log('role repair')
          break;
        case 'upgrader':
          loadedCreep = new RoleUpgrader(creep);
          break;
      }


      //we didn't load, something went wrong
      if (loadedCreep === null)
        return;

      //builds the creep memory and runs its act() function
      loadedCreep.act();
    }
  }

  //role of the creep, the spawner object to spawn, max energy usable for this creep
  //if negative, use the maximum possible in the room, get room object from spawn object
  //TODO: Shove spawn code into static class methods
  static spawn(role, spawner, maxEnergy = -1) {
    //if no sourceIndex set or is too high, set to 0
    if ((!Memory.sourceIndex) || (Memory.sourceIndex >= Game.spawns.Spawn1.room.find(FIND_SOURCES).length))
      Memory.sourceIndex = 0;
    let room = spawner.room;
    if (maxEnergy < 0)
      maxEnergy = room.energyCapacityAvailable;
    /*
     TOUGH 	        10
     MOVE 	        50
     CARRY 	        50
     ATTACK 	      80
     WORK 	        100
     RANGED_ATTACK  150
     HEAL 	        250
     CLAIM 	        600
     */

    let mem = null;
    let body = null;

    //creep init
    switch (role) {
      case 'builder':
        break;
      case 'miner':
        let sID = RoleMiner.findUnusedSourceID(room);
        if (!sID)
          log.error('No sID found, why create a miner?');
        body = RoleMiner.generateBody();
        mem = RoleMiner.generateMemory(sID);
        break;
      case 'repairer':
        break;
      case 'upgrader':
        break;
    }

    let name = role + '-' + Game.time;
    //console.log("TrySpawn: " + name + ' PartsUsed: ' + Math.floor(maxEnergy / 200) + ' Memory: ' + JSON.stringify(mem));
    let canMake = spawner.canCreateCreep(body, name);
    if (canMake === OK) {
      let creep = spawner.createCreep(body, name, mem);
      console.log("Spawned: " + name + ' PartsUsed: ' + Math.floor(maxEnergy / 200) + ' Memory: ' + JSON.stringify(mem));
      Memory.sourceIndex++;

      //creep success, perform post processing
      switch (role) {
        case 'builder':
          break;
        case 'miner':
          RoleMiner.setSourceMiner(mem.sID, creep);
          break;
        case 'repairer':
          break;
        case 'upgrader':
          break;
      }
    }
  }


  //Uses passed room object to check for mim pop and adds missing creeps to the spawn queue
  static populationCheck(room) {
    let rcl = room.controller.level;

    room.memory.spawnQueue = [];
    //iterate over each role, check for num vs max, build spawn list
    for (let role in CreepSetup.roles) {
      let roleSetup = CreepSetup.roles[role];
      //is the rcl high enough for this creep
      if (rcl >= roleSetup.minRCL) {
        //TODO add a check for spawns in queue, until then, wipe queue on this call
        let creepNeeded = HelperFunctions.objOrFunc(roleSetup.RCL[rcl].maxSpawned, room) - _.sum(room.find(FIND_MY_CREEPS, {filter: (c) => c.memory.role == role}));
        while (creepNeeded > 0) {
          //spawn queue
          room.memory.spawnQueue.push({role: role, setup: roleSetup.RCL[rcl]});
          creepNeeded--;
        }
      }
    }
  }

  static processSpawnQueue(room) {
    let arr = room.memory.spawnQueue;
    let q = _.sortBy(arr, a => -a.setup.weight);
    while (q.length > 0) {
      log.log(q.length + ' ' + q.pop().role)
    }
  }
};