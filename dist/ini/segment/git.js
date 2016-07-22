'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *  The configuration file for git commands.
 *
 *  @name   git.js
 */

//	EXPORTS

let git = exports.git = {
    'lock': {
        'read': false
    },
    'add': {
        'args': '-A'
    },
    'commit': {
        'options': {
            'm="message"': 'Commit message to use.'
        }
    }
};