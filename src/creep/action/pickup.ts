'use strict';

import {CreepAction} from './base';

export class CreepActionPickup extends CreepAction {

  constructor() {
    super('pickup');
    this.range = 1;
  }

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.carrySum) && creep.room.pickableEnergy > 0);
  }

  newTarget(creep: Creep): string {
    let ret = '';

    for (let r of creep.room.find<Resource>(FIND_DROPPED_RESOURCES, { filter : { resourceType : RESOURCE_ENERGY }})) {
      if (r.amount > 20) {
        ret = r.id;
        break;
      }
    }

    return ret;
  }

  work(creep: Creep): number {
    return creep.pickup(Game.getObjectById<Resource>(creep.memory.target));
  }
}

CreepActions['pickup'] = new CreepActionPickup();