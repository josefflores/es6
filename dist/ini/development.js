'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gulp = require('./modules/gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _paths = require('./modules/paths');

var _paths2 = _interopRequireDefault(_paths);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  EXPORTS

/**
 *  The configuration file to use during development. It holds settings for the application.
 *
 *  @name   developement.js
 */

//	IMPORTS

exports.default = {
    app: {
        mode: 'dev'
    },
    gulp: _gulp2.default,
    paths: _paths2.default
};