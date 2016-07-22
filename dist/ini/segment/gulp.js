'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _format = require('./format');

var format = _interopRequireWildcard(_format);

var _linter = require('./linter');

var linter = _interopRequireWildcard(_linter);

var _git = require('./git');

var git = _interopRequireWildcard(_git);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

//	EXPORTS

exports.default = {
    format: format,
    git: git,
    'inPlace': './',
    linter: linter,
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
}; /**
    *  The configuration file for gulp.
    *
    *  @name   gulp.js
    */

//	IMPORTS