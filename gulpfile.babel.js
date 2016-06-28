/**
 *  This file holds the gulp task scripts, it is the task runner.
 *
 *  @name   gulpfile.js
 */

//  Set up gloabal application and configuration


//	IMPORTS

import gulp from 'gulp';

import GApp from './src/server/lib/GlobalApp'
import * as gs from './src/server/lib/gulp/Gulp-Scripts';

//	GLOBALS

global.app = new GApp('gulp', __dirname);
gs.init();

//	TASKS

gulp.task('babel', gs.babelFunc);
gulp.task('clean', gs.cleanFunc);

gulp.task('help', gs.help);

gulp.task('lint', gs.lintFunc);
gulp.task('format', gs.formatFunc);

gulp.task('watch', gs.watchFunc);

gulp.task('process', gulp.series('lint', 'format', 'babel'));
gulp.task('build', gulp.series('clean', 'process'));
gulp.task('default', gulp.series('build','watch'));
