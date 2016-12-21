declare let module: any;
declare let global: any;

declare let JSON_STRINGIFY_EXPANDED: boolean;
declare let log: any;
declare function ex(x: any) : string;
declare function errName(err: number) : string;

declare let CreepSetups: {[key: string]: CreepSetup};
declare let CreepRoles: {[key: string]: CreepRole};
declare let CreepActions: {[key: string]: CreepAction};


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
   * Is a location occupied by a creep. Credit:
   */
  isOccupied: boolean;
}

interface Source {
  /**
   * Provision for Source memory
   */
  memory: any;
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
}
//endregion

//region Roles
declare class CreepRole {
  name: string;
  constructor(name: string);
  act(creep: Creep): void; //perform action
  nextAction(creep: Creep): CreepAction; //decides what to do next
}

declare class CreepRoleWorker extends CreepRole {
  constructor();
  nextAction(creep: Creep): CreepAction; //decides what to do next
}
//endregion

//region Actions
declare abstract class CreepAction {
  name: string;
  target: string;
  range: number;
  constructor(name: string);
  abstract assign(creep: Creep, target?: string) : boolean;
  abstract isValidAction(creep: Creep): boolean;
  abstract isValidTarget(creep: Creep, target: string): boolean;
  step(creep: Creep): void;
  abstract work(creep: Creep): number;
}

declare class CreepActionIdle extends CreepAction {
  constructor();
  assign(creep: Creep, target?: string) : boolean;
  isValidAction(creep: Creep): boolean;
  isValidTarget(creep: Creep, target: string): boolean;
  work(creep: Creep): number;
}


//endregion