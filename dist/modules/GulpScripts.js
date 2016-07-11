'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.init = init;
exports.lint = lint;
exports.format = format;
exports.babel = babel;
exports.clean = clean;
exports.watch = watch;
exports.serverStart = serverStart;
exports.serverRestart = serverRestart;
exports.git = git;

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

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _streamCombiner = require('stream-combiner2');

var _streamCombiner2 = _interopRequireDefault(_streamCombiner);

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

// IMPORTS

let server;
let ini;
let watcher;

//  EXPORT FUNCTIONS

function init() {
    if (ini === undefined) {
        ini = global.app.ini;
    }
}

function lint(done) {
    let file = arguments.length <= 1 || arguments[1] === undefined ? ini.paths.src : arguments[1];


    let settings = {
        base: './',
        passthrough: true
    };

    if (file == ini.paths.src) {
        settings.passthrough = false;
    }

    console.log('lint', settings);

    return _gulp2.default.src(file, settings).pipe((0, _gulpDebug2.default)({
        title: ' - eslint:'
    })).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format()).pipe(_gulpEslint2.default.failOnError());
    //.end(() => {
    //console.log('endLint');
    //    done();
    // });
};

function format(done) {
    let file = arguments.length <= 1 || arguments[1] === undefined ? ini.paths.src : arguments[1];


    let settings = {
        base: './',
        passthrough: true
    };

    if (file == ini.paths.src) {
        settings.passthrough = false;
    }

    console.log('format', settings);

    return _gulp2.default.src(file, settings).pipe((0, _gulpDebug2.default)({
        title: ' - jsBeautifier:'
    })).pipe((0, _gulpJsbeautifier2.default)(ini.gulp.format.js)).pipe(_gulp2.default.dest('./'));
    //.end(() => {
    //console.log('endFormat');
    //    done();
    //});
};

function babel(done) {
    let file = arguments.length <= 1 || arguments[1] === undefined ? ini.paths.src : arguments[1];


    let settings = {
        passthrough: true
    };

    if (file == ini.paths.src) {
        settings.passthrough = false;
    }

    console.log('format', settings);

    return _gulp2.default.src(file, settings).pipe((0, _gulpDebug2.default)({
        title: ' - babel:'
    })).pipe((0, _gulpBabel2.default)()).pipe(_gulp2.default.dest('./dist'));
    //.end(() => {
    //console.log('endBabel');
    //     done();
    // });
};

function clean(done) {
    return _gulp2.default.src(ini.paths.dist).pipe((0, _gulpDebug2.default)({
        title: ' - clean:'
    })).pipe((0, _gulpClean2.default)({
        force: true,
        read: false
    }));
};

function watch(done) {
    watcher = _chokidar2.default.watch(ini.paths.src);

    watcher.on('ready', () => {
        global.app.log({
            origin: 'gulp.watch',
            msg: ['event:ready', 'Ready for changes.']
        });
    }).on('add', file => {
        global.app.log({
            origin: 'gulp.watch',
            msg: ['event:add', file]
        });
    }).on('change', file => {

        global.app.log({
            origin: 'gulp.watch',
            msg: ['event:change', file]
        });

        (0, _streamCombiner2.default)(lint(done, file), format(done, file), babel(done, file));

        /* new Promise((pass, fail) => {
                lint(() => {
                    //console.log(2);
                    pass();
                }, file);
                console.log(1);
            })
            .then((value) => {
                console.log(3);
                return new Promise((pass, fail) => {
                    format(() => {
                        //console.log(5);
                        pass();
                    }, file);
                    console.log(4);
                })
            })
            .then((value) => {
                console.log(6);
                return new Promise((pass, fail) => {
                    babel(() => {
                        //console.log(8);
                        pass();
                    }, file);
                    console.log(7);
                })
            })
             .then((value) => {
                serverRestart(()=>{
                    console.log('server');
                });
            });
        */

        /*.then((value) => {
                    console.log(3);
                    //format(done, file);
                })
                .then((value) => {
                    console.log(4);
                // watcher.add(file);
                })*/

        /*.then((value) => {
            console.log(5);
             //serverRestart(done)
        });*/
    }).on('unlink', event => {
        global.app.log({
            origin: 'gulp.watch',
            msg: ['event:unlink', event]
        });
    }).on('error', error => {
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

function serverStart(done) {
    server = _gulpLiveServer2.default.new(_path2.default.join(global.app.root, ini.paths.entry));
    server.start();
    done();
};

function serverRestart(done) {
    server.start.bind(server)();
    return _gulp2.default.src('.');
};

function git(err) {
    if (err) {
        throw err;
    }
};