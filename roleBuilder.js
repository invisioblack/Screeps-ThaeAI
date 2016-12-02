/*
let RoleUpgrader = require('roleUpgrader');

class RoleBuilder extends RoleUpgrader {
  constructor(creep) {
    super(creep);
  }

    /!*
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
     this.doWork();
     } else {
     this.doNonWork();
     }
     }
     //!*!/


  doWork() {
    //offload a full load of energy into
    let constSite = this.creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
    if (constSite != null) {
      if (this.creep.build(constSite) == ERR_NOT_IN_RANGE) {
        this.creep.moveTo(constSite);
      }
    } else {
      super.doWork();
    }
  }
}

module.exports = RoleBuilder;
*/
