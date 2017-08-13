'use strict';

import {CreepAction} from './base';


export class CreepActionFillStorage extends CreepAction {

  constructor() {
    super('fillStorage');
    this.range = ACTION_RANGES.DEPOSIT;
  }

  isValidAction(creep: Creep): boolean {
    return !_.isUndefined(creep.room.storage) && creep.carry.energy > 0 && (STORAGE_CAPACITY * STORAGE_ENERGY_THRESHOLD > creep.room.storage.store[RESOURCE_ENERGY]);
  }

  newTarget(creep: Creep): string {
    let ret = '';
    if (!_.isUndefined(creep.room.storage))
      ret = creep.room.storage.id;
    return ret;
  }

  work(creep: Creep): number {
    return creep.transfer(creep.room.storage, RESOURCE_ENERGY);
  }
}

CreepActions['fillStorage'] = new CreepActionFillStorage();