/**
 *  The configuration file to use during production.
 *
 *  @name    production.js
 */

//  IMPORTS

import paths from './segment/paths.js';

//  EXPORTS

export default {
    'app': {
        'mode': 'prod'
    },
    paths
};