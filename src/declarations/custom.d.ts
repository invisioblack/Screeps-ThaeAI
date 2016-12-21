declare let module: any;
declare let global: any;

declare let LOGGING_ENABLED: boolean;
declare let JSON_STRINGIFY_EXPANDED: boolean;
declare let log: any;
declare function ex(x: any) : string;
declare function errName(err: number) : string;

declare let CreepSetups: {[key: string]: CreepSetup};


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

interface Source {
  memory: any;
}

interface Structure {
  memory: any;
}

//managers
declare class MemoryManager {
  static buildRoomMemory(): void;
  static garbageCollection(): void;
}

declare class CreepManager {
  static doActions(): void;
  static populationCheck(room: any): void;
  static processSpawnQueue(room: any): void;
  static spawn(role: any, room: Room): boolean;
}

declare class HelperFunctions {
  static getBalancedBody(energy: number): string[];
  static massSuicide(): void;
  static objOrFunc(obj: number | ((room: Room)=>number), room: Room): number;
}

//creeps

interface CreepRCLSetup {
  baseBody: string[];
  maxMulti: number | ((room: Room)=>number);
  maxSpawned: number | ((room: Room)=>number);
  minEnergy: number;
  multiBody: string[];
  weight: number | ((room: Room)=>number);
}

declare class CreepSetup {
  minRCL: number;
  noSetup: CreepRCLSetup;
  RCL: { [key: number] : CreepRCLSetup };
  role: string;
  constructor(role: string);
}

//roles
declare class RoleBase {
  protected creep: Creep;
  constructor(creep: Creep);
  act(): void;
  doNonWork(): void;
  doWork(): void;
  forget(key: string): void;
  remember(key: string, value?: any): any;
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
