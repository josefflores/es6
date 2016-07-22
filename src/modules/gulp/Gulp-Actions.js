/**
 *  This holds the task scripts for Gulp that are callad by the gulpfile.
 *
 *  @name   gulp-actions.js
 */

//  IMPORTS

import chokidar from 'chokidar';
import gulp from 'gulp';
import gulpBabel from 'gulp-babel';
import gulpClean from 'gulp-clean';
import gulpEslint from 'gulp-eslint';
import gulpJsBeautifier from 'gulp-jsbeautifier';
import path from 'path';
import mocha from 'gulp-mocha';
//  LOCAL IMPORTS

import GulpLiveServer from './gulp-live-server';
import GulpMonitor from './gulp-monitor';
import * as gu from './gulp-util';

//  VARIABLES

let server = new GulpLiveServer(); //  An instance of the gulp-live-server

//  EXPORTS

/**
 *  Starts/ restarts the server.
 *
 *  @function runServer
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @return         {Stream}    A server start stream.
 */
export function runServer(done) {
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
export function lint(done, src = global.app.ini.paths.src) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults.gulpSrc)
        .pipe(gu.debug(' - Lint:'))
        .pipe(gulpEslint())
        .pipe(gulpEslint.format())
        .pipe(gulpEslint.failOnError())
        .pipe(gu.sigEnd(done));
};

/**
 *  Formats the given files.
 *
 *  @function format
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A formating stream.
 */
export function format(done, src = global.app.ini.paths.src) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults.gulpSrc)
        .pipe(gu.debug(' - Format:'))
        .pipe(gulpJsBeautifier(ini.gulp.format.js))
        .pipe(gulp.dest('./'))
        .pipe(gu.sigEnd(done));
};

/**
 *  Transposes ES6 src to ES5 dist for the given files.
 *
 *  @function babel
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A transposing stream.
 */
export function babel(done, src = global.app.ini.paths.src) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults.babelSrc)
        .pipe(gu.debug(' - Convert:'))
        .pipe(gulpBabel())
        .pipe(gulp.dest('./dist'))
        .pipe(gu.sigEnd(done));
};

/**
 *  Cleans the given files.
 *
 *  @function clean
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A cleaning stream.
 */
export function clean(done, src = global.app.ini.paths.distFiles) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults.gulpSrc)
        .pipe(gu.debug(' - clean:'))
        .pipe(gulpClean(ini.gulp.defaults.clean))
        .pipe(gu.sigEnd(done));
};

export function test(done, src = global.app.ini.paths.tests) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults.gulpSrc)
        .pipe(gu.debug(' - test:'))
        .pipe(mocha({
            //reporter: 'nyan'
        }))
        .pipe(gu.sigEnd(done));
};
/**
 *  Watches the given files, sets up handling for file events.
 *
 *  @function watch
 *  @param  done    {Function}  The function to run to signify pipe completion.
 *  @param  src     {Globs}     The gulp.src src parameter.
 *  @return         {Stream}    A cleaning stream.
 */
export function watch(done, src = global.app.ini.paths.src) {
    let ini = global.app.ini;
    let origin = `${__filename} - watch`;
    let monitor = new GulpMonitor(src, ini.gulp.defaults.monitorSrc);

    /**
     *  Creates a gulp.series to be executed on change or additions of src files.
     *
     *  @function processSrcFile
     *  @param  options.file    {Globs}         The gulp.src src parameter.
     *  @param  options.monitor {GulpMonitor}   The monitor in use.
     *  @return     {Function}  The gulp.series function that holds all the steps.
     */
    function processFile(options) {
        return gulp.series(
            function fileLint(end) {
                lint(end, options.file);
            },
            function fileUnwatch(end) {
                options.monitor.unwatch(end, options.file);
            },
            function fileFormat(end) {
                format(end, options.file);
            },
            function fileWatch(end) {
                options.monitor.watch(end, options.file);
            },
            function fileBabel(end) {
                babel(end, options.file);
            },
            function fileTest(end) {
                test(end, options.file);
            },
            runServer
        );
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
        return gulp.series(
            function deleteDistFile(end) {
                clean(end, options.file);
            },
            runServer
        );
    };

    return monitor
        .on('ready', () => {
            global.app.log({
                origin,
                msg: ['event:ready', 'Ready for changes.']
            });
        })
        .on('add', (file) => {
            global.app.log({
                origin,
                msg: ['event:add', file]
            });

            processSrcFile({
                file,
                monitor
            })();
        })
        .on('change', (file) => {
            global.app.log({
                origin,
                msg: ['event:change', file]
            });

            processSrcFile({
                file,
                monitor
            })();
        })
        .on('unlink', (file) => {
            global.app.log({
                origin,
                msg: ['event:unlink', file]
            });

            cleanDistFile({
                file: file.replace('src', 'dist')
            })();
        })
        .on('error', (error) => {
            global.app.err({
                origin,
                msg: [error]
            });
        });
};