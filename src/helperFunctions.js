'use strict';

class HelperFunctions {

  static objOrFunc(obj, param) {
    if (obj == null)
      return null;
    if (typeof obj === 'function')
      return obj(param);
    else
      return obj;
  }

  static massSuicide() {
    for (let creep in Game.creeps) {
      Game.creeps[creep].suicide();
    }
  }

  // create a balanced body as big as possible with the given energy
  static getBalancedBody(energy){
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

global.HelperFunctions = HelperFunctions;