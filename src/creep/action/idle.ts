'use strict';

import {CreepAction} from './base';

export class CreepActionIdle extends CreepAction {

  constructor() {
    super('idle');
  }

  assign(creep: Creep, target?: string) : boolean {
    return true;
  }

  isValidAction(creep: Creep): boolean {
    return true;
  }

  isValidTarget(creep: Creep, target: string): boolean {
    return true;
  }

  work(creep: Creep): number {
    return OK;
  }
}

CreepActions['idle'] = new CreepActionIdle();