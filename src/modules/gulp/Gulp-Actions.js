/**
 *  This holds the task scripts for Gulp.
 *
 *  @name   Gulp-Actions.js
 */

//  IMPORTS

import gulp from 'gulp';
import gClean from 'gulp-clean';
import gBabel from 'gulp-babel';
import gDebug from 'gulp-debug';
import gEslint from 'gulp-eslint';
import chokidar from 'chokidar';
import gJsBeautifier from 'gulp-jsbeautifier';

import Server from './Gulp-LiveServer';
import Monitor from './Gulp-Monitor';
import * as gu from './Gulp-Util';

//  EXPORTS

export let server = new Server();

export function lint(done, src = global.app.ini.paths.src) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults)
        .pipe(gDebug({
            title: ' - Lint:'
        }))
        .pipe(gEslint())
        .pipe(gEslint.format())
        .pipe(gEslint.failOnError())
        .pipe(gu.sigEnd(done));
};

export function format(done, src = global.app.ini.paths.src) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults)
        .pipe(gDebug({
            title: ' - Format:'
        }))
        .pipe(gJsBeautifier(ini.gulp.format.js))
        .pipe(gulp.dest('./'))
        .pipe(gu.sigEnd(done));
};

export function babel(done, src = global.app.ini.paths.src) {
    return gulp.src(src, {
            passthrough: false,
            cwd: './src'
        })
        .pipe(gDebug({
            title: ' - Convert:'
        }))
        .pipe(gBabel())
        .pipe(gulp.dest(path.join(global.app.root, 'dist')))
        .pipe(gu.sigEnd(done));
};

export function clean(done, src = global.app.ini.paths.distFiles) {
    let ini = global.app.ini;
    return gulp.src(src, ini.gulp.defaults)
        .pipe(gDebug({
            title: ' - clean:'
        }))
        .pipe(gClean({
            force: true,
            read: false
        }))
        .pipe(gu.sigEnd(done));;
};

export function watch(done) {
    let ini = global.app.ini;
    let monitor = new Monitor(ini.paths.src, {
        cwd: '.',
        ignoreInitial: true,
        awaitWriteFinish: {
            stabilityThreshold: 100,
            pollInterval: 100
        }
    });

    return monitor
        .on('ready', () => {
            global.app.log({
                origin: 'gulp.watch',
                msg: ['event:ready', 'Ready for changes.']
            });
        })
        .on('add', (file) => {
            global.app.log({
                origin: 'gulp.watch',
                msg: ['event:add', file]
            });

            function addFile(file) {
                return gulp.series(
                    function processFileLint(end) {
                        lint(end, file);
                    },
                    function processFileUnwatch(end) {
                        monitor.unwatch(end, file);
                    },
                    function processFileFormat(end) {
                        format(end, file);
                    },
                    function processFileWatch(end) {
                        monitor.watch(end, file);
                    },
                    function processFileBabel(end) {
                        console.log(file);
                        babel(end, file);
                    },
                    function processFileServerRestart(end) {
                        server.restart(end);
                    }
                );
            };
            addFile(file)();
        })
        .on('change', (file) => {
            global.app.log({
                origin: 'gulp.watch',
                msg: ['event:change', file]
            });

            function processFile(file) {
                return gulp.series(
                    function processFileLint(end) {
                        lint(end, file);
                    },
                    function processFileUnwatch(end) {
                        monitor.unwatch(end, file);
                    },
                    function processFileFormat(end) {
                        format(end, file);
                    },
                    function processFileWatch(end) {
                        monitor.watch(end, file);
                    },
                    function processFileBabel(end) {
                        babel(end, file);
                    },
                    function processFileServerRestart(end) {
                        server.restart(end);
                    }
                );
            };
            processFile(file)();
        })
        .on('unlink', (file) => {
            global.app.log({
                origin: 'gulp.watch',
                msg: ['event:unlink', file]
            });

            function cleanFile(file) {
                console.log(file);
                return gulp.series(
                    function deleteFile(end) {
                        clean(end, file);
                    }
                );
            };

            cleanFile(file.replace('src', 'dist'))();
        })
        .on('error', (error) => {
            global.app.err({
                origin: 'gulp.watch',
                msg: [error]
            });
        });
};

export function git(err) {
    if (err) {
        throw err;
    }
};