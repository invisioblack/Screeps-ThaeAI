'use strict';
import {CreepSetup} from './base';

let setup = new CreepSetup('worker');

setup.minRCL = 1;
setup.RCL = {
  1: {
    maxSpawned: 6,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 500
  },
  2: {
    maxSpawned: 8,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 1,
    minEnergy: 200,
    weight: 500
  },
  3: {
    maxSpawned: 2,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 2,
    minEnergy: 200,
    weight: 500
  },
  4: {
    maxSpawned: 2,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 9,
    minEnergy: 200,
    weight: 999
  },
  5: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 9,
    minEnergy: 200,
    weight: 999
  },
  6: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 9,
    minEnergy: 200,
    weight: 999
  },
  7: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 9,
    minEnergy: 200,
    weight: 999
  },
  8: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 9,
    minEnergy: 200,
    weight: 999
  }
};

CreepSetup['worker'] = setup;