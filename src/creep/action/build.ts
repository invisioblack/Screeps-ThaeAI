'use strict';

import {CreepAction} from './base';

export class CreepActionBuild extends CreepAction {

  constructor() {
    super('build');
    this.range = 3;
  }

  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.hasConstructionSites;
  }

  newTarget(creep: Creep): string {
    let ret = '';

    const struct = creep.pos.findClosestByRange<ConstructionSite>(FIND_MY_CONSTRUCTION_SITES);
    if (struct != null)
      ret = struct.id;

    return ret;
  }

  work(creep: Creep): number {
    return creep.build(Game.getObjectById<ConstructionSite>(creep.memory.target));
  }
}

CreepActions['build'] = new CreepActionBuild();