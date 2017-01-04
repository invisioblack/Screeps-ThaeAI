'use strict';

import {CreepAction} from './base';

export class CreepActionBuild extends CreepAction {

  constructor() {
    super('build');
    this.range = 3;
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
    return creep.carry.energy > 0 && creep.room.hasConstructionSites;
  }

  isValidTarget(creep: Creep, target: string): boolean {
    return Game.getObjectById<ConstructionSite>(target) != null;
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