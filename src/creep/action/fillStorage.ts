'use strict';

import {CreepAction} from './base';


export class CreepActionFillStorage extends CreepAction {

  constructor() {
    super('fillStorage');
    this.range = 1;
  }

  assign(creep: Creep, target?: string) : boolean {
    let ret = false;
    if (this.isValidAction(creep)) {
      if (!this.isValidTarget(creep, target)) {
        target = this.newTarget(creep);
      }
      if (target != '') {
        creep.memory.action = this.name;
        creep.memory.target = target;
        ret = true;
      }
    } else {
      ret = false;
    }
    return ret;
  }

  /**
   * Valid as long as theres a storage, we have energy, and theres room
   * @param creep
   * @returns {boolean}
   */
  isValidAction(creep: Creep): boolean {
    return !_.isUndefined(creep.room.storage) && creep.carry.energy > 0 && (STORAGE_CAPACITY * STORAGE_ENERGY_THRESHOLD > creep.room.storage.store[RESOURCE_ENERGY]);
  }

  isValidTarget(creep: Creep, target: string): boolean {
    return Game.getObjectById(target) instanceof StructureStorage;
  }

  newTarget(creep: Creep): string {
    let ret = '';
    if (!_.isUndefined(creep.room.storage))
      ret = creep.room.storage.id;
    return ret;
  }

  //if the structure adding to is full, will come back not OK and then a new action is gotten, which has the carrier going and grabbing more energy...

  work(creep: Creep): number {
    creep.transfer(creep.room.storage, RESOURCE_ENERGY);
    return (this.isValidAction(creep)) ? ERR_NOT_ENOUGH_ENERGY : OK;
  }
}

CreepActions['fillStorage'] = new CreepActionFillStorage();