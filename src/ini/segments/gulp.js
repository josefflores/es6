/**
 *  The configuration file for gulp.
 *
 *  @name   gulp.js
 */

//	IMPORTS

import * as format from './format';
import * as linter from './linter';
import * as git from './git';

//	EXPORTS

export default {
    format,
    git,
    help: {
        hideDepsMessage: true,
        hideEmpty: true
    },
    inPlace: './',
    linter
};