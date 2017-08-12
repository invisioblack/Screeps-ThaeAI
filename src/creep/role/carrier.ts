'use strict';

import {CreepRole} from './base';

/**
 * Takes the stuff from one place to another IE moving energy from a miner to spawn
 */
export class CreepRoleCarrier extends CreepRole {

  constructor() {
    super('carrier');
  }

  /**
   * Sets the next action
   * @param creep Creep to perform role
   */
  nextAction(creep: Creep): CreepAction {
    let priority = [
      'pickup',
      'fill',
      'fillStorage',
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


CreepRoles['carrier'] = new CreepRoleCarrier();