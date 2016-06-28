'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _paths = require('./common/paths.js');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configuration settings
exports.default = {
    app: {
        mode: 'prod'
    },
    path: _paths2.default
}; /**
    *  The configuration file to use during production.
    *
    *  @name    production.js
    */