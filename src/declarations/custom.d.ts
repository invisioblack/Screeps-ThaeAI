declare let module: any;
declare let global: any;

declare let LOGGING_ENABLED: boolean;
declare let log: any;
declare function ex(x: any) : void;
declare function errName(err: number) : string;

declare let CreepSetups: CreepSetup;


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

  sourceIndex: number;
}

interface RoomObject {
  lookNear(asArray: boolean, range?: number):  LookAtResultMatrix | LookAtResultWithPos[];
  lookForNear(lookFor: string, asArray: boolean, range?: number):  LookAtResultMatrix | LookAtResultWithPos[];
}

interface RoomPosition {
  isOccupied(): boolean;
}


//creeps
declare class CreepSetup {
  private _role;
  readonly role: string;
  private _minRCL;
  minRCL: number;
  private _noSetup;
  readonly noSetup: any;
  private _RCL;
  RCL: any;
  constructor(role: any);
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
