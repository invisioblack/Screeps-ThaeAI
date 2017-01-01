'use strict';

/**
 * CreepRole
 *  Base role from which other roles are extended
 *  nextAction(creep: Creep) is required to be overridden
 */
export class CreepRole  {
  /**
   * String name of the role
   */
  name: string;

  /**
   * Constructor
   * @param name name of the role
   */
  constructor(name: string) {
    this.name = name;
  }

  /**
   * Main function for the role. Will attempt to run the set action.
   * If unable will request the next action
   * @param creep Creep performing this role
   */
  act(creep: Creep): void {
    let action = CreepActions[creep.memory.action];
    //Had no valid action
    if (!action) {
      action = this.nextAction(creep);
    }
    //idle or invalid action, get a new one
    if (action && (!action.isValidAction(creep) || action.name == 'idle'))
      action = this.nextAction(creep);

    log.log('act() ' + ex(action));;;;;;;;;;;;;;;;;;
    if (action) {
      action.step(creep);
    } else {
      log.err('Creep without an action: ' + creep.name + ' : ' + ex(creep.memory));
    }
  }

  /**
   * Assigns a new action to the creep.
   *  If this is called, the overriding class failed. Assigns idle action
   * @param creep Creep performing this role
   */
  nextAction(creep: Creep): CreepAction {
    log.err('Fall through to CreepRole.nextAction() on: ' + creep.name + ' : ' + ex(creep.memory));
    let act = CreepActions['idle'];
    act.assign(creep);
    return act;
  }
}