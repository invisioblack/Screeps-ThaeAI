'use strict';

export class CreepSetup {
  role: string;
  minRCL: number;
  noSetup: CreepRCLSetup;
  RCL: CreepRCLSetup[];

  constructor(role: string) {
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

    this.RCL = [
      this.noSetup,
      this.noSetup,
      this.noSetup,
      this.noSetup,
      this.noSetup,
      this.noSetup,
      this.noSetup,
      this.noSetup,
      this.noSetup
    ];
  }
}