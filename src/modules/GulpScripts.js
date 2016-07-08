/**
 *  This holds the scripts for Gulp.
 *
 *  @name   Gulp-Scripts.js
 */

// IMPORTS

import gulp from 'gulp';
import clean from 'gulp-clean';
import babel from 'gulp-babel';
import gls from 'gulp-live-server';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import path from 'path';
import jsBeautifier from 'gulp-jsbeautifier';

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

//  EXPORT FUNCTIONS

export function init() {
    if (ini === undefined) {
        ini = global.app.ini;
    }
}

export function lintFunc(done, file = ini.paths.src) {
    return gulp.src(file)
        .pipe(debug({
            title: ' - eslint:'
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
};

export function formatFunc(done, file = ini.paths.src) {
    return gulp.src(file, {
            base: './'
        })
        .pipe(debug({
            title: ' - jsBeautifier:'
        }))
        .pipe(jsBeautifier(ini.gulp.format.js))
        .pipe(gulp.dest('./'));
};

export function babelFunc(done, file = ini.paths.src) {
    return gulp.src(file)
        .pipe(debug({
            title: ' - babel:'
        }))
        .pipe(babel())
        .pipe(gulp.dest('./dist'));
};

export function cleanFunc(done) {
    return gulp.src(ini.paths.dist)
        .pipe(debug({
            title: ' - clean:'
        }))
        .pipe(clean({
            force: true
        }));
};

export function watchFunc(done) {
    return gulp.watch(ini.paths.src)
        .on('change', file => {
            lintFunc(done, file);
            formatFunc(done, file);
            babelFunc(done, file);
            serverRestart(done);
        });
};

export function serverStart(done) {
    server = gls.new(path.join(global.app.root, ini.paths.entry));
    server.start();
    done();
};

export function serverRestart(done) {
    server.start.bind(server)();
    done();
};

export function git(err) {
    if (err) {
        throw err;
    }
};

export function exec(err, stdout, stderr, done) {
    !stdout || console.log(err);
    !stderr || console.log(err);
    done(err);
};