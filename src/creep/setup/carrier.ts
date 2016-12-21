'use strict';
import {CreepSetup} from './base';

let setup: CreepSetup = new CreepSetup("carrier");

setup.minRCL = 3;
setup.RCL = {
  3 : {
    maxSpawned  : (room: Room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 10,
    minEnergy   : 150,
    weight      : 200
  },
  4 : {
    maxSpawned  : (room: Room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 20,
    minEnergy   : 150,
    weight      : 200
  },
  5 : {
    maxSpawned  : (room: Room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 30,
    minEnergy   : 150,
    weight      : 200
  },
  6 : {
    maxSpawned  : (room: Room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 60,
    minEnergy   : 150,
    weight      : 200
  },
  7 : {
    maxSpawned  : (room: Room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 60,
    minEnergy   : 150,
    weight      : 200
  },
  8 : {
    maxSpawned  : (room: Room) => Math.floor(_.size(room.memory.sources) / 2),
    baseBody    : [CARRY, CARRY, MOVE],
    multiBody   : [CARRY, CARRY, MOVE],
    maxMulti    : 60,
    minEnergy   : 150,
    weight      : 200
  }
};

CreepSetups['carrier'] = setup;