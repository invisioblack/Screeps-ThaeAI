'use strict';
import {RoleBase} from './CreepRoleBase';

export class RoleMiner extends RoleBase {
  constructor(creep: Creep) {
    super(creep);
  }


  //main action function of the role
  act() {
    let source = Game.getObjectById<Source>(this.remember('sID'));

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
    return room.find(FIND_SOURCES, {filter: (s) => !s.memory.miner})[0].id;
  }

  static setSourceMiner(sID, creep) {
    Memory.sources[sID].miner = creep;
  }
}
