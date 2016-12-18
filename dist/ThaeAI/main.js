module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(/*! ./requires */ 1);

	module.exports.loop = function () {
	  let gTick = Game.time;
	  log.log('***************NEW TICK***************' + gTick + '***************');

	  //cleans up memory
	  MemoryManager.garbageCollection();

	  //check and build Memory.room every 10 ticks
	  if ((gTick % 10) == 0)
	    MemoryManager.buildRoomMemory();

	  //TODO room manager?

	  //every 5th tick do pop check
	  if ((gTick % 5) == 0) {
	    for (let r in Memory.rooms) {
	      CreepFactory.populationCheck(Game.rooms[r]);
	    }
	  }

	  //process spawn queues
	  for (let r in Memory.rooms) {
	    CreepFactory.processSpawnQueue(Game.rooms[r]);
	  }

	  //processes every creep and does .act()
	  CreepFactory.doActions();

	};

/***/ },
/* 1 */
/*!*************************!*\
  !*** ./src/requires.js ***!
  \*************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(/*! ./helperFunctions */ 2);

	//roleClasses
	__webpack_require__(/*! ./CreepRole/creepRoleBase */ 3);
	__webpack_require__(/*! ./CreepRole/creepRoleCarrier */ 4);
	__webpack_require__(/*! ./CreepRole/creepRoleMiner */ 5);

	//setupClasses
	__webpack_require__(/*! ./CreepSetup/creepSetupBase */ 6);
	__webpack_require__(/*! ./CreepSetup/creepSetupCarrier */ 7);
	__webpack_require__(/*! ./CreepSetup/creepSetupMiner */ 8);
	__webpack_require__(/*! ./CreepSetup/creepSetupWorker */ 9);


	//require('populationManager');
	__webpack_require__(/*! ./memoryManager */ 10);
	__webpack_require__(/*! ./creepFactory */ 11);


	//define memory prototypes for structures and sources
	Object.defineProperty(Structure.prototype, "memory", {
	  get: function () {
	    if (!Memory.structures) {
	      Memory.structures = {};
	    }
	    if (!Memory.structures[this.id]) {
	      Memory.structures[this.id] = {};
	    }
	    return Memory.structures[this.id];
	  },
	  set: function (v) {
	    return _.set(Memory, `structures.${this.id}`, v);
	  },
	  configurable: true,
	  enumerable: false,
	});

	Object.defineProperty(Source.prototype, "memory", {
	  get: function () {
	    if (!Memory.sources) {
	      Memory.sources = {};
	    }
	    if (!Memory.sources[this.id]) {
	      Memory.sources[this.id] = {};
	    }
	    return Memory.sources[this.id];
	  },
	  set: function (v) {
	    return _.set(Memory, `sources.${this.id}`, v);
	  },
	  configurable: true,
	  enumerable: false,
	});


	//globals credit of semperrabbit and warinternal
	global.LOGGING_ENABLED = true;
	global.logging = function (bool) {
	  global.LOGGING_ENABLED = bool
	};
	global.log = {
	  log: function log(arg) {
	    if (global.LOGGING_ENABLED)return console.log(arg)
	  },
	  warn: function warn(arg) {
	    if (global.LOGGING_ENABLED)return console.log('<span style=color:#FFBF3F>' + arg + '</span>');
	  },
	  err: function err(arg) {
	    if (global.LOGGING_ENABLED)return console.log('<span style=color:#D18F98>' + arg + '</span>');
	  },
	  error: function error(arg) {
	    if (global.LOGGING_ENABLED)return console.log('<span style=color:#D18F98>' + arg + '</span>');
	  },
	};

	global.ex = (x) => JSON.stringify(x, null, 2);

	global.errName = function (err) {
	  switch (err) {
	    case ERR_NOT_OWNER:
	      return 'ERR_NOT_OWNER';
	    case ERR_NO_PATH:
	      return 'ERR_NO_PATH';
	    case ERR_NAME_EXISTS:
	      return 'ERR_NAME_EXISTS';
	    case ERR_BUSY:
	      return 'ERR_BUSY';
	    case ERR_NOT_FOUND:
	      return 'ERR_NOT_FOUND';
	    case ERR_NOT_ENOUGH_RESOURCES:
	      return 'ERR_NOT_ENOUGH_ENERGY/ERR_NOT_ENOUGH_RESOURCES/ERR_NOT_ENOUGH_EXTENSIONS';
	    case ERR_INVALID_TARGET:
	      return 'ERR_INVALID_TARGET';
	    case ERR_FULL:
	      return 'ERR_FULL';
	    case ERR_NOT_IN_RANGE:
	      return 'ERR_NOT_IN_RANGE';
	    case ERR_INVALID_ARGS:
	      return 'ERR_INVALID_ARGS';
	    case ERR_TIRED:
	      return 'ERR_TIRED';
	    case ERR_NO_BODYPART:
	      return 'ERR_NO_BODYPART';
	    case ERR_RCL_NOT_ENOUGH:
	      return 'ERR_RCL_NOT_ENOUGH';
	    case ERR_GCL_NOT_ENOUGH:
	      return 'ERR_GCL_NOT_ENOUGH';
	  }
	  return '';
	};

	//not as expected when called at the top of each loop
	global.clearLog = function () {
	  console.log("<script>angular.element(document.getElementsByClassName('fa fa-trash ng-scope')[0].parentNode).scope().Console.clear()</script>")
	};

/***/ },
/* 2 */
/*!********************************!*\
  !*** ./src/helperFunctions.js ***!
  \********************************/
/***/ function(module, exports) {

	"use strict";

	class HelperFunctions {

	  static objOrFunc(obj, param) {
	    if (obj == null)
	      return null;
	    if (typeof obj === 'function')
	      return obj(param);
	    else
	      return obj;
	  }

	  static massSuicide() {
	    for (let creep in Game.creeps) {
	      Game.creeps[creep].suicide();
	    }
	  }
	}


	global.HelperFunctions = HelperFunctions;


	/*
	 Object.defineProperty(RoomPosition.prototype, "isOpen", {
	 enumerable: true,
	 get: function() {
	 return(wall !== Game.rooms[this.roomName].lookForAt(LOOK_TERRAIN,this.x,this.y));
	 }
	 });



	 function getBalancedBody(energy){
	 // create a balanced body as big as possible with the given energy
	 var numberOfParts = Math.floor(energy / 200);
	 var body = [];
	 for (let i = 0; i < numberOfParts; i++) {
	 body.push(WORK);
	 }
	 for (let i = 0; i < numberOfParts; i++) {
	 body.push(CARRY);
	 }
	 for (let i = 0; i < numberOfParts; i++) {
	 body.push(MOVE);
	 }
	 return body;
	 }


	 Object.defineProperty(RoomPosition.prototype, "isOccupied", {
	 enumerable: true,
	 get: function() {
	 return(Game.rooms[this.roomName].lookForAt(LOOK_CREEPS,this.x,this.y).length > 0);
	 }
	 });


	 let find = Room.prototype.find;
	 Room.prototype.find = function(c, opt) {
	 if(_.isArray(c)) {
	 return _(c)
	 .map(x => find.call(this,x,opt))
	 .flatten()
	 .value();
	 } else
	 return find.apply(this, arguments);
	 }


	 RoomObject.prototype.lookNear = function(asArray, range=1) {
	 let {x,y} = this.pos;
	 return this.room.lookAtArea(	Math.max(0, y-range),
	 Math.max(0, x-range),
	 Math.min(49, y+range),
	 Math.min(49, x+range),
	 asArray);
	 }

	 RoomObject.prototype.lookForNear = function(lookFor, asArray, range=1) {
	 let {x,y} = this.pos;
	 return this.room.lookForAtArea(lookFor,
	 Math.max(0, y-range),
	 Math.max(0, x-range),
	 Math.min(49, y+range),
	 Math.min(49, x+range),
	 asArray);
	 }




	 */



/***/ },
/* 3 */
/*!****************************************!*\
  !*** ./src/CreepRole/creepRoleBase.js ***!
  \****************************************/
/***/ function(module, exports) {

	"use strict";

	global.RoleBase = class {
	  constructor(creep) {
	    this.creep = creep;
	  }

	  //memory get/set
	  remember(key, value) {
	    if (value === undefined)
	      return this.creep.memory[key];

	    this.creep.memory[key] = value;

	    return value;
	  }

	  //memory deletion
	  forget(key) {
	    delete this.creep.memory[key];
	  }

	  //main action function of the role
	  act() {
	    //Working is defined as having a full load and either unloading at a location or moving towards a location to unload
	    let working = this.remember('working');
	    let carryEnergy = this.creep.carry.energy;

	    //Emptied payload
	    if (working && carryEnergy == 0) {
	      working = false;
	      this.remember('working', false);
	    }

	    //Full Payload
	    else if (!working && carryEnergy == this.creep.carryCapacity) {
	      working = true;
	      this.remember('working', true);
	    }

	    //Perform work functions. These functions should be overridden in sub role
	    if (working) {
	      this.doWork();
	    } else {
	      this.doNonWork();
	    }
	  }

	  //blank memory outside of base role
	  static generateMemory() {
	    let mem = {};

	    //non active role
	    mem['role'] = 'base';

	    return mem;
	  }

	  //Generates the standard generic body
	  static generateBody(energy = 200) {
	    if (energy < 200)
	      energy = 200;
	    let numberOfParts = Math.floor(energy / 200);
	    let body = [];
	    for (let i = 0; i < numberOfParts; i++) {
	      body.push(WORK);
	    }
	    for (let i = 0; i < numberOfParts; i++) {
	      body.push(CARRY);
	    }
	    for (let i = 0; i < numberOfParts; i++) {
	      body.push(MOVE);
	    }
	    return body;
	  }

	  //Prototype function for work portion of the cycle, should be overridden in sub roles
	  doWork() { //cant be static, has to be overridden to do work
	    console.log('A subrole has not overridden doWork() or calling baseRole somehow.');
	  }

	  //Default function that will go to the source based on the saved index and mine from it
	  doNonWork() {
	    let source = this.creep.room.find(FIND_SOURCES);
	    let memIndex = this.remember('sourceIndex');
	    if (this.creep.harvest(source[memIndex]) == ERR_NOT_IN_RANGE) {
	      this.creep.moveTo(source[memIndex]);
	    }
	  }

	};



/***/ },
/* 4 */
/*!*******************************************!*\
  !*** ./src/CreepRole/creepRoleCarrier.js ***!
  \*******************************************/
/***/ function(module, exports) {

	"use strict";

	class RoleCarrier extends RoleBase {
	  constructor(creep) {
	    super(creep);
	  }


	  //main action function of the role
	  act() {
	    //Working is defined as having a full load and either unloading at a location or moving towards a location to unload
	    let working = this.remember('working');
	    let carryEnergy = this.creep.carry.energy;

	    //Emptied payload
	    if (working && carryEnergy == 0) {
	      working = false;
	      this.remember('working', false);
	    }

	    //Full Payload
	    else if (!working && carryEnergy == this.creep.carryCapacity) {
	      working = true;
	      this.remember('working', true);
	    }

	    //Perform work functions. These functions should be overridden in sub role
	    if (working) {
	      //full, should be moving to a dump
	      let site = this.creep.pos.findClosestByRange(FIND_MY_STRUCTURES, {
	        filter: (s) =>
	        (  s.structureType == STRUCTURE_SPAWN ||
	        s.structureType == STRUCTURE_EXTENSION ||
	        s.structureType == STRUCTURE_TOWER)
	        && s.energy < s.energyCapacity
	      });

	      if (site != null) {
	        if (this.creep.transfer(site, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
	          this.creep.moveTo(site);
	        }
	      }
	    } else {

	    }
	  }


	  //Generate needed memory variables
	  static generateMemory() {
	    let mem = {};

	    //non active role
	    mem['role'] = 'carrier';
	    mem['working'] = false;

	    return mem;
	  }

	  //Only need to move to the location and mine, only has MOVE and WORK
	  static generateBody(energy = 100) {
	    //Minimum value for [MOVE, CARRY]
	    if (energy < 100)
	      energy = 100;

	    let numMove = 1;
	    let numCarry = 1;

	    //1:2 move:carry < 5 parts
	    //1:3 move:carry > 5 parts

	    let body = [];
	    let carryPerMove = 2;
	    if (energy > 250)
	      carryPerMove = 3;

	    //if less than 150, counts already set
	    if (energy >= 150) {
	      energy -= 100; //for already set move/carry
	      let totalParts = Math.floor(energy / 50);
	      let counter = 0;
	      while (totalParts > 0) {
	        console.log(carryPerMove % counter);
	        console.log(counter);
	        console.log(carryPerMove);
	        if ((totalParts % carryPerMove) == 0) {
	          totalParts--;
	          numMove++;
	        }
	        numCarry++;
	        totalParts--;
	        counter++;
	      }
	    }

	    let carry = false;
	    while ((numCarry > 0) || (numMove > 0)) {
	      if (carry) {
	        if (numCarry > 0) {
	          numCarry--;
	          body.push(CARRY);
	        }
	        carry = false;
	      } else {
	        if (numMove > 0) {
	          numMove--;
	          body.push(MOVE);
	        }
	        carry = true;
	      }
	    }

	    return body;
	  }
	}

	global.RoleCarrier = RoleCarrier;


/***/ },
/* 5 */
/*!*****************************************!*\
  !*** ./src/CreepRole/creepRoleMiner.js ***!
  \*****************************************/
/***/ function(module, exports) {

	"use strict";

	class RoleMiner extends RoleBase {
	  constructor(creep) {
	    super(creep);
	  }


	  //main action function of the role
	  act() {
	    let source = Game.getObjectById(this.remember('sID'));

	    //no saved sourceID, terminate
	    //TODO: iterate over sources and find an empty one
	    if (source == null) {
	      console.log("Creep: " + this.creep.name + ' has no sID, terminating.');
	      this.creep.say('I have no sID, goodbye.');
	      this.creep.suicide();
	    }

	    if (this.creep.harvest(source) == ERR_NOT_IN_RANGE) {
	      this.creep.moveTo(source);
	    }
	  }

	  static findUnusedSourceID(room) {
	    return room.find(FIND_SOURCES, {filter: (s) => !s.memory.miner})[0].id;
	  }

	  static setSourceMiner(sID, creep) {
	    Memory.sources[sID].miner = creep;
	  }

	  //Generate needed memory variables
	  //requires a sourceIndex
	  static generateMemory(sourceID) {
	    let mem = {};

	    //non active role
	    mem['role'] = 'miner';
	    mem['sID'] = sourceID;

	    return mem;
	  }

	  //Only need to move to the location and mine, only has MOVE and WORK
	  static generateBody(energy = 150, numMoves = 1) {
	    //Minimum value for [WORK, MOVE]
	    if (energy < 150)
	      energy = 150;

	    //min number of moves
	    if (numMoves < 1)
	      numMoves = 1;

	    //Only a single move by default
	    let body = [];

	    //default of 1 move, may add more
	    while (numMoves > 0) {
	      energy -= 50;
	      numMoves--;
	      body.push(MOVE);
	    }

	    //Number of WORK parts to be added
	    let numParts = Math.floor(energy / 100);
	    while (numParts > 0) {
	      numParts--;
	      body.push(WORK);
	    }

	    return body;
	  }
	}

	global.RoleMiner = RoleMiner;


/***/ },
/* 6 */
/*!******************************************!*\
  !*** ./src/CreepSetup/creepSetupBase.js ***!
  \******************************************/
/***/ function(module, exports) {

	'use strict';

	global.CreepSetupBase = class {
	  constructor(role) {
	    this.role = role;
	    this.minRCL = 0;

	    this.noSetup = {
	      maxSpawned: 0,
	      baseBody: [],
	      multiBody: [],
	      maxMulti: 0,
	      minEnergy: 0,
	      weight: 0
	    };

	    this.RCL = {
	      1: this.noSetup,
	      2: this.noSetup,
	      3: this.noSetup,
	      4: this.noSetup,
	      5: this.noSetup,
	      6: this.noSetup,
	      7: this.noSetup,
	      8: this.noSetup
	    };
	  }
	};

	global.CreepSetup = { };


/***/ },
/* 7 */
/*!*********************************************!*\
  !*** ./src/CreepSetup/creepSetupCarrier.js ***!
  \*********************************************/
/***/ function(module, exports) {

	'use strict';

	let setup = new CreepSetupBase('carrier');

	setup.minRCL = 3;
	setup.RCL = {
	  1 : this.noSetup,
	  2 : this.noSetup,
	  3 : {
	    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
	    baseBody    : [CARRY, CARRY, MOVE],
	    multiBody   : [CARRY, CARRY, MOVE],
	    maxMulti    : 10,
	    minEnergy   : 150,
	    weight      : 200
	  },
	  4 : {
	    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
	    baseBody    : [CARRY, CARRY, MOVE],
	    multiBody   : [CARRY, CARRY, MOVE],
	    maxMulti    : 20,
	    minEnergy   : 150,
	    weight      : 200
	  },
	  5 : {
	    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
	    baseBody    : [CARRY, CARRY, MOVE],
	    multiBody   : [CARRY, CARRY, MOVE],
	    maxMulti    : 30,
	    minEnergy   : 150,
	    weight      : 200
	  },
	  6 : {
	    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
	    baseBody    : [CARRY, CARRY, MOVE],
	    multiBody   : [CARRY, CARRY, MOVE],
	    maxMulti    : 60,
	    minEnergy   : 150,
	    weight      : 200
	  },
	  7 : {
	    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
	    baseBody    : [CARRY, CARRY, MOVE],
	    multiBody   : [CARRY, CARRY, MOVE],
	    maxMulti    : 60,
	    minEnergy   : 150,
	    weight      : 200
	  },
	  8 : {
	    maxSpawned  : (room) => Math.floor(_.size(room.memory.sources) / 2),
	    baseBody    : [CARRY, CARRY, MOVE],
	    multiBody   : [CARRY, CARRY, MOVE],
	    maxMulti    : 60,
	    minEnergy   : 150,
	    weight      : 200
	  }
	};

	CreepSetup['carrier'] = setup;

/***/ },
/* 8 */
/*!*******************************************!*\
  !*** ./src/CreepSetup/creepSetupMiner.js ***!
  \*******************************************/
/***/ function(module, exports) {

	'use strict';

	let setup = new CreepSetupBase('miner');

	setup.minRCL = 3;
	setup.RCL = {
	  1: this.noSetup,
	  2: this.noSetup,
	  3: {
	    maxSpawned: (room) => _.size(room.memory.sources),
	    baseBody: [WORK, WORK, WORK, WORK, MOVE],
	    multiBody: [WORK, MOVE],
	    maxMulti: 1,
	    minEnergy: 250,
	    weight: 500
	  },
	  4: {
	    maxSpawned: (room) => _.size(room.memory.sources),
	    baseBody: [WORK, WORK, WORK, WORK, MOVE],
	    multiBody: [WORK, MOVE],
	    maxMulti: 1,
	    minEnergy: 250,
	    weight: 500
	  },
	  5: {
	    maxSpawned: (room) => _.size(room.memory.sources),
	    baseBody: [WORK, WORK, WORK, WORK, MOVE],
	    multiBody: [WORK, MOVE],
	    maxMulti: 1,
	    minEnergy: 250,
	    weight: 500
	  },
	  6: {
	    maxSpawned: (room) => _.size(room.memory.sources),
	    baseBody: [WORK, WORK, WORK, WORK, MOVE],
	    multiBody: [WORK, MOVE],
	    maxMulti: 1,
	    minEnergy: 250,
	    weight: 500
	  },
	  7: {
	    maxSpawned: (room) => _.size(room.memory.sources),
	    baseBody: [WORK, WORK, WORK, WORK, MOVE],
	    multiBody: [WORK, MOVE],
	    maxMulti: 1,
	    minEnergy: 250,
	    weight: 500
	  },
	  8: {
	    maxSpawned: (room) => _.size(room.memory.sources),
	    baseBody: [WORK, WORK, WORK, WORK, MOVE],
	    multiBody: [WORK, MOVE],
	    maxMulti: 1,
	    minEnergy: 250,
	    weight: 500
	  }
	};

	CreepSetup['miner'] = setup;

/***/ },
/* 9 */
/*!********************************************!*\
  !*** ./src/CreepSetup/creepSetupWorker.js ***!
  \********************************************/
/***/ function(module, exports) {

	'use strict';

	let setup = new CreepSetupBase('worker');

	setup.minRCL = 1;
	setup.RCL = {
	  1: {
	    maxSpawned: 6,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 0,
	    minEnergy: 200,
	    weight: 500
	  },
	  2: {
	    maxSpawned: 8,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 1,
	    minEnergy: 200,
	    weight: 500
	  },
	  3: {
	    maxSpawned: 2,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 2,
	    minEnergy: 200,
	    weight: 500
	  },
	  4: {
	    maxSpawned: 2,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 9,
	    minEnergy: 200,
	    weight: 999
	  },
	  5: {
	    maxSpawned: 1,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 9,
	    minEnergy: 200,
	    weight: 999
	  },
	  6: {
	    maxSpawned: 1,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 9,
	    minEnergy: 200,
	    weight: 999
	  },
	  7: {
	    maxSpawned: 1,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 9,
	    minEnergy: 200,
	    weight: 999
	  },
	  8: {
	    maxSpawned: 1,
	    baseBody: [WORK, CARRY, MOVE],
	    multiBody: [WORK, CARRY, MOVE],
	    maxMulti: 9,
	    minEnergy: 200,
	    weight: 999
	  }
	};

	CreepSetup['worker'] = setup;

/***/ },
/* 10 */
/*!******************************!*\
  !*** ./src/memoryManager.js ***!
  \******************************/
/***/ function(module, exports) {

	"use strict";

	class MemoryManager {
	  constructor() {

	  }


	  //TODO make this usable every loop to update new rooms I own? Or add a new function add a new room to memory
	  static buildRoomMemory() {
	    if (!Memory.rooms)
	      Memory.rooms = {};

	    for (let r in Game.rooms) {
	      let room = Game.rooms[r];
	      if (room.find(FIND_MY_STRUCTURES).length > 0) {
	        //this is my room, now do stuff
	        //it doesn't exist yet
	        if (Memory.rooms[r] == undefined) {
	          let mem = {};

	          mem.sources = [];
	          for (let s of room.find(FIND_SOURCES)) {
	            mem.sources.push(s.id);
	          }

	          mem.spawns = [];
	          for (let s of room.find(FIND_MY_SPAWNS)) {
	            mem.spawns.push(s.name);
	          }

	          mem.spawnQueue = [];

	          Memory.rooms[r] = mem;
	        }
	      }
	    }
	  }

	  //TODO iterate over rooms memory and clear out ones that i don't own
	  static garbageCollection() {
	    for (let c in Memory.creeps) {
	      if (!Game.creeps[c])
	        delete Memory.creeps[c];
	    }
	    //removes .miner from source memory if that creep is dead
	    //allows a new one to take over
	    for (let c in Memory.sources) {
	      if (!Game.creeps[Memory.sources[c].miner])
	        delete Memory.sources[c].miner;
	    }

	    //if the Memory.room doesn't exist in my rooms, delete it.
	    //later may need to save rooms, for now leave as is
	    for (let r in Memory.rooms) {
	      if (!_.find(Game.rooms, (o) => o.name == r))
	        delete Memory.rooms[r];
	    }
	  }
	}

	global.MemoryManager = MemoryManager;

/***/ },
/* 11 */
/*!*****************************!*\
  !*** ./src/creepFactory.js ***!
  \*****************************/
/***/ function(module, exports) {

	"use strict";

	class CreepFactory {
	  static doActions() {
	    //iterate over creeps and load their handlers
	    for (let c in Game.creeps) {
	      let creep = Game.creeps[c];
	      let loadedCreep = null;
	      switch (creep.memory['role']) {
	        case 'builder':
	          loadedCreep = new RoleBuilder(creep);
	          break;
	        case 'miner':
	          loadedCreep = new RoleMiner(creep);
	          break;
	        case 'repairer':
	          loadedCreep = new RoleRepairer(creep);
	          //console.log('role repair')
	          break;
	        case 'upgrader':
	          loadedCreep = new RoleUpgrader(creep);
	          break;
	      }


	      //we didn't load, something went wrong
	      if (loadedCreep === null)
	        return;

	      //builds the creep memory and runs its act() function
	      loadedCreep.act();
	    }
	  }

	  //role of the creep, the spawner object to spawn, max energy usable for this creep
	  //if negative, use the maximum possible in the room, get room object from spawn object
	  //TODO: Shove spawn code into static class methods
	  static spawn(role, spawner, maxEnergy = -1) {
	    //if no sourceIndex set or is too high, set to 0
	    if ((!Memory.sourceIndex) || (Memory.sourceIndex >= Game.spawns.Spawn1.room.find(FIND_SOURCES).length))
	      Memory.sourceIndex = 0;
	    let room = spawner.room;
	    if (maxEnergy < 0)
	      maxEnergy = room.energyCapacityAvailable;
	    /*
	     TOUGH 	        10
	     MOVE 	        50
	     CARRY 	        50
	     ATTACK 	      80
	     WORK 	        100
	     RANGED_ATTACK  150
	     HEAL 	        250
	     CLAIM 	        600
	     */

	    let mem = null;
	    let body = null;

	    //creep init
	    switch (role) {
	      case 'builder':
	        break;
	      case 'miner':
	        let sID = RoleMiner.findUnusedSourceID(room);
	        if (!sID)
	          log.error('No sID found, why create a miner?');
	        body = RoleMiner.generateBody();
	        mem = RoleMiner.generateMemory(sID);
	        break;
	      case 'repairer':
	        break;
	      case 'upgrader':
	        break;
	    }

	    let name = role + '-' + Game.time;
	    //console.log("TrySpawn: " + name + ' PartsUsed: ' + Math.floor(maxEnergy / 200) + ' Memory: ' + JSON.stringify(mem));
	    let canMake = spawner.canCreateCreep(body, name);
	    if (canMake === OK) {
	      let creep = spawner.createCreep(body, name, mem);
	      console.log("Spawned: " + name + ' PartsUsed: ' + Math.floor(maxEnergy / 200) + ' Memory: ' + JSON.stringify(mem));
	      Memory.sourceIndex++;

	      //creep success, perform post processing
	      switch (role) {
	        case 'builder':
	          break;
	        case 'miner':
	          RoleMiner.setSourceMiner(mem.sID, creep);
	          break;
	        case 'repairer':
	          break;
	        case 'upgrader':
	          break;
	      }
	    }
	  }


	  //Uses passed room object to check for mim pop and adds missing creeps to the spawn queue
	  static populationCheck(room) {
	    let rcl = room.controller.level;

	    room.memory.spawnQueue = [];
	    //iterate over each role, check for num vs max, build spawn list
	    for (let role in CreepSetup.roles) {
	      let roleSetup = CreepSetup.roles[role];
	      //is the rcl high enough for this creep
	      if (rcl >= roleSetup.minRCL) {
	        //TODO add a check for spawns in queue, until then, wipe queue on this call
	        let creepNeeded = HelperFunctions.objOrFunc(roleSetup.RCL[rcl].maxSpawned, room) - _.sum(room.find(FIND_MY_CREEPS, {filter: (c) => c.memory.role == role}));
	        while (creepNeeded > 0) {
	          //spawn queue
	          room.memory.spawnQueue.push({role: role, setup: roleSetup.RCL[rcl]});
	          creepNeeded--;
	        }
	      }
	    }
	  }

	  static processSpawnQueue(room) {
	    let arr = room.memory.spawnQueue;
	    let q = _.sortBy(arr, a => -a.setup.weight);
	    while (q.length > 0) {
	      log.log(q.length + ' ' + q.pop().role)
	    }
	  }
	}


	global.CreepFactory = CreepFactory;

/***/ }
/******/ ]);