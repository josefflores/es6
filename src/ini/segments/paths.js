/**
 *  The configuration file for absolute paths.
 *
 *  @name   paths.js
 */

//  IMPORTS

import path from 'path';

//  VARIABLES

let root = path.join(__dirname, '..', '..', '..');

//  EXPORTS

export default {
    src: path.join(root, 'src', '**', '*.js'),
    distFiles: path.join(root, 'dist', '*'),
    distDir: path.join(root, 'dist'),
    entry: path.join(root, 'dist', 'app.js')
};