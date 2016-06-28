'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  VARIABLES

//  File and Directory Paths
exports.default = {
  documents: _path2.default.join('doc'),
  src: ['./src/**/*.js'],
  dist: './dist'
}; /**
    *  The configuration file for absolute paths.
    *
    *  @name   paths.js
    */

//  IMPORTS