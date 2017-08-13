'use strict';

import {CreepAction} from './base';

export class CreepActionWithdrawStorage extends CreepAction {

  constructor() {
    super('withdrawStorage');
    this.range = ACTION_RANGES.WITHDRAW;
  }

  isValidAction(creep: Creep): boolean {
    return (creep.room.storage && (creep.carryCapacity > creep.carrySum) && creep.room.storage.store[RESOURCE_ENERGY] > 0);
  }

  newTarget(creep: Creep): string {
    return creep.room.storage.id;
  }

  work(creep: Creep): number {
    return creep.withdraw(creep.room.storage, RESOURCE_ENERGY);
  }
}

CreepActions['withdrawStorage'] = new CreepActionWithdrawStorage();