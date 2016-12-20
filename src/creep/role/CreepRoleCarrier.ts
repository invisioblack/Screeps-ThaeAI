"use strict";

class RoleCarrier extends RoleBase {
  constructor(creep: Creep) {
    super(creep);
  }


  //main action function of the role
  act() {
    //Working is defined as having a full load and either unloading at a location or moving towards a location to unload
    let working = this.remember('working');
    let carryEnergy = this.creep.carry.energy;

    //Emptied payload
    if (working && carryEnergy == 0) {
      working = false;
      this.remember('working', false);
    }

    //Full Payload
    else if (!working && carryEnergy == this.creep.carryCapacity) {
      working = true;
      this.remember('working', true);
    }

    //Perform work functions. These functions should be overridden in sub role
    if (working) {
      //full, should be moving to a dump
      let site = this.creep.pos.findClosestByRange<Structure>(FIND_MY_STRUCTURES, {
        filter: (s) => (
        s.structureType == STRUCTURE_SPAWN ||
        s.structureType == STRUCTURE_EXTENSION ||
        s.structureType == STRUCTURE_TOWER)
        && s.energy < s.energyCapacity
      });

      if (site != null) {
        if (this.creep.transfer(site, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
          this.creep.moveTo(site);
        }
      }
    } else {

    }
  }
}
