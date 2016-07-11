/**
 *  The configuration file for absolute paths.
 *
 *  @name   paths.js
 */

//  IMPORTS

import path from 'path';

//  EXPORTS

export default {
    src: [path.join('.', 'src', '**', '*.js')],
    dist: path.join('.', 'dist', '*'),
    entry: path.join('.', 'dist', 'app.js')
};