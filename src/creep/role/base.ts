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
    let target = creep.memory.target;
    let action : CreepAction = creep.memory.action;
    if (!action || !action.isValidAction(creep) || action.name == 'idle') {
      //invalid/no action, get a new action
      this.nextAction(creep);
      action = creep.memory.action;
    }

    if (target && action) {
      action.step(creep);
    } else {
      log.err('Creep without an action or target: ' + creep.name + ' : ' + ex(creep.memory));
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