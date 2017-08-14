'use strict';

Object.defineProperty(RoomPosition.prototype, "isOccupied", {
  enumerable: true,
  get: function(): boolean {
    return(Game.rooms[this.roomName].lookForAt(LOOK_CREEPS,this.x,this.y).length > 0);
  }
});

// Special thanks to @helam for finding the client selection code
RoomPosition.prototype.toString = function (htmlLink = true, id = undefined, memWatch = undefined): string {
  if(htmlLink){
    let onClick = '';

    if(id)
      onClick += `angular.element('body').injector().get('RoomViewPendingSelector').set('${id}');`;
    if(memWatch)
      onClick += `angular.element($('section.memory')).scope().Memory.addWatch('${memWatch}');angular.element($('section.memory')).scope().Memory.selectedObjectWatch='${memWatch}';`;

    return `<a href="#!/room/${this.roomName}" onClick="${onClick}">[${ this.roomName } ${ this.x },${ this.y }]</a>`;
  }
  return `[${ this.roomName } ${ this.x },${ this.y }]`;
};
