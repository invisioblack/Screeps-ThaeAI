'use strict';

export class RoleBase  {
  protected creep : Creep;
  constructor(creep: Creep) {
    this.creep = creep;
  }

  //memory get/set
  remember(key: string, value?: any): any {
    if (value === undefined)
      return this.creep.memory[key];

    this.creep.memory[key] = value;

    return value;
  }

  //memory deletion
  forget(key: string) {
    delete this.creep.memory[key];
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
      this.doWork();
    } else {
      this.doNonWork();
    }
  }

  //Prototype function for work portion of the cycle, should be overridden in sub roles
  doWork() { //cant be static, has to be overridden to do work
    console.log('A subrole has not overridden doWork() or calling baseRole somehow.');
  }

  //Default function that will go to the source based on the saved index and mine from it
  doNonWork() {
    let source = this.creep.room.find<Source>(FIND_SOURCES);
    let memIndex = this.remember('sourceIndex');
    if (this.creep.harvest(source[memIndex]) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(source[memIndex]);
    }
  }
}