'use strict';

class CreepSetup {
  //_role
  private _role : string;
  get role(): string {
    return this._role;
  }

  //_minRCL
  private _minRCL : number;
  get minRCL(): number {
    return this._minRCL;
  }
  set minRCL(value: number) {
    this._minRCL = value;
  }

  //_noSetup
  private _noSetup : any;
  get noSetup(): any {
    return this._noSetup;
  }

  //_RCL
  private _RCL : any;
  get RCL(): any {
    return this._RCL;
  }
  set RCL(value: any) {
    this._RCL = value;
  }

  constructor(role) {
    this._role = role;
    this._minRCL = 0;

    this._noSetup = {
      maxSpawned: 0,
      baseBody: [],
      multiBody: [],
      maxMulti: 0,
      minEnergy: 0,
      weight: 0
    };

    this._RCL = {
      1: this._noSetup,
      2: this._noSetup,
      3: this._noSetup,
      4: this._noSetup,
      5: this._noSetup,
      6: this._noSetup,
      7: this._noSetup,
      8: this._noSetup
    };
  }
}