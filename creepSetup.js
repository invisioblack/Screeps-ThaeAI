"use strict";

global.CreepSetup = {};

let noSetup = {
  maxSpawned  : 0,
  baseBody    : [],
  multiBody   : [],
  maxMulti    : 0,
  minEnergy   : 0,
  weight      : 0
};


CreepSetup.roles = {
  miner : {
    minRCL : 3,
    RCL : {
      1 : noSetup,
      2 : noSetup,
      3 : {
        maxSpawned  : (room) => _.size(room.memory.sources),
        baseBody    : [WORK, WORK, WORK, WORK, MOVE],
        multiBody   : [WORK, MOVE],
        maxMulti    : 1,
        minEnergy   : 250,
        weight      : 500
      },
      4 : {
        maxSpawned  : (room) => _.size(room.memory.sources),
        baseBody    : [WORK, WORK, WORK, WORK, MOVE],
        multiBody   : [WORK, MOVE],
        maxMulti    : 1,
        minEnergy   : 250,
        weight      : 500
      },
      5 : {
        maxSpawned  : (room) => _.size(room.memory.sources),
        baseBody    : [WORK, WORK, WORK, WORK, MOVE],
        multiBody   : [WORK, MOVE],
        maxMulti    : 1,
        minEnergy   : 250,
        weight      : 500
      },
      6 : {
        maxSpawned  : (room) => _.size(room.memory.sources),
        baseBody    : [WORK, WORK, WORK, WORK, MOVE],
        multiBody   : [WORK, MOVE],
        maxMulti    : 1,
        minEnergy   : 250,
        weight      : 500
      },
      7 : {
        maxSpawned  : (room) => _.size(room.memory.sources),
        baseBody    : [WORK, WORK, WORK, WORK, MOVE],
        multiBody   : [WORK, MOVE],
        maxMulti    : 1,
        minEnergy   : 250,
        weight      : 500
      },
      8 : {
        maxSpawned  : (room) => _.size(room.memory.sources),
        baseBody    : [WORK, WORK, WORK, WORK, MOVE],
        multiBody   : [WORK, MOVE],
        maxMulti    : 1,
        minEnergy   : 250,
        weight      : 500
      }
    }
  },

  worker : {
    minRCL : 1,
    RCL : {
      1 : {
        maxSpawned  : 6,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 0,
        minEnergy   : 200,
        weight      : 500
      },
      2 : {
        maxSpawned  : 8,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 1,
        minEnergy   : 200,
        weight      : 500
      },
      3 : {
        maxSpawned  : 2,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 2,
        minEnergy   : 200,
        weight      : 500
      },
      4 : {
        maxSpawned  : 2,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 9,
        minEnergy   : 200,
        weight      : 999
      },
      5 : {
        maxSpawned  : 1,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 9,
        minEnergy   : 200,
        weight      : 999
      },
      6 : {
        maxSpawned  : 1,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 9,
        minEnergy   : 200,
        weight      : 999
      },
      7 : {
        maxSpawned  : 1,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 9,
        minEnergy   : 200,
        weight      : 999
      },
      8 : {
        maxSpawned  : 1,
        baseBody    : [WORK, CARRY, MOVE],
        multiBody   : [WORK, CARRY, MOVE],
        maxMulti    : 9,
        minEnergy   : 200,
        weight      : 999
      },
    }
  },

  carrier : {
    minRCL : 3,
    RCL : {
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
    }
  }
};
