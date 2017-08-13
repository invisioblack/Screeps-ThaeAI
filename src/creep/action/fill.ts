'use strict';

import {CreepAction} from './base';


//hacky usage for <StructureSpawn> here. spawns and extensions both have the same properties of energy and energyCapacity but their same parent OwnedStructure does not. May break if API changes
export class CreepActionFill extends CreepAction {

  constructor() {
    super('fill');
    this.range = 1;
  }

  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.neededSpawnEnergy > 0;
  }

  newTarget(creep: Creep): string {
    let ret = '';
    const struct = creep.pos.findClosestByRange<StructureSpawn>(FIND_MY_STRUCTURES, {filter : (s: any) =>  (s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN) && (s.energy < s.energyCapacity)});
    if (struct != null)
      ret = struct.id;

    return ret;
  }

  work(creep: Creep): number {
    return creep.transfer(Game.getObjectById<StructureSpawn>(creep.memory.target), RESOURCE_ENERGY);
  }
}

CreepActions['fill'] = new CreepActionFill();