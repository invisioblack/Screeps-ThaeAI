declare let module: any;
declare let global: any;

declare let LOGGING_ENABLED: boolean;
declare let JSON_STRINGIFY_EXPANDED: boolean;
declare let log: any;
declare function ex(x: any) : string;
declare function errName(err: number) : string;

declare let CreepSetups: CreepSetup[];


//prototypes
interface Creep {
  getActiveBodyparts(type: string): number;
  hasActiveBodyparts(type: string): boolean;
}

interface Memory {
  sources: {
    [name: string]: any;
  };
  structures: {
    [name: string]: any;
  };

  room: {
    ['spawnQueue']: CreepSetup;
  }

  sourceIndex: number;
}

interface RoomObject {
  lookNear(asArray: boolean, range?: number):  LookAtResultMatrix | LookAtResultWithPos[];
  lookForNear(lookFor: string, asArray: boolean, range?: number):  LookAtResultMatrix | LookAtResultWithPos[];
}

interface RoomPosition {
  isOccupied(): boolean;
}

//managers
declare class MemoryManager {
  static buildRoomMemory(): void;
  static garbageCollection(): void;
}

declare class CreepManager {
  static doActions(): void;
  static spawn(role: any, room: Room): boolean;
  static populationCheck(room: any): void;
  static processSpawnQueue(room: any): void;
}

declare class HelperFunctions {
  static objOrFunc(obj: any, param: any): any;
  static massSuicide(): void;
  static getBalancedBody(energy: any): any[];
}

//creeps
declare class CreepSetup {
  role: string;
  minRCL: number;
  noSetup: any;
  RCL: any;
  constructor(role: string);
}

//roles
declare class RoleBase {
  protected creep: Creep;
  constructor(creep: Creep);
  remember(key: string, value?: any): any;
  forget(key: string): void;
  act(): void;
  doWork(): void;
  doNonWork(): void;
}

declare class RoleCarrier extends RoleBase {
  constructor(creep: Creep);
  act(): void;
}

declare class RoleMiner extends RoleBase {
  constructor(creep: Creep);
  act(): void;
  static findUnusedSourceID(room: any): any;
  static setSourceMiner(sID: any, creep: any): void;
}
