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
    'inPlace': './',
    linter,
    'defaults': {
        'clean': {
            'force': true,
            'read': false
        },
        'debugMinimal': true,
        'gulpSrc': {
            'base': './',
            'passthrough': false
        },
        'babelSrc': {
            'passthrough': false,
            'base': './src'
        },
        'monitorSrc': {
            'cwd': '.',
            'ignoreInitial': true,
            'awaitWriteFinish': {
                'stabilityThreshold': 100,
                'pollInterval': 100
            }
        },
        'mocha': {
            'read': false
        }
    }
};