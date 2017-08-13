'use strict';

export abstract class CreepAction {
  name: string;
  range: number;

  constructor (name: string) {
    this.name = name;
    this.range = 0;
  }

  assign(creep: Creep) : boolean {
    let ret = false;
    if (this.isValidAction(creep)) {
      let target = this.newTarget(creep);
      if (target != '') {
        creep.memory.action = this.name;
        creep.memory.target = target;
        ret = true;
      }
    } else {
      ret = false;
    }
    return ret;
  }

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
      creep.moveTo(target.pos, {visualizePathStyle : {}});

  }

  abstract isValidAction(creep: Creep): boolean;
  abstract newTarget(creep: Creep): string;
  abstract work(creep: Creep): number;

}