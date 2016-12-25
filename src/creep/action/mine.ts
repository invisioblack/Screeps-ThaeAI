'use strict';

import {CreepAction} from './base';

export class CreepActionMine extends CreepAction {

  constructor() {
    super('mine');
  }

  assign(creep: Creep, target?: string) : boolean {
    return true;
  }

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.sum));
  }

  isValidTarget(creep: Creep, target: string): boolean {
    return true;
  }

  newTarget(creep: Creep): string {
    return null;
  }

  work(creep: Creep): number {
    return OK;
  }
}

CreepActions['mine'] = new CreepActionMine();