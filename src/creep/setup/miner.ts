'use strict';
import {CreepSetup} from './base';

let setup = new CreepSetup('miner');

setup.minRCL = 3;
setup.RCL[3] = {
  maxSpawned: (room: Room) => _.size(room.memory.sources),
  baseBody: [WORK, WORK, WORK, WORK, MOVE],
  multiBody: [WORK, MOVE],
  maxMulti: 1,
  minEnergy: 250,
  weight: 500
};
setup.RCL[4] = {
  maxSpawned: (room: Room) => _.size(room.memory.sources),
  baseBody: [WORK, WORK, WORK, WORK, MOVE],
  multiBody: [WORK, MOVE],
  maxMulti: 1,
  minEnergy: 250,
  weight: 500
};
setup.RCL[5] = {
  maxSpawned: (room: Room) => _.size(room.memory.sources),
  baseBody: [WORK, WORK, WORK, WORK, MOVE],
  multiBody: [WORK, MOVE],
  maxMulti: 1,
  minEnergy: 250,
  weight: 500
};
setup.RCL[6] = {
  maxSpawned: (room: Room) => _.size(room.memory.sources),
  baseBody: [WORK, WORK, WORK, WORK, MOVE],
  multiBody: [WORK, MOVE],
  maxMulti: 1,
  minEnergy: 250,
  weight: 500
};
setup.RCL[7] = {
  maxSpawned: (room: Room) => _.size(room.memory.sources),
  baseBody: [WORK, WORK, WORK, WORK, MOVE],
  multiBody: [WORK, MOVE],
  maxMulti: 1,
  minEnergy: 250,
  weight: 500
};
setup.RCL[8] = {
  maxSpawned: (room: Room) => _.size(room.memory.sources),
  baseBody: [WORK, WORK, WORK, WORK, MOVE],
  multiBody: [WORK, MOVE],
  maxMulti: 1,
  minEnergy: 250,
  weight: 500
};

CreepSetups['miner'] = setup;