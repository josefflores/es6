/**
 *  This holds the utility scripts for Gulp.
 *
 *  @name   gulp-util.js
 */

// IMPORTS

import chalk from 'chalk';
import gulp from 'gulp';
import gDebug from 'gulp-debug';
import through from 'through2';

//	EXPORTS

/**
 *  Creates a stream end signifier for terminating gulp pipe.
 *
 *  @function sigEnd
 *  @param  func    {Function}  The callback function to run.
 *  @return         {Stream}    An action message pipe stream.
 */
export function sigEnd(done) {
    return through.obj((chunk, enc, cb) => {
        cb(null, chunk)
    }, () => {
        done();
    });
}

/**
 *  Creates a stream end signifier for terminating gulp pipe.
 *
 *  @function actionMsg
 *  @param  done    {Function}  The callback function to run.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @param  title   {String}    The title of the debug message.
 *  @param  options {Object}    The gulp.src options object.
 *  @return         {Stream}    A debug message stream.
 */
export function actionMsg(done, src, title, options = {}) {
    return gulp.src(src, options)
        .pipe(debug(title))
        .pipe(sigEnd(done));
}

/**
 *  A debug wrapper for gulp-debug to be used in pipe.
 *
 *  @function debug
 *  @param  title   {String}    The title of the message
 *  @return         {Stream}    The stream.
 */
export function debug(title) {
    let ini = global.app.ini;

    let settings = global.app.setOpts({
        title: 'gulp-debug:',
        minimal: ini.gulp.defaults.debugMinimal
    }, {
        title
    });

    return gDebug(settings);
}