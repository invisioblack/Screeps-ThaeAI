'use strict';

import './globals';
import './helperFunctions';

//Prototype changes
import './prototypes/Creep';
import './prototypes/RoomObject';
import './prototypes/RoomPosition';
import './prototypes/Source';
import './prototypes/Structure';

//creeps
//roles
import './creep/role/CreepRoleBase';
import './creep/role/CreepRoleCarrier';
import './creep/role/CreepRoleMiner';

//setups
import './creep/setup/CreepSetupBase';
import './creep/setup/CreepSetupCarrier';
import './creep/setup/CreepSetupMiner';
import './creep/setup/CreepSetupWorker';

//Managers
import './managers/MemoryManager';
import './managers/CreepManager';


