'use strict';

import {CreepAction} from './base';

export class CreepActionWithdraw extends CreepAction {

  constructor() {
    super('withdraw');
    this.range = 1;
  }

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.carrySum) && creep.room.storageEnergy > 0);
  }

  newTarget(creep: Creep): string {
    let ret = '';

    const res = creep.pos.findClosestByRange<StructureContainer>(FIND_STRUCTURES, { filter : (s: StructureContainer) => s.structureType == STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0});
    if (res != null)
      ret = res.id;

    return ret;
  }

  work(creep: Creep): number {
    return creep.withdraw(Game.getObjectById<StructureContainer>(creep.memory.target), RESOURCE_ENERGY);
  }
}

CreepActions['withdraw'] = new CreepActionWithdraw();