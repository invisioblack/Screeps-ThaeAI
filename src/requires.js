'use strict';

import './globals';
import './helperFunctions';

//Prototype changes
import './prototypes/Room';
import './prototypes/RoomObject';
import './prototypes/RoomPosition';
import './prototypes/Source';
import './prototypes/Structure';


//Roles
import './CreepRole/creepRoleBase';
import './CreepRole/creepRoleCarrier';
import './CreepRole/creepRoleMiner';

//Creep Setup
import './CreepSetup/creepSetupBase';
import './CreepSetup/creepSetupCarrier';
import './CreepSetup/creepSetupMiner';
import './CreepSetup/creepSetupWorker';

//Managers/Factorys
import './memoryManager';
import './creepFactory';
