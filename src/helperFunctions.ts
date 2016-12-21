'use strict';

export class HelperFunctions {
  //used for creep setup which passes a number or a function and room, will always return a number
  static objOrFunc(obj: number | ((room: Room)=>number), room: Room): number {
    if (obj == null)
      return -1;
    if (typeof obj === 'function')
      return obj(room);
    else
      return obj;
  }

  static massSuicide() {
    for (let creep in Game.creeps) {
      Game.creeps[creep].suicide();
    }
  }

  // create a balanced body as big as possible with the given energy
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
}