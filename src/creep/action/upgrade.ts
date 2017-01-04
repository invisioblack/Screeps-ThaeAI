'use strict';

import {CreepAction} from './base';

export class CreepActionUpgrade extends CreepAction {

  constructor() {
    super('upgrade');
    this.range = 3;
  }

  assign(creep: Creep, target?: string) : boolean {
    let ret = false;
    if (this.isValidAction(creep)) {
      creep.memory.action = this.name;
      creep.memory.target = creep.room.controller.id;
      ret = true;
    } else {
      ret = false;
    }
    return ret;
  }

  /**
   * Does the creep have energy and do i control the controller in this room
   * @param creep
   * @returns {boolean}
   */
  isValidAction(creep: Creep): boolean {
    return creep.carry.energy > 0 && creep.room.controller.my;
  }

  /**
   * Should not be called but just in case?
   * @param creep
   * @param target
   * @returns {boolean}
   */
  isValidTarget(creep: Creep, target: string): boolean {
    return target == creep.room.controller.id;
  }

  /**
   * Also should not be called
   * @param creep
   * @returns {string}
   */
  newTarget(creep: Creep): string {
    return creep.room.controller.id;
  }

  /**
   * Save a goid call, just reference the rooms controller
   * @param creep
   * @returns {number}
   */
  work(creep: Creep): number {
    return creep.upgradeController(creep.room.controller);
  }
}

CreepActions['upgrade'] = new CreepActionUpgrade();