'use strict';

import {CreepRole} from './base';

//TODO refactor miner code right into this role, it is very specific unlike other roles
export class CreepRoleMiner extends CreepRole {

  constructor() {
    super('miner');
  }

  nextAction(creep: Creep): CreepAction {
    let priority = [
      'minerMine',
      'idle'
    ];

    for (let a of priority) {
      let act = CreepActions[a];
      if (act.assign(creep)) {
        return act;
      }
    }

    return super.nextAction(creep);
  }

  cleanup(creep: Creep) {
    delete Memory.sources[creep.memory.target].dedicatedMiner;
  }
}

CreepRoles['miner'] = new CreepRoleMiner();