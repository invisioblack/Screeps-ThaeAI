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
    let places = creep.room.find<ConstructionSite>(FIND_MY_CONSTRUCTION_SITES);
    let ret = '';

    //TODO pick closest site
    if (places.length > 0)
      ret = places[0].id;

    return ret;
  }

  work(creep: Creep): number {
    return creep.build(Game.getObjectById<ConstructionSite>(creep.memory.target));
  }
}

CreepActions['build'] = new CreepActionBuild();