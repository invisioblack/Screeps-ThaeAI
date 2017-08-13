'use strict';

/**
 * All the global.stuff
 */
import './globals';

/**
 * Prototype changes
 */
import './prototypes/Creep';
import './prototypes/Room';
import './prototypes/RoomObject';
import './prototypes/RoomPosition';
import './prototypes/Source';
import './prototypes/Structure';

/**
 * Creep Setups
 *  Each file, when imported, will add itself to the global list CreepSetups
 */
import './creep/setup/emergencyWorker';
import './creep/setup/carrier';
import './creep/setup/miner';
import './creep/setup/worker';

/**
 * Creep Roles
 *  Each file, when imported, will add itself to the global list CreepRoles
 */
import './creep/role/carrier';
import './creep/role/miner';
import './creep/role/worker';

/**
 * Creep Actions
 */
import './creep/action/base'
import './creep/action/build'
import './creep/action/fill'
import './creep/action/fillStorage'
import './creep/action/idle'
import './creep/action/mine'
import './creep/action/minerMine'
import './creep/action/pickup'
import './creep/action/recharge'
import './creep/action/repair'
import './creep/action/upgrade'
import './creep/action/withdraw'
import './creep/action/withdrawStorage'