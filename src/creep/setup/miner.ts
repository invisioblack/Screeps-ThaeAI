'use strict';
import {CreepSetup} from './base';

let setup: CreepSetup = new CreepSetup('miner');

setup.minRCL = 3;
setup.RCL = {
  3: {
    maxSpawned: (room: Room) => _.size(room.memory.sources),
    baseBody: [WORK, WORK, WORK, WORK, MOVE, CARRY],
    multiBody: [WORK, MOVE],
    maxMulti: 1,
    minEnergy: 500,
    weight: 500
  },
  4: {
    maxSpawned: (room: Room) => _.size(room.memory.sources),
    baseBody: [WORK, WORK, WORK, WORK, MOVE, CARRY],
    multiBody: [WORK, MOVE],
    maxMulti: 1,
    minEnergy: 500,
    weight: 500
  },
  5: {
    maxSpawned: (room: Room) => _.size(room.memory.sources),
    baseBody: [WORK, WORK, WORK, WORK, MOVE, CARRY],
    multiBody: [WORK, MOVE],
    maxMulti: 1,
    minEnergy: 500,
    weight: 500
  },
  6: {
    maxSpawned: (room: Room) => _.size(room.memory.sources),
    baseBody: [WORK, WORK, WORK, WORK, MOVE, CARRY],
    multiBody: [WORK, MOVE],
    maxMulti: 1,
    minEnergy: 500,
    weight: 500
  },
  7: {
    maxSpawned: (room: Room) => _.size(room.memory.sources),
    baseBody: [WORK, WORK, WORK, WORK, MOVE, CARRY],
    multiBody: [WORK, MOVE],
    maxMulti: 1,
    minEnergy: 500,
    weight: 500
  },
  8: {
    maxSpawned: (room: Room) => _.size(room.memory.sources),
    baseBody: [WORK, WORK, WORK, WORK, MOVE, CARRY],
    multiBody: [WORK, MOVE],
    maxMulti: 1,
    minEnergy: 500,
    weight: 500
  }
};

CreepSetups['miner'] = setup;