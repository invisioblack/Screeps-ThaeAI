"use strict";

class RoleMiner extends RoleBase {
  constructor(creep) {
    super(creep);
  }


  //main action function of the role
  act() {
    let source = Game.getObjectById(this.remember('sID'));

    //no saved sourceID, terminate
    //TODO: iterate over sources and find an empty one
    if (source == null) {
      console.log("Creep: " + this.creep.name + ' has no sID, terminating.');
      this.creep.say('I have no sID, goodbye.');
      this.creep.suicide();
    }

    if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
      this.creep.moveTo(source);
    }
  }

  static findUnusedSourceID(room) {
    return room.find(FIND_SOURCES, { filter: (s) =>  !s.memory.miner })[0].id;
  }

  static setSourceMiner(sID, creep) {
    Memory.sources[sID].miner = creep;
  }

  //Generate needed memory variables
  //requires a sourceIndex
  static generateMemory(sourceID) {
    let mem = {};

    //non active role
    mem['role'] = 'miner';
    mem['sID'] = sourceID;

    return mem;
  }

  //Only need to move to the location and mine, only has MOVE and WORK
  static generateBody (energy = 150, numMoves = 1) {
    //Minimum value for [WORK, MOVE]
    if (energy < 150)
      energy = 150;

    //min number of moves
    if (numMoves < 1)
      numMoves = 1;

    //Only a single move by default
    let body = [];

    //default of 1 move, may add more
    while (numMoves > 0){
      energy -= 50;
      numMoves--;
      body.push(MOVE);
    }

    //Number of WORK parts to be added
    let numParts = Math.floor(energy/100);
    while (numParts > 0) {
      numParts--;
      body.push(WORK);
    }

    return body;
  }
}

global.RoleMiner = RoleMiner;
