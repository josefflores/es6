'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  EXPORTS

exports.default = {
  src: [_path2.default.join('.', 'src', '**', '*.js')],
  dist: _path2.default.join('.', 'dist', '*'),
  entry: _path2.default.join('.', 'dist', 'app.js')
}; /**
    *  The configuration file for absolute paths.
    *
    *  @name   paths.js
    */

//  IMPORTS