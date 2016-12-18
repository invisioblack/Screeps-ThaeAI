'use strict';

global.CreepSetupBase = class {
  constructor(role) {
    this.role = role;
    this.minRCL = 0;

    this.noSetup = {
      maxSpawned: 0,
      baseBody: [],
      multiBody: [],
      maxMulti: 0,
      minEnergy: 0,
      weight: 0
    };

    this.RCL = {
      1: this.noSetup,
      2: this.noSetup,
      3: this.noSetup,
      4: this.noSetup,
      5: this.noSetup,
      6: this.noSetup,
      7: this.noSetup,
      8: this.noSetup
    };
  }
};

global.CreepSetup = { };
