'use strict';

import {CreepAction} from './base';

export class CreepActionIdle extends CreepAction {

  constructor() {
    super('idle');
  }

  assign(creep: Creep) : boolean {
    creep.memory.action = this.name;
    return true;
  }

  isValidAction(creep: Creep): boolean {
    return true;
  }

  newTarget(creep: Creep): string {
    return null;
  }

  work(creep: Creep): number {
    return OK;
  }
}

CreepActions['idle'] = new CreepActionIdle();