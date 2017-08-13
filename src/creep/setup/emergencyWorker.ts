'use strict';
import {CreepSetup} from './base';

let setup: CreepSetup = new CreepSetup('worker');

setup.minRCL = 1;
setup.RCL = {
  1: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  },
  2: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  },
  3: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  },
  4: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  },
  5: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  },
  6: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  },
  7: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  },
  8: {
    maxSpawned: 1,
    baseBody: [WORK, CARRY, MOVE],
    multiBody: [WORK, CARRY, MOVE],
    maxMulti: 0,
    minEnergy: 200,
    weight: 1
  }
};

CreepSetups['emergencyWorker'] = setup;