'use strict';

import {CreepRole} from './base';

export class CreepRoleWorker extends CreepRole {

  constructor() {
    super('worker');
  }

  nextAction(creep: Creep): CreepAction {
    let priority;

    if (creep.carry.energy == 0) {
      priority = [
        'withdraw',
        'withdrawStorage',
        'pickup',
        'mine',
        'idle'
      ];
    } else {
      //if we have energy and are behold upgrade threshold
      if (creep.room.controller.ticksToDowngrade / CONTROLLER_DOWNGRADE[creep.room.controller.level] < EMERGENCEY_UPGRADE_THRESHOLD) {
        priority = [
          'upgrade',
          'withdraw',
          'withdrawStorage',
          'pickup',
          'mine',
          'idle'
        ]
      } else {
        priority = [
          'fill',
          'build',
          'repair',
          //'fillStorage',
          'upgrade',
          'idle'
        ];
      }
    }

    for (let a of priority) {
      let act = CreepActions[a];

      if (act.assign(creep)) {
        log.debug("Assigned action '" + act.name + "' to " + creep.name);
        return act;
      }
    }

    return super.nextAction(creep);
  }
}

CreepRoles['worker'] = new CreepRoleWorker();