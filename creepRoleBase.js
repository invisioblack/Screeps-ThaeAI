"use strict";

global.RoleBase = class {
  constructor(creep) {
    this.creep = creep;
  }

  //memory get/set
  remember(key, value) {
    if (value === undefined)
      return this.creep.memory[key];

    this.creep.memory[key] = value;

    return value;
  }

  //memory deletion
  forget(key) {
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

  //blank memory outside of base role
  static generateMemory() {
    let mem = {};

    //non active role
    mem['role'] = 'base';

    return mem;
  }

  //Generates the standard generic body
  static generateBody(energy = 200) {
    if (energy < 200)
      energy = 200;
    let numberOfParts = Math.floor(energy / 200);
    let body = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(CARRY);
    }
    for (let i = 0; i < numberOfParts; i++) {
      body.push(MOVE);
    }
    return body;
  }

  //Prototype function for work portion of the cycle, should be overridden in sub roles
  doWork() { //cant be static, has to be overriden to do work
    console.log('A subrole has not overriden doWork() or calling baseRole somehow.');
  }

  //Default function that will go to the source based on the saved index and mine from it
  doNonWork() {
    let source = this.creep.room.find(FIND_SOURCES);
    let memIndex = this.remember('sourceIndex');
    if (this.creep.harvest(source[memIndex]) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(source[memIndex]);
    }
  }

};;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
