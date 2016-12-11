'use strict';

global.CreepSetupMiner = class extends CreepSetupBase {
  constructor() {
    super('miner');
    this.RCL = {
      1: this.noSetup,
      2: this.noSetup,
      3: {
        maxSpawned: (room) => _.size(room.memory.sources),
        baseBody: [WORK, WORK, WORK, WORK, MOVE],
        multiBody: [WORK, MOVE],
        maxMulti: 1,
        minEnergy: 250,
        weight: 500
      },
      4: {
        maxSpawned: (room) => _.size(room.memory.sources),
        baseBody: [WORK, WORK, WORK, WORK, MOVE],
        multiBody: [WORK, MOVE],
        maxMulti: 1,
        minEnergy: 250,
        weight: 500
      },
      5: {
        maxSpawned: (room) => _.size(room.memory.sources),
        baseBody: [WORK, WORK, WORK, WORK, MOVE],
        multiBody: [WORK, MOVE],
        maxMulti: 1,
        minEnergy: 250,
        weight: 500
      },
      6: {
        maxSpawned: (room) => _.size(room.memory.sources),
        baseBody: [WORK, WORK, WORK, WORK, MOVE],
        multiBody: [WORK, MOVE],
        maxMulti: 1,
        minEnergy: 250,
        weight: 500
      },
      7: {
        maxSpawned: (room) => _.size(room.memory.sources),
        baseBody: [WORK, WORK, WORK, WORK, MOVE],
        multiBody: [WORK, MOVE],
        maxMulti: 1,
        minEnergy: 250,
        weight: 500
      },
      8: {
        maxSpawned: (room) => _.size(room.memory.sources),
        baseBody: [WORK, WORK, WORK, WORK, MOVE],
        multiBody: [WORK, MOVE],
        maxMulti: 1,
        minEnergy: 250,
        weight: 500
      }
    };

    this.minRCL = 3;
  }
};
