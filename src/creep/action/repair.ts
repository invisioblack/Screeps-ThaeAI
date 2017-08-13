'use strict';

import {CreepAction} from './base';

export class CreepActionRepair extends CreepAction {

  constructor() {
    super('repair');
    this.range = 3;
  }

  //TODO maybe check here for repairable structures? maybe a memory block for structures? probably not with no easy way to register damage
  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.hasRepairables;
  }

  newTarget(creep: Creep): string {
    let places = creep.room.find<Structure>(FIND_STRUCTURES, { filter : function (o: Structure) { return o.structureType != STRUCTURE_WALL && o.structureType != STRUCTURE_RAMPART}});
    let ret = '';

    //TODO pick closest site
    if (places.length > 0)
      for (let p in places) {
        if (places[p].hits < places[p].hitsMax) {
          ret = places[p].id;
          break;
        }
      }

    return ret;
  }

  //super hacky but forces the creep to reacquire a job after repairing. Gets stuck on a single job even once its repaired
  work(creep: Creep): number {
    creep.memory.role = 'idle';
    return creep.repair(Game.getObjectById<Structure>(creep.memory.target));
  }
}

CreepActions['repair'] = new CreepActionRepair();