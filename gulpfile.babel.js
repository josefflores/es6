/**
 *  This file holds the gulp task scripts, it is the task runner.
 *
 *  @name   gulpfile.js
 */

//  Set up gloabal application and configuration


//	IMPORTS
import gulp from 'gulp';

import GApp from './src/modules/GlobalApp'
import * as gs from './src/modules/GulpScripts';

//	GLOBALS

global.app = new GApp('development', __dirname);
gs.init();

//	TASKS

gulp.task('code-watch', gs.watch);

gulp.task('code-babel',  gs.babel);
gulp.task('code-format', gs.format);
gulp.task('code-lint', gs.lint);
gulp.task('code-clean', gs.clean);
gulp.task('code-init', gulp.series('code-clean', 'code-lint', 'code-format', 'code-babel'));

gulp.task('server-start', gs.serverStart);
gulp.task('server-deploy', gulp.series('code-init', 'server-start', 'code-watch'));

gulp.task('default', gulp.series('server-deploy'));
/*gulp.task('help', gs.help);
/*gulp.task('watch', () => {
  	return nodemon({
		script: 'dist/app.js', // run ES5 code
        watch: 'src', // watch ES2015 code
        tasks: ['code-process'] // compile synchronously onChange
	})
});
//gulp.task('default', gulp.series('help'));*/
