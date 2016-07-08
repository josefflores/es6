/**
 *  The configuration file to use during development. It holds settings for the application.
 *
 *  @name   developement.js
 */

//	IMPORTS

import gulp from './modules/gulp';
import paths from './modules/paths';

//  EXPORTS

export default {
    app: {
        mode: 'dev'
    },
    gulp,
    paths
};