/**
 *  This file holds the gulp task scripts, it is the task runner.
 *
 *  @name   gulpfile.js
 */

//	IMPORTS

import gulp from 'gulp'

//	LOCAL IMPORTS

import GApp from './src/modules/GlobalApp'
import * as ga from './src/modules/gulp/gulp-actions';
import gulpMan from './src/modules/gulp/gulp-man'

//  Set up gloabal application and configuration
global.app = new GApp('development', __dirname);

//	Wrap gulp.task to allow for an object as parameter
gulp.task = gulpMan(gulp);

//	TASKS

gulp.task({
	name: 'code-watch',
	desc: 'Monitors for source code changes.',
	func: ga.watch
});
gulp.task({
	name: 'code-babel',
	desc: 'Transposes ES6 code to ES5',
	func: ga.babel,
	man: true
});
gulp.task({
	name: 'code-format',
	desc: 'Formats source code.',
	func: ga.format,
	man: true
});
gulp.task({
	name: 'code-lint',
	desc: 'Checks for source code errors.',
	func: ga.lint,
	man: true
});
gulp.task({
	name: 'code-clean',
	desc: 'Cleans distribution directory.',
	func: ga.clean,
	man: true
});
gulp.task({
	name: 'code-test',
	desc: 'Unit test code.',
	func: ga.test,
	man: true
});
gulp.task({
	name: 'code-init',
	desc: 'Prepares distribution.',
	func: gulp.series('code-clean', 'code-lint', 'code-format', 'code-babel', 'code-test'),
	man: true
});
gulp.task({
	name: 'server-run',
	desc: 'Runs the server.',
	func: ga.runServer
});
gulp.task({
	name: 'server-deploy',
	desc: 'Prepares distribution, starts the server and watches for changes.',
	func: gulp.series('code-init', 'server-run', 'code-watch')
});
gulp.task({
	name: 'dev',
	desc: 'Run development mode.',
	func: gulp.series('server-deploy'),
	man: true
});

//	DEFAULT - Run manpage

gulp.task({
	name: 'default',
	man: {
		name: 'gulpfile.babel.js'
	}
});