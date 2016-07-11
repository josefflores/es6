/**
 *  This holds the scripts for Gulp.
 *
 *  @name   Gulp-Scripts.js
 */

// IMPORTS

import gulp from 'gulp';
import gClean from 'gulp-clean';
import gBabel from 'gulp-babel';
import gls from 'gulp-live-server';
import gDebug from 'gulp-debug';
import gEslint from 'gulp-eslint';
import path from 'path';
import gJsBeautifier from 'gulp-jsbeautifier';
import chokidar from 'chokidar';

//import yargs from 'yargs';
//import combiner from 'stream-combiner2';
//import shell from 'gulp-shell';
//import flow from 'gulp-flowtype';
//import react from 'gulp-react';
//import sourceMaps from 'gulp-sourcemaps';
//import formatCss from 'gulp-cssbeautify';
//import formatJs from 'gulp-jsbeautify';
//import formatJson from 'gulp-json-format';
//import git from 'gulp-git';
//import gulpIgnore from 'gulp-ignore';
//import lintCss from 'gulp-csslint';
//import lintJade from 'gulp-jadelint';
//import lintJs from 'gulp-jshint';
//import lintJson from 'gulp-jsonlint';
//import mkdirp from 'mkdirp';
//import runSequence from 'run-sequence';
//import yaml from 'yamljs';
//import rm from 'gulp-rm';
//import concat from 'gulp-concat';
//import markdox from 'gulp-markdox';
//import {exec} from 'child_process';
//import execFull from 'gulp-exec';
//import deleteLines from 'gulp-delete-lines';
//import indent from 'gulp-indent';
//import run from 'run-sequence';

//	VARIABLES

let server;
let ini;
let watcher;

//  EXPORT FUNCTIONS

export function init() {
    if (ini === undefined) {
        ini = global.app.ini;
    }
}

export function lint(done, file = ini.paths.src) {
    return gulp.src(file)
        .pipe(gDebug({
            title: ' - eslint:'
        }))
        .pipe(gEslint())
        .pipe(gEslint.format())
        .pipe(gEslint.failOnError());
};

export function format(done, file = ini.paths.src) {
    if (scanner) {
        watcher.pause('masterWatcher');
    }

    return gulp.src(file, {
        base: './'
    })

    .pipe(gDebug({
            title: ' - jsBeautifier:'
        }))
        .pipe(gJsBeautifier(ini.gulp.format.js))
        .pipe(gulp.dest('./'))
        .on('end', () => {
            if (scanner) {
                watcher.start('masterWatcher');
            }
        });
};

export function babel(done, file = ini.paths.src) {
    return gulp.src(file)
        .pipe(gDebug({
            title: ' - babel:'
        }))
        .pipe(gBabel())
        .pipe(gulp.dest('./dist'));
};

export function clean(done) {
    return gulp.src(ini.paths.dist)
        .pipe(gDebug({
            title: ' - clean:'
        }))
        .pipe(gClean({
            force: true,
            read: false
        }));
};

export function watch(done) {
    watcher = chokidar.watch(ini.paths.src);

    watcher
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
        })
        .on('change', (file) => {

            global.app.log({
                origin: 'gulp.watch',
                msg: ['event:change', file]
            });

            return gulp.src(file)
                .pipe(lint(done, file))
                .pipe(watcher.unwatch(file))
                .pipe(format(done, file))
                .pipe(watcher.add(file))
                .pipe(babel(done, file))
                .pipe(serverRestart(done));
        })
        .on('unlink', (event) => {
            global.app.log({
                origin: 'gulp.watch',
                msg: ['event:unlink', event]
            });
        })
        .on('error', (error) => {
            global.app.err({
                origin: 'gulp.watch',
                msg: [error]
            });
        });

    return watcher;
    /*.on('raw', (event, path, details) => {
        switch (event) {
        case 'rename':
            global.app.log({
                origin: 'rename',
                msg: [path, details]
            });
            break;
        default:
            console.log('Raw event info:', `"${event}"`, path, details);
        }
    });*/
};

export function serverStart(done) {
    server = gls.new(path.join(global.app.root, ini.paths.entry));
    server.start();
    done();
};

export function serverRestart(done) {
    server.start.bind(server)();
    return gulp.src('.');
};

export function git(err) {
    if (err) {
        throw err;
    }
};