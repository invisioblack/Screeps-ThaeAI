'use strict';

import {CreepRole} from './base';

/**
 * The miner will go to a spot and sit there, and mine continuously
 * TODO support for links and containers
 */
export class CreepRoleMiner extends CreepRole {

  constructor() {
    super('miner');
  }

  /**
   * Sets the next action
   * @param creep Creep to perform role
   */
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

    //none of the listed actions are valid...
    return super.nextAction(creep);
  }
}

CreepRoles['miner'] = new CreepRoleMiner();