'use strict';

import {CreepAction} from './base';


//hacky usage for <StructureSpawn> here. spawns and extensions both have the same properties of energy and energyCapacity but their same parent OwnedStructure does not. May break if API changes
export class CreepActionRecharge extends CreepAction {

  constructor() {
    super('recharge');
    this.range = ACTION_RANGES.DEPOSIT;
  }

  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.neededBatteryEnergy > 0;
  }

  newTarget(creep: Creep): string {
    let places = creep.room.find<StructureTower>(FIND_MY_STRUCTURES, {filter : (s : OwnedStructure) =>  s.structureType == STRUCTURE_TOWER});
    let ret = '';

    for (let s of places) {
      if (s.energy < s.energyCapacity) {
        ret = s.id;
        break;
      }
    }
    return ret;
  }

  work(creep: Creep): number {
    return creep.transfer(Game.getObjectById<StructureSpawn>(creep.memory.target), RESOURCE_ENERGY);
  }
}

CreepActions['recharge'] = new CreepActionRecharge();