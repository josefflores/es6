'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  VARIABLES

let root = _path2.default.join(__dirname, '..', '..', '..');

//  EXPORTS
/**
 *  The configuration file for absolute paths.
 *
 *  @name   paths.js
 */

//  IMPORTS

exports.default = {
    'src': _path2.default.join(root, 'src', '**', '*.js'),
    'distFiles': _path2.default.join(root, 'dist', '*'),
    'distDir': _path2.default.join(root, 'dist'),
    'entry': _path2.default.join(root, 'dist', 'app.js'),
    'tests': _path2.default.join(root, 'dist', 'test', '**', '*.test.js')
};