'use strict';

import {CreepManager} from "./CreepManager"

export class RoomManager {

  static processRooms(): void {
    //singing!
    for (let r in Memory.rooms) {
      const room = Game.rooms[r];
      if (ROOM_SINGING)
        room.sing("This|is|the|song|that|never|ends|It|goes|on|and|on|my|friends|A|few|creeps|started|singing|it|not|knowing|what|it|was|They're|singing|forever|and|ever|for|the|reason|just|because");

      let os : Creep[] = room.find<Creep>(FIND_MY_CREEPS);
      let i = 0.5;
      for (let s in os) {
        let ss : Creep = os[s];
        new RoomVisual(r).text(ss.name + " TTL: " + ss.ticksToLive, 0, i, {font: 0.5, opacity: 0.7, align: 'left'});
        i+=0.5;
      }

      if (os.length < 1)
        CreepManager.emergencySpawn(room);


      RoomManager.processTowers(room);
    }
  }

  private static processTowers(room: Room): void {
    const towers = room.find<StructureTower>(FIND_MY_STRUCTURES, {filter: function(t: Structure) { return t.structureType == STRUCTURE_TOWER;}});
    for (let t in towers) {

      let hostiles = room.find<Creep>(FIND_HOSTILE_CREEPS);
      if (hostiles.length > 0) {
        for (let h in hostiles) {
          if (towers[t].attack(hostiles[h]) == OK)
            log.debug("Tower: " + towers[t].id + " is attacking " + hostiles[h].name);
          else
            log.debug("Tower: " + towers[t].id + " is out of energy");
        }
      }

      let places = room.find<Structure>(FIND_STRUCTURES, { filter : function (o: Structure) { return o.structureType != STRUCTURE_WALL && o.structureType != STRUCTURE_RAMPART}});

      //TODO pick closest site
      if (places.length > 0) {
        for (let p in places) {
          if (places[p].hits < places[p].hitsMax) {
            if (towers[t].repair(places[p]) == OK)
              log.debug("Tower: " + towers[t].id + " is repairing a " + places[p].structureType + ": " + places[p].id);
            else
              log.debug("Tower: " + towers[t].id + " is out of energy");
            break;
          }
        }
      }
    }

  }
}