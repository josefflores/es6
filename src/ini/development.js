/**
 *  The configuration file to use during development. It holds settings for the application.
 *
 *  @name   developement.js
 */

//	IMPORTS

import gulp from './segments/gulp';
import paths from './segments/paths';

//  EXPORTS

export default {
    app: {
        mode: 'dev'
    },
    gulp,
    paths
};