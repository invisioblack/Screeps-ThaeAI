'use strict';

import {CreepRole} from './base';

export class CreepRoleCarrier extends CreepRole {

  constructor() {
    super('carrier');
  }

  nextAction(creep: Creep): CreepAction {
    let priority = [
      'fill',
      'pickup',
      'fillStorage',
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


CreepRoles['carrier'] = new CreepRoleCarrier();