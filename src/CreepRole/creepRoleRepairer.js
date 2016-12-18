/*
 let RoleBuilder = require('roleBuilder');

 class RoleRepairer extends RoleBuilder {
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
 let building = this.creep.pos.findClosestByPath(FIND_STRUCTURES, { filter : (s) => s.hits < s.hitsMax});// && s.structureType != STRUCTURE_WALL});

 if (building != null) {
 if (this.creep.repair(building) == ERR_NOT_IN_RANGE) {
 this.creep.moveTo(building);
 }
 } else {
 super.doWork();
 }
 }
 }

 module.exports = RoleRepairer;
 */
