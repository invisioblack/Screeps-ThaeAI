'use strict';

/**
 * HelperFunctions
 *  A static object containing a series of useful functions
 */
export class HelperFunctions {
  /**
   * Kills every creep you own
   */
  static massSuicide() {
    for (let creep in Game.creeps) {
      Game.creeps[creep].suicide();
    }
  }
}