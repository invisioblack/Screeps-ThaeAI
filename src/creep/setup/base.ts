'use strict';

export class CreepSetup {

  role: string;
  minRCL: number;
  noSetup: CreepRCLSetup;
  RCL: { [key: number] : CreepRCLSetup };

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

  getMaxSpawnable(room: Room) : number {
    return CreepSetup.objOrFunc(this.RCL[room.controller.level].maxSpawned, room);
  }

  getMaxMulti(room: Room) : number {
    return CreepSetup.objOrFunc(this.RCL[room.controller.level].maxMulti, room);
  }

  protected static objOrFunc(obj: number | ((room: Room) => number), room?: Room): number {
    if (obj == null)
      return -1;
    if (typeof obj === 'function')
      return obj(room);
    else
      return obj;
  }

  static getBalancedBody(energy: number): string[] {
    const numberOfParts = Math.floor(energy / 200);
    let body = [];
    for (let i = 0; i < numberOfParts; i++) {
      body.push(WORK);
      body.push(CARRY);
      body.push(MOVE);
    }
    return body;
  }

  static getBodyCost(body: string[]): number {
    let total = 0;
    for (let s of body)
      total += BODYPART_COST[s];
    return total;
  }

  static sortBody(body: string[]): string[] {
    return _.sortBy(body, p => _.indexOf([TOUGH,MOVE,WORK,CARRY,ATTACK,RANGED_ATTACK,HEAL,CLAIM],p))
  }
}