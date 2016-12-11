"use strict";

class RoleCarrier extends RoleBase {
  constructor(creep) {
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
      let site = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
        filter: (s) =>
        (  s.structureType == STRUCTURE_SPAWN ||
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


  //Generate needed memory variables
  static generateMemory() {
    let mem = {};

    //non active role
    mem['role'] = 'carrier';
    mem['working'] = false;

    return mem;
  }

  //Only need to move to the location and mine, only has MOVE and WORK
  static generateBody(energy = 100) {
    //Minimum value for [MOVE, CARRY]
    if (energy < 100)
      energy = 100;

    let numMove = 1;
    let numCarry = 1;

    //1:2 move:carry < 5 parts
    //1:3 move:carry > 5 parts

    let body = [];
    let carryPerMove = 2;
    if (energy > 250)
      carryPerMove = 3;

    //if less than 150, counts already set
    if (energy >= 150) {
      energy -= 100; //for already set move/carry
      let totalParts = Math.floor(energy / 50);
      let counter = 0;
      while (totalParts > 0) {
        console.log(carryPerMove % counter);;;;;;;;;;;;;;;;;;;;;;;;;
        console.log(counter);;;;;;;;;;;;;;;;;;;;;;;;;
        console.log(carryPerMove);;;;;;;;;;;;;;;;;;;;;;;;;
        if ((totalParts % carryPerMove) == 0) {
          totalParts--;
          numMove++;
        }
        numCarry++;
        totalParts--;
        counter++;
      }
    }

    let carry = false;
    while ((numCarry > 0) || (numMove > 0)) {
      if (carry) {
        if (numCarry > 0) {
          numCarry--;
          body.push(CARRY);
        }
        carry = false;
      } else {
        if (numMove > 0) {
          numMove--;
          body.push(MOVE);
        }
        carry = true;
      }
    }

    return body;
  }
}

global.RoleCarrier = RoleCarrier;
