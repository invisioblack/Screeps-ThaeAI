'use strict';

export class RoleWorker implements CreepRole {
  //main action function of the role
  act(): void {

  }

  //decide next action
  nextAction(): void {

  }

}

CreepRoles['worker'] = new RoleWorker();