'use strict';

import {CreepAction} from './base';


//hacky usage for <StructureSpawn> here. spawns and extensions both have the same properties of energy and energyCapacity but their same parent OwnedStructure does not. May break if API changes
export class CreepActionFill extends CreepAction {

  constructor() {
    super('fill');
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

  /**
   * Valid as long as we are carrying some amount of energy
   * @param creep
   * @returns {boolean}
   */
  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.neededSpawnEnergy > 0;
  }

  isValidTarget(creep: Creep, target: string): boolean {
    let dump = Game.getObjectById<StructureSpawn>(target);
    let ret = false;
    if (dump != null)
      ret = (dump.energyCapacity - dump.energy) <= creep.carry.energy;
    return ret;
  }

  newTarget(creep: Creep): string {
    //TODO multiple creeps going to same target? request system?
    let places = creep.room.find<StructureSpawn>(FIND_MY_STRUCTURES, {filter : (s : OwnedStructure) =>  s.structureType == STRUCTURE_EXTENSION || s.structureType == STRUCTURE_SPAWN});
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

CreepActions['fill'] = new CreepActionFill();