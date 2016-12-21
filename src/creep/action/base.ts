'use strict';

/**
 * CreepAction
 *  Base Action class
 */
export abstract class CreepAction {
  /**
   * String name of the action
   */
  name: string;
  /**
   * String ID of the target object
   */
  target: string;
  /**
   * Maximum range at which action can occur
   */
  range: number;

  /**
   * Constructor
   * @param name string name of action
   */
  constructor (name: string) {
    this.name = name;
    this.target = null;
    this.range = 0;
  }

  /**
   * Assigns the action to the creep
   * @param creep target creep
   * @param target target id string
   * @return {boolean} whether or not assignment succeeded
   */
  abstract assign(creep: Creep, target?: string) : boolean;

  /**
   * Checks whether or not the creep is allowed to do this action
   * @param creep target creep
   * @return {boolean} whether or action is allowed
   */
  abstract isValidAction(creep: Creep): boolean;

  /**
   * Checks whether or not the supplied target is valid for this action and creep
   * @param creep target creep
   * @param target target object
   * @return {boolean} whether or not target is allowed
   */
  abstract isValidTarget(creep: Creep, target: string): boolean;

  /**
   * Performs the next step required for this action, be it drive or work
   * If work fails, get a new action
   * @param creep target creep
   */
  step(creep: Creep): void {
    let target = Game.getObjectById<RoomObject>(creep.memory.target);
    let rangeTo = target ? creep.pos.getRangeTo(target.pos) : 0;
    if (this.range >= rangeTo) { //rangeTo is inside of maxRange
      //work returned an error code, means we cant do it for some reason, get a new action next tick
      if (this.work(creep) != OK) {
        delete creep.memory.action;
        delete creep.memory.target;
      }
    }

    //TODO pathfinding!
    //only move if there is a target and its range is > 1
    if (target && rangeTo > 1)
      creep.moveTo(target.pos);

  }

  /**
   * Performs the work action of this creep
   * @param creep
   * @return {number} ERR_* code of work status
   */
  abstract work(creep: Creep): number;
}