'use strict';

import {CreepRole} from './base';

export class CreepRoleCarrier extends CreepRole {

  constructor() {
    super('carrier');
  }

}

CreepRoles['carrier'] = new CreepRoleCarrier();