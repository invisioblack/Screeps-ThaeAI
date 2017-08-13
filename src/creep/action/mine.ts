'use strict';

import {CreepAction} from './base';

export class CreepActionMine extends CreepAction {

  constructor() {
    super('mine');
    this.range = 1;
  }

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.carrySum) && creep.room.mineableEnergy > 0);
  }

  newTarget(creep: Creep): string {
    let ret = '';

    for (let s of creep.room.memory.sources) {
      let src = Game.getObjectById<Source>(s);
      if (src.usableFields > src.minerCount) {
        ret = s;
        break;
      }
    }

    return ret;
  }

  work(creep: Creep): number {
    return creep.harvest(Game.getObjectById<Source>(creep.memory.target));
  }
}

CreepActions['mine'] = new CreepActionMine();