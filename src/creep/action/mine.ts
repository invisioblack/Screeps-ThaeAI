'use strict';

import {CreepAction} from './base';

export class CreepActionMine extends CreepAction {

  constructor() {
    super('mine');
  }

  assign(creep: Creep, target?: string) : boolean {
    let ret = false;
   //log.log(this.name)
    if (this.isValidAction(creep)) {
     // log.log('is valid')
      if (!this.isValidTarget(creep, target)) {
        target = this.newTarget(creep);
      }
      if (target != '') {
        Game.getObjectById<Source>(target).minerCount++;
        creep.memory.action = this.name;
        ret = true;
      }
    } else {
      ret = false;
    }
    return ret;
  }

  isValidAction(creep: Creep): boolean {
    //log.log(creep.room)
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
    //decrement miner count if we have an old target
    //TODO what if the old target isnt a source object?
    if (creep.memory.target != '')
      Game.getObjectById<Source>(creep.memory.target).minerCount--;

    for (let s of creep.room.memory.sources) {
      let src = Game.getObjectById<Source>(s);
      if (src.usableFields > Memory.sources[s].minerCount) {
        ret = s;
        break;
        //found one, break to save cpu
      }
    }

    return ret;
  }

  work(creep: Creep): number {
    return OK;
  }
}

CreepActions['mine'] = new CreepActionMine();