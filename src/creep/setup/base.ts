'use strict';

/**
 * CreepSetup
 *  Contains all of the information to create a creep
 */
export class CreepSetup {
  /**
   * Role is the string name of the creeps role in life. Matches between Role and Setup
   */
  role: string;
  /**
   * Minimum RCL to spawn this creep
   */
  minRCL: number;
  /**
   * Base, blank CreepRCLSetup with no information
   */
  noSetup: CreepRCLSetup;
  /**
   * A collection of CreepRCLSetup for each RCL from 1-8
   */
  RCL: { [key: number] : CreepRCLSetup };

  /**
   * Constructor only requiring the desired Role/Setup name
   * @param role name of the Setup
   */
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

  getMaxSpawnable(rcl: number, room: Room) : number {
    return CreepSetup.objOrFunc(this.RCL[rcl].maxSpawned, room)
  }

  /**
   * Used in the CreepSetup objects to determine various number values based on provided room conditions
   * @param obj Either a number or a function that will return a number
   * @param room Optional: room in which to use in determining the number to return
   * @returns {any}
   */
  static objOrFunc(obj: number | ((room: Room)=>number), room?: Room): number {
    if (obj == null)
      return -1;
    if (typeof obj === 'function')
      return obj(room);
    else
      return obj;
  }

  /**
   * Creates a balanced body array
   * @param energy max energy to use
   * @returns {Array} body string[] for a creep
   */
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

  /**
   * Returns the total cost of a body[] for a creep
   * @param body body[] to compute a cost for
   * @returns {number} total cost of body
   */
  static getBodyCost(body: string[]): number {
    let total = 0;
    for (let s of body)
      total += BODYPART_COST[s];
    return total;
  }
}