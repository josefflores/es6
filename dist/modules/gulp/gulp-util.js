'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.sigEnd = sigEnd;
exports.actionMsg = actionMsg;
exports.debug = debug;

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _through = require('through2');

var _through2 = _interopRequireDefault(_through);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//	EXPORTS

/**
 *  Creates a stream end signifier for terminating gulp pipe.
 *
 *  @function sigEnd
 *  @param  func    {Function}  The callback function to run.
 *  @return         {Stream}    An action message pipe stream.
 */
/**
 *  This holds the utility scripts for Gulp.
 *
 *  @name   gulp-util.js
 */

// IMPORTS

function sigEnd(done) {
    return _through2.default.obj((chunk, enc, cb) => {
        cb(null, chunk);
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
function actionMsg(done, src, title) {
    let options = arguments.length <= 3 || arguments[3] === undefined ? {} : arguments[3];

    return _gulp2.default.src(src, options).pipe(debug(title)).pipe(sigEnd(done));
}

/**
 *  A debug wrapper for gulp-debug to be used in pipe.
 *
 *  @function debug
 *  @param  title   {String}    The title of the message
 *  @return         {Stream}    The stream.
 */
function debug(title) {
    let ini = global.app.ini;

    let settings = global.app.setOpts({
        title: 'gulp-debug:',
        minimal: ini.gulp.defaults.debugMinimal
    }, {
        title: title
    });

    return (0, _gulpDebug2.default)(settings);
}