declare let module: any;
declare let global: any;

/**
 * Global setting declarations, see globals.ts
 */
declare let CREEP_SINGING: boolean;
declare let ROOM_SINGING: boolean;
declare let EMERGENCEY_UPGRADE_THRESHOLD: number;
declare let STORAGE_ENERGY_THRESHOLD: number;

/**
 *  Global Creep lists, Setups, Roles, Actions
 */
declare let CreepSetups: {[key: string]: CreepSetup};
declare let CreepRoles: {[key: string]: CreepRole};
declare let CreepActions: {[key: string]: CreepAction};

/**
 * Logging functions
 *  prints a string to the console, differing colors
 */
declare let log: {
    LOG_ENABLED : boolean,
    WARN_ENABLED : boolean,
    ERROR_ENABLED : boolean,
    DEBUG_ENABLED : boolean,
    debug(arg: string): void,
    log(arg: string): void,
    warn(arg: string): void,
    err(arg: string): void
};

/**
 * JSON.stringify wrapper
 *  JSON_STRINGIFY_EXPANDED if true will make the returned string multi line
 * @param x object to turn into a string
 * @returns {string} object as a string
 */
declare let JSON_STRINGIFY_EXPANDED: boolean;
declare function ex(x: any) : string;

/**
 * Converts an error code into a string equivalent
 * @param err ERR_* constant number value
 * @returns {string} string version of the ERR_* constant
 */
declare function errName(err: number) : string;

/**
 * Wipes everything, including memory
 */
declare function respawn(): void;
/**
 * Wipes Memory
 */
declare function rm(): void;
/**
 * Kills all of your creeps
 */
declare function rc(): void;
/**
 * Removes all of the flags
 */
declare function rf(): void;
/**
 * Removes all construction sites
 */
declare function rcs(): void;

/**
 * returns string for a link that can be clicked from the console
 * to change which room you are viewing. Useful for other logging functions
 * Author: Helam
 * @param roomArg {Room|RoomObject|RoomPosition|string}
 * @returns {string}
 */
declare function roomLink(roomArg: any): string;
/**
 * console function that prints:
 *  gcl status
 *  rcl status and significant missing structures for each claimed room
 */
declare function roomLevels(): void;


//region Prototypes
interface Creep {
  /**
   * Get the quantity of live body parts of the given type. Fully damaged parts do not count. Optimized version. Credit:
   * @param type A body part type, one of the following body part constants: MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
   */
  getActiveBodyparts(type: string): number;
  /**
   * Gets whether or not a live body part exists. Fully damaged parts do not count. Credit:
   * @param type A body part type, one of the following body part constants: MOVE, WORK, CARRY, ATTACK, RANGED_ATTACK, HEAL, TOUGH, CLAIM
   */
  hasActiveBodyparts(type: string): boolean;

  /**
   * Creep sings the given sentence, delimited by |
   * @param {string} sentence sentence to sing
   * @param {boolean} pub sing it publicly
   */
  sing(sentence: string, pub?: boolean): void;

  /**
   * Sum of all resources on the creep, cached per tick
   */
  carrySum: number;
  _carrySum: number;
}

interface Memory {
  /**
   * Provision for Source memory
   */
  sources: {
    [name: string]: any;
  };
  /**
   * Provision for Structure memory
   */
  structures: {
    [name: string]: any;
  };
}

interface Room {

  /**
   * All creeps in the room sing the given sentence, delimited by |
   * @param {string} sentence sentence to sing
   * @param {boolean} pub sing it publicly
   */
  sing(sentence: string, pub?: boolean): void;

  /**
   * Total energy mineable from all sources in this room, this tick. Cached per tick
   */
  mineableEnergy: number;
  _mineableEnergy: number;
  /**
   * Total energy needed to fill all the spawns/extensions in the room. Cached per tick
   */
  neededSpawnEnergy: number;
  _neededSpawnEnergy: number;
  /**
   * Whether or not there are constructionsites in this room. Cached per tick
   */
  hasConstructionSites: boolean;
  _hasConstructionSites: boolean;
  /**
   * Total amount of energy dropped on the floor. Cached per tick
   */
  pickableEnergy: number;
  _pickableEnergy: number;
  /**
   * Are there repairable objects in the Room? Caches per tick
   */
  hasRepairables: boolean;
  _hasRepairables: boolean;
  /**
   * The total amount of battery power needed (towers)
   */
  neededBatteryEnergy: number;
  _neededBatteryEnergy: number;
  /**
   * Total energy stored in containers
   */
  storageEnergy: number;
  _storageEnergy: number;
}

interface RoomObject {
  /**
   * Wrapper for lookAtArea to look in range of an object. Credit: warinternal
   * @param asArray return the results as an array or not
   * @param range range to look, defaults to one
   * @returns {LookAtResultMatrix|LookAtResultWithPos[]}
   */
  lookNear(asArray: boolean, range?: number):  LookAtResultMatrix | LookAtResultWithPos[];
  /**
   * Wrapper for lookForAtArea to look in range of an object. Credit: warinternal
   * @param lookFor Object searching for
   * @param asArray return results as array or not
   * @param range range to look. defaults to one
   * @returns {LookAtResultMatrix|LookAtResultWithPos[]}
   */
  lookForNear(lookFor: string, asArray: boolean, range?: number):  LookAtResultMatrix | LookAtResultWithPos[];
}

interface RoomPosition {
  /**
   * Is a location occupied by a creep. Credit: proximo
   */
  isOccupied: boolean;
}

interface Source {
  /**
   * Provision for Source memory
   */
  memory: any;
  /**
   * Number of open fields around the source that cane be used to mine. I.E. max miners. Stored in memory
   */
  usableFields: number;
  /**
   * Number of miner actions with this source as a target.
   */
  minerCount: number;
  /**
   * Name of a dedicated miner creep
   */
  dedicatedMiner: string;
}

interface Structure {
  /**
   * Provision for Structure memory
   */
  memory: any;
}
//endregion

//region Managers
/**
 * MemoryManager
 *  Static class to manage various Memory functions
 */
declare class MemoryManager {
  /**
   * Generates the Memory.rooms object
   * @param refresh if true, will force a regeneration of Memory.rooms
   */
  static buildRoomMemory(refresh?: boolean): void;
  /**
   * Removes stale Memory entries
   */
  static garbageCollection(): void;
}

/**
 * CreepManager
 *  Static class that handles all of the creeps actions each tick
 */
declare class CreepManager {
  /**
   * Iterates over all of the creeps and runs their roles act()
   */
  static doActions(): void;
  /**
   * Spawns a creep in the chosen Room based on provided CreepSetup object
   * @param role  CreepSetup object to generate a creep from
   * @param room  Room object to spawn the creep in
   * @returns {boolean} whether or not the spawn was successful
   */
  static spawn(role: CreepSetup, room: Room): boolean;
  /**
   * Builds a rooms spawn queue based on the population required in the Room provided.
   *  Sorts the queue by the weight of the missing creeps
   * @param room Room to generate a spawn queue for
   */
  static populationCheck(room: Room): void;
  /**
   * Processes the provided rooms spawn queue, attempting to spawn as many as possible
   * @param room Room to be processed
   */
  static processSpawnQueue(room: Room): void;

  /**
   * Spawns an emergency worker creep to restart the room
   * @param {Room} room room in crisis
   */
  static emergencySpawn(room: Room): void;
  }

/**
 * RoomManager
 *  Static class that handles all of the rooms each tick
 */
declare class RoomManager {
  /**
   * Processes each room
   */
  static processRooms(): void;

  /**
   * Iterates over the towers in a room and makes them act
   * @param {Room} room room to be processed
   */
  static processTowers(room: Room): void;
}


/**
 * HelperFunctions
 *  A static object containing a series of useful functions
 */
declare class HelperFunctions {
  /**
   * Kills every creep you own
   */
  static getBodyCost(body: string[]): number;
}
//endregion

//Creeps
//region Setups

/**
 * CreepRCLSetup
 *  Definition of the object required to spawn a creep
 *  The number values can either be a raw number or a function that takes a Room and returns a number
 *  - This is to allow various attributes to be changed based on spawning room conditions
 */
interface CreepRCLSetup {
  /**
   * Starting body[] for a creep
   */
  baseBody: string[];
  /**
   * Maximum number of multiBody allowed
   */
  maxMulti: number | ((room: Room)=>number);
  /**
   * Maximum number of this creep allowed to be attached to this room
   */
  maxSpawned: number | ((room: Room)=>number);
  /**
   * Minimum energy required to spawn this creep
   */
  minEnergy: number;
  /**
   * The body[] that can be added onto the baseBody up to maxMulti times
   */
  multiBody: string[];
  /**
   * The weight (priority) of this creep
   */
  weight: number | ((room: Room)=>number);
}

/**
 * CreepSetup
 *  Contains all of the information to create a creep
 */
declare class CreepSetup {
  /**
   * Role is the string name of the creeps role in life. Matches between Role and Setup
   */
  role: string;
  /**
   * Minimum RCL to spawn this creep
   */
  minRCL: number;
  /**
   * Base, blank CreepRCLSetup with no information
   */
  noSetup: CreepRCLSetup;
  /**
   * A collection of CreepRCLSetup for each RCL from 1-8
   */
  RCL: {
    [key: number]: CreepRCLSetup;
  };

  /**
   * Constructor only requiring the desired Role/Setup name
   * @param role name of the Setup
   */
  constructor(role: string);

  /**
   * Returns the max allowed to spawn in a specified room
   * @param {Room} room room to check for
   * @returns {number} number allowed to be spawned
   */
  getMaxSpawnable(room: Room): number;

  /**
   * Returns the max multiplier for the extended creep bodies in a specified room
   * @param {Room} room room to check for
   * @returns {number} max multiple
   */
  getMaxMulti(room: Room): number;

  /**
   * Used in the CreepSetup objects to determine various number values based on provided room conditions
   * @param obj Either a number or a function that will return a number
   * @param room Optional: room in which to use in determining the number to return
   * @returns {any}
   */
  static objOrFunc(obj: number | ((room: Room) => number), room?: Room): number;

  /**
   * Creates a balanced body array
   * @param energy max energy to use
   * @returns {Array} body string[] for a creep
   */
  static getBalancedBody(energy: number): string[];

  /**
   * Returns the total cost of a body[] for a creep
   * @param body body[] to compute a cost for
   * @returns {number} total cost of body
   */
  static getBodyCost(body: string[]): number;

  /**
   * Sorts the body into preferred loss order
   * @param {string[]} body body to sort
   * @returns {string[]} sorted body
   */
  static sortBody(body: string[]): string[];
}
//endregion

//region Roles
/**
 * CreepRole
 *  Base role class
 */
declare class CreepRole {
  /**
   * Name of the role
   */
  name: string;
  constructor(name: string);
  /**
   * Executes the action decided for thsi role each tick
   * @param {Creep} creep Creep performing action
   */
  act(creep: Creep): void;
  /**
   * Generates the next action, decided by priority lists in nextAction
   * @param {Creep} creep Creep performing the action
   * @returns {CreepAction} The action decided upon
   */
  nextAction(creep: Creep): CreepAction;

  /**
   * Actions to take when 1TTL remains
   * @param {Creep} creep Creep to cleanup
   */
  cleanup(creep: Creep): void;
}

//endregion

//region Actions
/**
 * CreepAction
 *  Base Action class
 */
declare abstract class CreepAction {
  /**
   * String name of the action
   */
  name: string;
  /**
   * Maximum range at which action can occur
   */
  range: number;
  /**
   * Constructor
   * @param name string name of action
   */
  constructor(name: string);
  /**
   * Assigns the action to the creep
   * @param creep target creep
   * @return {boolean} whether or not assignment succeeded
   */
  abstract assign(creep: Creep): boolean;
  /**
   * Checks whether or not the creep is allowed to do this action
   * @param creep target creep
   * @return {boolean} whether or action is allowed
   */
  abstract isValidAction(creep: Creep): boolean;
  /**
   * Gets a new target for the action.
   * @param creep
   * @return {string} String ID of new object
   */
  abstract newTarget(creep: Creep): string;
  /**
   * Performs the next step required for this action, be it drive or work
   * If work fails, get a new action
   * @param creep target creep
   */
  step(creep: Creep): void;
  /**
   * Performs the work action of this creep
   * @param creep
   * @return {number} ERR_* code of work status
   */
  abstract work(creep: Creep): number;
}

//endregion