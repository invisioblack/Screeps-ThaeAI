'use strict';

import {CreepRole} from './base';

/**
 * CreepRoleWorker
 *  Generic role that is spawned early to handle all of the basic tasks.
 *  Mines, builds, repairs, upgrades, refills
 */
export class CreepRoleWorker extends CreepRole {

  /**
   * Constructor, calls super with name
   */
  constructor() {
    super('worker');
  }

  /**
   * Sets the next action
   *  Either mines, or places stored energy somewhere or uses it
   * @param creep Creep to perform role
   */
  nextAction(creep: Creep): CreepAction {
    let priority;

    if (creep.carry.energy == 0) {
      priority = [
        'mine',
        'idle'
      ];
    } else {
      priority = [
        'refill',
        'build',
        'repair',
        'upgrade',
        'idle'
      ];
    }

    for (let a of priority) {
      let act = CreepActions[a];
      if (act.isValidAction(creep) && act.assign(creep))
        return act;
    }

    return super.nextAction(creep);
  }
}

CreepRoles['worker'] = new CreepRoleWorker();