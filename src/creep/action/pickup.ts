'use strict';

import {CreepAction} from './base';

/**
 * Grabs resources from the ground
 */
export class CreepActionPickup extends CreepAction {

  constructor() {
    super('pickup');
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

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.carrySum) && creep.room.pickableEnergy > 0);
  }

  isValidTarget(creep: Creep, target: string): boolean {
    let tar = Game.getObjectById<Resource>(target);
    let ret = false;
    if (tar != null)
      ret = tar.amount > 20;
    return ret;
  }

  newTarget(creep: Creep): string {
    let ret = '';

    for (let r of creep.room.find<Resource>(FIND_DROPPED_ENERGY, { filter : { resourceType : RESOURCE_ENERGY }})) {
      if (r.amount > 20) {
        ret = r.id;
        break;
        //found one, break to save cpu
      }
    }

    return ret;
  }

  work(creep: Creep): number {
    return creep.pickup(Game.getObjectById<Resource>(creep.memory.target));
  }
}

CreepActions['pickup'] = new CreepActionPickup();