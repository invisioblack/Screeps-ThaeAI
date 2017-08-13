'use strict';

export class RoomManager {

  static processRooms(): void {
    //singing!
    for (let r in Memory.rooms) {
      const rm = Game.rooms[r];
      if (ROOM_SINGING)
        rm.sing("1|2|3");

      let os : Creep[] = rm.find<Creep>(FIND_MY_CREEPS);
      let i = 0.5;
      for (let s in os) {
        let ss : Creep = os[s];
        new RoomVisual(r).text(ss.name + " TTL: " + ss.ticksToLive, 0, i, {font: 0.5, opacity: 0.7, align: 'left'});
        i+=0.5;
      }

      const towers = rm.find<StructureTower>(FIND_MY_STRUCTURES, {filter: function(t: Structure) { return t.structureType == STRUCTURE_TOWER;}});
      for (let t in towers) {
        let places = rm.find<Structure>(FIND_STRUCTURES, { filter : function (o: Structure) { return o.structureType != STRUCTURE_WALL && o.structureType != STRUCTURE_RAMPART}});

        //TODO pick closest site
        if (places.length > 0)
          for (let p in places) {
            if (places[p].hits < places[p].hitsMax) {
              log.debug("Tower: " + towers[t].id + " is repairing a " + places[p].structureType + ": " + places[p].id);
              towers[t].repair(places[p]);
            }
          }
      }
    }
  }
}