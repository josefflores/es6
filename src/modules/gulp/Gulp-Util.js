/**
 *  This holds the utility scripts for Gulp.
 *
 *  @name   Gulp-Utilities.js
 */

// IMPORTS

import gulp from 'gulp';
import through from 'through2';
import gDebug from 'gulp-debug';

//	EXPORTS

export function sigEnd(done) {
    return through.obj(function (chunk, enc, cb) {
        cb(null, chunk)
    }, () => {
        done();
    });
}

export function actionMsg(done, src, title, options = {}) {
    return gulp.src(src, options)
        .pipe(gDebug({
            title
        }))
        .pipe(sigEnd(done));
}