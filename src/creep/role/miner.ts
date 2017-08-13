'use strict';

import {CreepRole} from './base';

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
}

CreepRoles['miner'] = new CreepRoleMiner();