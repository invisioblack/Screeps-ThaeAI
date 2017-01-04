'use strict';

import {CreepAction} from './base';

/**
 * Action meant for workers to mine
 * TODO write a miner specific mine action
 */
export class CreepActionMine extends CreepAction {

  constructor() {
    super('mine');
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
        ret = true;
      }
    } else {
      ret = false;
    }
    return ret;
  }

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.carrySum) && creep.room.mineableEnergy > 0) || creep.memory.role == 'miner';
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
      if (src.usableFields > src.minerCount) {
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

CreepActions['mine'] = new CreepActionMine();