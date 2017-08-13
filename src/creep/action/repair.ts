'use strict';

import {CreepAction} from './base';

export class CreepActionRepair extends CreepAction {

  constructor() {
    super('repair');
    this.range = 3;
  }

  //TODO maybe check here for repairable structures? maybe a memory block for structures? probably not with no easy way to register damage
  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0;
  }

  newTarget(creep: Creep): string {
    let places = creep.room.find<Structure>(FIND_STRUCTURES, { filter : function (o: Structure) { return o.structureType != STRUCTURE_RAMPART && o.structureType != STRUCTURE_RAMPART}});
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

  work(creep: Creep): number {
    return creep.repair(Game.getObjectById<Structure>(creep.memory.target));
  }
}

CreepActions['repair'] = new CreepActionRepair();