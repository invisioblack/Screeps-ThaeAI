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


    const res = creep.pos.findClosestByRange<Resource>(FIND_DROPPED_RESOURCES, {filter : (s: Resource) =>  s.resourceType == RESOURCE_ENERGY && s.amount > 20});
    if (res != null)
      ret = res.id;

    return ret;
  }

  work(creep: Creep): number {
    return creep.pickup(Game.getObjectById<Resource>(creep.memory.target));
  }
}

CreepActions['pickup'] = new CreepActionPickup();