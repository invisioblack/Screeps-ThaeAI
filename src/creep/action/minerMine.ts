'use strict';

import {CreepAction} from './base';

/**
 * Action meant for miners to mine
 */
export class CreepActionMinerMine extends CreepAction {

  constructor() {
    super('minerMine');
    this.range = 1;
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
        Memory.sources[target].dedicatedMiner = creep.name;
        ret = true;
      }
    } else {
      ret = false;
    }
    return ret;
  }

  isValidAction(creep: Creep): boolean {
    return creep.memory.role == 'miner';
  }

  isValidTarget(creep: Creep, target: string): boolean {
    let src = Game.getObjectById<Source>(target);
    let ret = false;
    if (src != null)
      ret = src.energy > 0;
    return ret;
  }

  newTarget(creep: Creep): string {
    let ret = '';

    for (let s of creep.room.memory.sources) {
      let src = Game.getObjectById<Source>(s);
      if ((_.isUndefined(src.dedicatedMiner)) || (src.dedicatedMiner && src.dedicatedMiner == creep.name)) {
        ret = s;
        break;
        //found one, break to save cpu
      }
    }

    return ret;
  }

  work(creep: Creep): number {
    return creep.harvest(Game.getObjectById<Source>(creep.memory.target));
  }
}

CreepActions['minerMine'] = new CreepActionMinerMine();