'use strict';

import {CreepAction} from './base';

export class CreepActionUpgrade extends CreepAction {

  constructor() {
    super('upgrade');
    this.range = 3;
  }

  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.controller.my;
  }

  newTarget(creep: Creep): string {
    return creep.room.controller.id;
  }

  work(creep: Creep): number {
    return creep.upgradeController(creep.room.controller);
  }
}

CreepActions['upgrade'] = new CreepActionUpgrade();