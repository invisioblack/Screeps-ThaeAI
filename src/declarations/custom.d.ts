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