/**
 *  The configuration file to use during production.
 *
 *  @name    production.js
 */

import paths from './common/paths.js';

// Configuration settings
export default {
    app: {
        mode: 'prod'
    },
    path: paths
};