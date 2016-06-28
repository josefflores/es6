/**
 *  The configuration file for absolute paths.
 *
 *  @name   paths.js
 */

//  IMPORTS

import path from 'path';

//  VARIABLES

//  File and Directory Paths
export default {
    documents: path.join('doc'),
	src: ['./src/**/*.js'],
	dist: './dist'
};