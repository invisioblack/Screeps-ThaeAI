'use strict';

import {CreepAction} from './base';

export class CreepActionRepair extends CreepAction {

  constructor() {
    super('repair');
    this.range = 3;
  }

  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.hasRepairables;
  }

  newTarget(creep: Creep): string {
    let ret = '';

    const res = creep.pos.findClosestByRange<Structure>(FIND_DROPPED_RESOURCES, {filter : (s: Structure) =>  (s.structureType != STRUCTURE_WALL && s.structureType != STRUCTURE_RAMPART) && s.hits < s.hitsMax});
    if (res != null)
      ret = res.id;

    return ret;
  }

  //super hacky but forces the creep to reacquire a job after repairing. Gets stuck on a single job even once its repaired
  work(creep: Creep): number {
    creep.memory.action = 'idle';
    return creep.repair(Game.getObjectById<Structure>(creep.memory.target));
  }
}

CreepActions['repair'] = new CreepActionRepair();