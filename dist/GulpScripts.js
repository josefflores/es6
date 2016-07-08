'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.lintFunc = lintFunc;
exports.formatFunc = formatFunc;
exports.watchFunc = watchFunc;
exports.babelFunc = babelFunc;
exports.cleanFunc = cleanFunc;
exports.serverStart = serverStart;
exports.serverRestart = serverRestart;
exports.git = git;
exports.exec = exec;

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _gulpClean = require('gulp-clean');

var _gulpClean2 = _interopRequireDefault(_gulpClean);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpLiveServer = require('gulp-live-server');

var _gulpLiveServer2 = _interopRequireDefault(_gulpLiveServer);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _gulpJsbeautifier = require('gulp-jsbeautifier');

var _gulpJsbeautifier2 = _interopRequireDefault(_gulpJsbeautifier);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

/**
 *  This holds the scripts for Gulp.
 *
 *  @name   Gulp-Scripts.js
 */

//  IMPORTS

let server;
let ini;

//  EXPORT FUNCTIONS

function init() {
    if (ini === undefined) {
        ini = global.app.ini;
    }
}

function lintFunc(done) {
    let file = arguments.length <= 1 || arguments[1] === undefined ? ini.paths.src : arguments[1];

    return _gulp2.default.src(file).pipe((0, _gulpDebug2.default)({
        title: ' - eslint:'
    })).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failOnError());
};

function formatFunc(done) {
    let file = arguments.length <= 1 || arguments[1] === undefined ? ini.paths.src : arguments[1];

    return _gulp2.default.src(file, {
        base: './'
    }).pipe((0, _gulpDebug2.default)({
        title: ' - jsBeautifier:'
    })).pipe((0, _gulpJsbeautifier2.default)(ini.gulp.format.js)).pipe(_gulp2.default.dest('./'));
};

function watchFunc(done) {
    return _gulp2.default.watch(ini.paths.src).on('change', file => {
        lintFunc(done, file);
        formatFunc(done, file);
        babelFunc(done, file);
        serverRestart(done);
    });
};

function babelFunc(done) {
    let file = arguments.length <= 1 || arguments[1] === undefined ? ini.paths.src : arguments[1];

    return _gulp2.default.src(file).pipe((0, _gulpDebug2.default)({
        title: ' - babel:'
    })).pipe((0, _gulpBabel2.default)()).pipe(_gulp2.default.dest('./dist'));
};

function cleanFunc(done) {
    return _gulp2.default.src(ini.paths.dist).pipe((0, _gulpDebug2.default)({
        title: ' - clean:'
    })).pipe((0, _gulpClean2.default)({
        force: true
    }));
};

function serverStart(done) {
    server = _gulpLiveServer2.default.new(_path2.default.join(global.app.root, ini.paths.entry));
    server.start();
    done();
};

function serverRestart(done) {
    server.start.bind(server)();
    done();
};

/**
 *  Processes a gulp-git error
 *
 *  @method   ErrorGulp.git
 *
 *  @param  {Object}    err     The error being handled
 *  @throw  {Object}    err     The error being handled
 */
function git(err) {
    if (err) {
        throw err;
    }
};

/**
 *  Handles errors for gulp-exec.
 *
 *  @method   ErrorGulp.exec
 *
 *  @param  {Object}    err         The error being handled
 *  @param  {Stream}    stdout      stdout stream
 *  @param  {Stream}    stderr      stderr stream
 *  @param  {Function}  done        Callback function
 */
function exec(err, stdout, stderr, done) {
    !stdout || console.log(stdout);
    !stderr || console.log(stderr);
    done(err);
};