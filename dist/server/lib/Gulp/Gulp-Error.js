"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *  This holds the error handlers for Gulp.
 *
 *  @name   Gulp-Error.js
 */

/**
 *  This class holds all the error haandlers for Gulp.
 *
 *  @class  GulpError
 */
class GulpError {
    constructor() {}

    /**
     *  Processes a gulp-git error
     *
     *  @method   ErrorGulp.git
     *
     *  @param  {Object}    err     The error being handled
     *  @throw  {Object}    err     The error being handled
     */
    git(err) {
        if (err) {
            throw err;
        }
    }

    /**
     *  Handles errors for gulp-exec.
     *
     *  @method   ErrorGulp.exec
     *
     *  @param  {Function}  cb          Callback function
     *  @param  {Object}    err         The error being handled
     *  @param  {Stream}    stdout      stdout stream
     *  @param  {Stream}    stderr      stderr stream
     */
    exec(cb, err, stdout, stderr) {
        if (stdout) {
            console.log(stdout);
        }
        if (stderr) {
            console.log(stderr);
        }
        cb(err);
    }

}
exports.default = GulpError;