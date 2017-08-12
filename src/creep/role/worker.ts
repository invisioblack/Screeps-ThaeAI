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
        'pickup',
        'mine',
        'idle'
      ];
    } else {
      //if we have energy and are behold upgrade threshold
      if (CONTROLLER_DOWNGRADE[creep.room.controller.level] / creep.room.controller.ticksToDowngrade < EMERGENCEY_UPGRADE_THRESHOLD) {
        priority = [
          'upgrade',
          'pickup',
          'mine',
          'idle'
        ]
      } else {
        if (!_.isUndefined(creep.room.storage) && ((_.sum(creep.room.storage.store) / STORAGE_CAPACITY) > WORKERS_DONT_FILL)) {
          priority = [
            'build',
            'upgrade',
            //'repair',
            'fill',
            'idle'
          ];
        } else {
          priority = [
            'fill',
            'build',
            //'repair',
            'upgrade',
            'idle'
          ];
        }
      }
    }

    for (let a of priority) {
      let act = CreepActions[a];

      if (act.assign(creep)) {
        log.debug("Assigned action '" + act.name + "' to " + creep.name);
        return act;
      }

    }

    //none of the listed actions are valid...
    return super.nextAction(creep);
  }
}

CreepRoles['worker'] = new CreepRoleWorker();