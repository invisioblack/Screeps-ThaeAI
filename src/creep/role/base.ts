'use strict';


export class CreepRole  {

  name: string;

  constructor(name: string) {
    this.name = name;
  }

  act(creep: Creep): void {
    let action = CreepActions[creep.memory.action];
    //Had no valid action
    if (!action) {
      action = this.nextAction(creep);
    }
    //idle or invalid action, get a new one
    if (action && (!action.isValidAction(creep) || action.name == 'idle'))
      action = this.nextAction(creep);

    if (action) {
      action.step(creep);
      if (CREEP_SINGING)
        creep.sing(creep.memory.singing);
    } else {
      log.err('Creep without an action: ' + creep.name + ' : ' + ex(creep.memory));
    }
  }

  nextAction(creep: Creep): CreepAction {
    log.err('Fall through to CreepRole.nextAction() on: ' + creep.name + ' : ' + ex(creep.memory));
    let act = CreepActions['idle'];
    act.assign(creep);
    return act;
  }
}