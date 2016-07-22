'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.runServer = runServer;
exports.lint = lint;
exports.format = format;
exports.babel = babel;
exports.clean = clean;
exports.test = test;
exports.watch = watch;

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpClean = require('gulp-clean');

var _gulpClean2 = _interopRequireDefault(_gulpClean);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

var _gulpJsbeautifier = require('gulp-jsbeautifier');

var _gulpJsbeautifier2 = _interopRequireDefault(_gulpJsbeautifier);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpMocha = require('gulp-mocha');

var _gulpMocha2 = _interopRequireDefault(_gulpMocha);

var _gulpLiveServer = require('./gulp-live-server');

var _gulpLiveServer2 = _interopRequireDefault(_gulpLiveServer);

var _gulpMonitor = require('./gulp-monitor');

var _gulpMonitor2 = _interopRequireDefault(_gulpMonitor);

var _gulpUtil = require('./gulp-util');

var gu = _interopRequireWildcard(_gulpUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  VARIABLES

let server = new _gulpLiveServer2.default(); //  An instance of the gulp-live-server

//  EXPORTS

/**
 *  Starts/ restarts the server.
 *
 *  @function runServer
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @return         {Stream}    A server start stream.
 */

//  LOCAL IMPORTS

/**
 *  This holds the task scripts for Gulp that are callad by the gulpfile.
 *
 *  @name   gulp-actions.js
 */

//  IMPORTS

function runServer(done) {
    return server.run(done);
}

/**
 *  Lints the given files.
 *
 *  @function lint
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A linting stream.
 */
function lint(done) {
    let src = arguments.length <= 1 || arguments[1] === undefined ? global.app.ini.paths.src : arguments[1];

    let ini = global.app.ini;
    return _gulp2.default.src(src, ini.gulp.defaults.gulpSrc).pipe(gu.debug(' - Lint:')).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failOnError()).pipe(gu.sigEnd(done));
};

/**
 *  Formats the given files.
 *
 *  @function format
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A formating stream.
 */
function format(done) {
    let src = arguments.length <= 1 || arguments[1] === undefined ? global.app.ini.paths.src : arguments[1];

    let ini = global.app.ini;
    return _gulp2.default.src(src, ini.gulp.defaults.gulpSrc).pipe(gu.debug(' - Format:')).pipe((0, _gulpJsbeautifier2.default)(ini.gulp.format.js)).pipe(_gulp2.default.dest('./')).pipe(gu.sigEnd(done));
};

/**
 *  Transposes ES6 src to ES5 dist for the given files.
 *
 *  @function babel
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A transposing stream.
 */
function babel(done) {
    let src = arguments.length <= 1 || arguments[1] === undefined ? global.app.ini.paths.src : arguments[1];

    let ini = global.app.ini;
    return _gulp2.default.src(src, ini.gulp.defaults.babelSrc).pipe(gu.debug(' - Convert:')).pipe((0, _gulpBabel2.default)()).pipe(_gulp2.default.dest('./dist')).pipe(gu.sigEnd(done));
};

/**
 *  Cleans the given files.
 *
 *  @function clean
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A cleaning stream.
 */
function clean(done) {
    let src = arguments.length <= 1 || arguments[1] === undefined ? global.app.ini.paths.distFiles : arguments[1];

    let ini = global.app.ini;
    return _gulp2.default.src(src, ini.gulp.defaults.gulpSrc).pipe(gu.debug(' - clean:')).pipe((0, _gulpClean2.default)(ini.gulp.defaults.clean)).pipe(gu.sigEnd(done));
};

function test(done) {
    let src = arguments.length <= 1 || arguments[1] === undefined ? global.app.ini.paths.tests : arguments[1];

    let ini = global.app.ini;
    return _gulp2.default.src(src, ini.gulp.defaults.gulpSrc).pipe(gu.debug(' - test:')).pipe((0, _gulpMocha2.default)({
        //reporter: 'nyan'
    })).pipe(gu.sigEnd(done));
};
/**
 *  Watches the given files, sets up handling for file events.
 *
 *  @function watch
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A cleaning stream.
 */
function watch(done) {
    let src = arguments.length <= 1 || arguments[1] === undefined ? global.app.ini.paths.src : arguments[1];

    let ini = global.app.ini;
    let origin = `${ __filename } - watch`;
    let monitor = new _gulpMonitor2.default(src, ini.gulp.defaults.monitorSrc);

    /**
     *  Creates a gulp.series to be executed on change or additions of src files.
     *
     *  @function processSrcFile
     *  @param  options.file    {Globs}         The gulp.src src parameter.
     *  @param  options.monitor {GulpMonitor}   The monitor in use.
     *  @return     {Function}  The gulp.series function that holds all the steps.
     */
    function processFile(options) {
        return _gulp2.default.series(function fileLint(end) {
            lint(end, options.file);
        }, function fileUnwatch(end) {
            options.monitor.unwatch(end, options.file);
        }, function fileFormat(end) {
            format(end, options.file);
        }, function fileWatch(end) {
            options.monitor.watch(end, options.file);
        }, function fileBabel(end) {
            babel(end, options.file);
        }, function fileTest(end) {
            test(end, options.file);
        }, runServer);
    };

    /**
     *  Creates a gulp.series to be executed on deletion of src files.
     *
     *  @function cleanDistFile
     *  @param  options.file    {Globs}         The gulp.src src parameter.
     *  @param  options.monitor {GulpMonitor}   The monitor in use.
     *  @return     {Function}  The gulp.series function that holds all the steps.
     */
    function cleanDistFile(options) {
        return _gulp2.default.series(function deleteDistFile(end) {
            clean(end, options.file);
        }, runServer);
    };

    return monitor.on('ready', () => {
        global.app.log({
            origin: origin,
            msg: ['event:ready', 'Ready for changes.']
        });
    }).on('add', file => {
        global.app.log({
            origin: origin,
            msg: ['event:add', file]
        });

        processSrcFile({
            file: file,
            monitor: monitor
        })();
    }).on('change', file => {
        global.app.log({
            origin: origin,
            msg: ['event:change', file]
        });

        processSrcFile({
            file: file,
            monitor: monitor
        })();
    }).on('unlink', file => {
        global.app.log({
            origin: origin,
            msg: ['event:unlink', file]
        });

        cleanDistFile({
            file: file.replace('src', 'dist')
        })();
    }).on('error', error => {
        global.app.err({
            origin: origin,
            msg: [error]
        });
    });
};