'use strict';

import {CreepRole} from './base';

export class CreepRoleMiner extends CreepRole {

  constructor() {
    super('miner');
  }

}

CreepRoles['miner'] = new CreepRoleMiner();