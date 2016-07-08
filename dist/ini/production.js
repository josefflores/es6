'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _paths = require('./segments/paths.js');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// EXPORTS

exports.default = {
    app: {
        mode: 'prod'
    },
    paths: _paths2.default
}; /**
    *  The configuration file to use during production.
    *
    *  @name    production.js
    */

// IMPORTS