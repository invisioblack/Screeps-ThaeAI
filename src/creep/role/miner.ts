'use strict';

import {CreepRole} from './base';

export class CreepRoleMiner extends CreepRole {

  constructor() {
    super('miner');
  }

  act(creep: Creep): void {
    //we dont have a target, must be a new miner
    if (creep.memory.target == '')
      CreepRoleMiner.newMiner(creep);

    if (CREEP_SINGING)
      creep.sing(creep.memory.singing);

    const target = Game.getObjectById<Source>(creep.memory.target);
    const rangeTo = target ? creep.pos.getRangeTo(target.pos) : 99;

    if (ACTION_RANGES.MINE >= rangeTo) {
      if (creep.harvest(Game.getObjectById<Source>(creep.memory.target)) != OK) {
        log.debug('Miner: ' + creep.name + ' cannot mine for some reason');
      }
    }

    if (target && rangeTo > ACTION_RANGES.MINE)
      creep.moveTo(target.pos, {visualizePathStyle : {}});

    if (creep.ticksToLive <= 1)
      this.cleanup(creep);
  }

  cleanup(creep: Creep) {
    super.cleanup(creep);
    delete Memory.sources[creep.memory.target].dedicatedMiner;
  }

  static newMiner(creep: Creep): void {
    let target = '';
    for (let s of creep.room.memory.sources) {
      let src = Game.getObjectById<Source>(s);
      if ((_.isUndefined(src.dedicatedMiner)) || (src.dedicatedMiner && src.dedicatedMiner == creep.name)) {
        target = s;
        break;
      }
    }

    //we somehow have more miners than sources or the sources arent clearing theyre memory
    if (target != '') {
      creep.memory.action = 'minerMine';
      creep.memory.target = target;
      Memory.sources[creep.memory.target].dedicatedMiner = creep.name;
    } else {
      log.warn('Miner cannot acquire a source! {' + creep.name + '} Sources: ' + creep.room.memory.sources.length + ' Miners: ' + creep.room.find(FIND_MY_CREEPS, {filter: (c: Creep) => c.memory.role == 'miner'}).length);
      //recycle yourself...
      creep.pos.findClosestByRange<StructureSpawn>(FIND_MY_SPAWNS).recycleCreep(creep);
    }

  }
}

CreepRoles['miner'] = new CreepRoleMiner();