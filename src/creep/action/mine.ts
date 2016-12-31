'use strict';

import {CreepAction} from './base';

export class CreepActionMine extends CreepAction {

  constructor() {
    super('mine');
  }

  assign(creep: Creep, target?: string) : boolean {
    let ret = false;
    if (this.isValidAction(creep)) {
      if (!this.isValidTarget(creep, target)) {
        target = this.newTarget(creep);
      }
      if (target != '') {
        Game.getObjectById<Source>(target).memory.minerCount++;
        creep.memory.action = this.name;
        ret = true;
      }
    } else {
      ret = false;
    }
    return ret;
  }

  isValidAction(creep: Creep): boolean {
    return ((creep.carryCapacity > creep.carrySum) && creep.room.mineableEnergy > 0);
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
    let room = creep.room;
    //decrement miner count if we have an old target
    if (creep.memory.target != '')
      Memory.sources[creep.memory.target].minerCount--;



    return ret;
  }

  work(creep: Creep): number {
    return OK;
  }
}

CreepActions['mine'] = new CreepActionMine();