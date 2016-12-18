'use strict';

let setup = new CreepSetupBase('carrier');

setup.minRCL = 3;
setup.RCL = {
  1 : noSetup,
  2 : noSetup,
  3 : {
    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 10,
    minEnergy   : 150,
    weight      : 200
  },
  4 : {
    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 20,
    minEnergy   : 150,
    weight      : 200
  },
  5 : {
    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 30,
    minEnergy   : 150,
    weight      : 200
  },
  6 : {
    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 60,
    minEnergy   : 150,
    weight      : 200
  },
  7 : {
    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 60,
    minEnergy   : 150,
    weight      : 200
  },
  8 : {
    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 60,
    minEnergy   : 150,
    weight      : 200
  }
};

CreepSetup['carrier'] = setup;