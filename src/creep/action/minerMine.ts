'use strict';

import {CreepAction} from './base';

export class CreepActionMinerMine extends CreepAction {

  constructor() {
    super('minerMine');
    this.range = 1;
  }

  assign(creep: Creep) : boolean {
    let ret = super.assign(creep);
    if (ret)
      Memory.sources[creep.memory.target].dedicatedMiner = creep.name;
    return ret;
  }

  isValidAction(creep: Creep): boolean {
    return creep.memory.role == 'miner';
  }

  newTarget(creep: Creep): string {
    let ret = '';

    for (let s of creep.room.memory.sources) {
      let src = Game.getObjectById<Source>(s);
      if ((_.isUndefined(src.dedicatedMiner)) || (src.dedicatedMiner && src.dedicatedMiner == creep.name)) {
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

CreepActions['minerMine'] = new CreepActionMinerMine();