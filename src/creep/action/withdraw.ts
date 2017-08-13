'use strict';

import {CreepAction} from './base';

export class CreepActionWithdraw extends CreepAction {

  constructor() {
    super('withdraw');
    this.range = 1;
  }

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.carrySum) && creep.room.storedEnergy > 0);
  }

  newTarget(creep: Creep): string {
    return creep.room.find<Structure>(FIND_STRUCTURES, { filter : (s: Structure) => s.structureType == STRUCTURE_STORAGE || s.structureType == STRUCTURE_CONTAINER})[0].id;
  }

  work(creep: Creep): number {
    return creep.withdraw(Game.getObjectById<Structure>(creep.memory.target), RESOURCE_ENERGY);
  }
}

CreepActions['withdraw'] = new CreepActionWithdraw();