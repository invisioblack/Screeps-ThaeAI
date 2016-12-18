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
/***/ function(module, exports) {

	'use strict';

	import './requires';

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

/***/ }
/******/ ]);