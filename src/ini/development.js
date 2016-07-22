/**
 *  The configuration file to use during development. It holds settings for the application.
 *
 *  @name   developement.js
 */

//	IMPORTS

import gulp from './segment/gulp';
import paths from './segment/paths';

//  EXPORTS

export default {
    'app': {
        'mode': 'dev'
    },
    gulp,
    paths
};