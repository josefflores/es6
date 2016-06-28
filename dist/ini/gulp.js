'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _paths = require('./common/paths.js');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// 	SETTINGS
exports.default = {
    app: {
        mode: 'dev'
    },
    opt: {
        help: {
            hideDepsMessage: true,
            hideEmpty: true
        },
        inPlace: {
            base: './'
        },
        git: {
            lock: {
                read: false
            },
            add: {
                args: '-A'
            },
            commit: {
                options: {
                    'm="message"': 'Commit message to use.'
                }
            }
        }
    },
    path: _paths2.default
}; /**
    *  The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.
    *
    *  @name   gulp.js
    */