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
exports.helpFunc = helpFunc;

var _streamCombiner = require('stream-combiner2');

var _streamCombiner2 = _interopRequireDefault(_streamCombiner);

var _gulp = require('gulp');

var _gulp2 = _interopRequireDefault(_gulp);

var _rimraf = require('rimraf');

var _rimraf2 = _interopRequireDefault(_rimraf);

var _gulpHelpTasksTree = require('gulp-help-tasks-tree');

var _gulpHelpTasksTree2 = _interopRequireDefault(_gulpHelpTasksTree);

var _gulpBabel = require('gulp-babel');

var _gulpBabel2 = _interopRequireDefault(_gulpBabel);

var _gulpShell = require('gulp-shell');

var _gulpShell2 = _interopRequireDefault(_gulpShell);

var _gulpWatch = require('gulp-watch');

var _gulpWatch2 = _interopRequireDefault(_gulpWatch);

var _gulpLiveServer = require('gulp-live-server');

var _gulpLiveServer2 = _interopRequireDefault(_gulpLiveServer);

var _gulpFlowtype = require('gulp-flowtype');

var _gulpFlowtype2 = _interopRequireDefault(_gulpFlowtype);

var _gulpReact = require('gulp-react');

var _gulpReact2 = _interopRequireDefault(_gulpReact);

var _gulpSourcemaps = require('gulp-sourcemaps');

var _gulpSourcemaps2 = _interopRequireDefault(_gulpSourcemaps);

var _gulpDebug = require('gulp-debug');

var _gulpDebug2 = _interopRequireDefault(_gulpDebug);

var _gulpEslint = require('gulp-eslint');

var _gulpEslint2 = _interopRequireDefault(_gulpEslint);

var _yargs = require('yargs');

var _gulpCssbeautify = require('gulp-cssbeautify');

var _gulpCssbeautify2 = _interopRequireDefault(_gulpCssbeautify);

var _gulpJsbeautify = require('gulp-jsbeautify');

var _gulpJsbeautify2 = _interopRequireDefault(_gulpJsbeautify);

var _gulpJsonFormat = require('gulp-json-format');

var _gulpJsonFormat2 = _interopRequireDefault(_gulpJsonFormat);

var _gulpGit = require('gulp-git');

var _gulpGit2 = _interopRequireDefault(_gulpGit);

var _gulpIgnore = require('gulp-ignore');

var _gulpIgnore2 = _interopRequireDefault(_gulpIgnore);

var _gulpCsslint = require('gulp-csslint');

var _gulpCsslint2 = _interopRequireDefault(_gulpCsslint);

var _gulpJadelint = require('gulp-jadelint');

var _gulpJadelint2 = _interopRequireDefault(_gulpJadelint);

var _gulpJshint = require('gulp-jshint');

var _gulpJshint2 = _interopRequireDefault(_gulpJshint);

var _gulpJsonlint = require('gulp-jsonlint');

var _gulpJsonlint2 = _interopRequireDefault(_gulpJsonlint);

var _mkdirp = require('mkdirp');

var _mkdirp2 = _interopRequireDefault(_mkdirp);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _runSequence = require('run-sequence');

var _runSequence2 = _interopRequireDefault(_runSequence);

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//import rm from 'gulp-rm';
//import concat from 'gulp-concat';
//import markdox from 'gulp-markdox';
//import {exec} from 'child_process';
//import execFull from 'gulp-exec';
//import deleteLines from 'gulp-delete-lines';
//import indent from 'gulp-indent';
//import run from 'run-sequence';

//	VARIABLES

let express; /**
              *  This holds the scripts for Gulp.
              *
              *  @name   Gulp-Scripts.js
              */

//  IMPORTS

let ini;

//	FUNCTIONS
function init() {
  if (ini === undefined) {
    ini = global.app.ini;
  }
}

function lintFunc(done) {
  let file = arguments.length <= 1 || arguments[1] === undefined ? ini.path.src : arguments[1];

  return _gulp2.default.src(file).pipe((0, _gulpDebug2.default)({ title: '\tlinter:' })).pipe((0, _gulpEslint2.default)()).pipe(_gulpEslint2.default.format());
};

function formatFunc(done) {
  let file = arguments.length <= 1 || arguments[1] === undefined ? ini.path.src : arguments[1];

  return _gulp2.default.src(file);
};

function watchFunc(done) {
  return _gulp2.default.watch(ini.path.src).on('change', file => {
    lintFunc(done, file);
    formatFunc(done, file);
    babelFunc(done, file);
  });
};

function babelFunc(done) {
  let file = arguments.length <= 1 || arguments[1] === undefined ? ini.path.src : arguments[1];

  return _gulp2.default.src(file).pipe((0, _gulpDebug2.default)({ title: '\ttranspose:' })).pipe((0, _gulpBabel2.default)()).pipe(_gulp2.default.dest(ini.path.dist));
};

function cleanFunc(done) {
  (0, _rimraf2.default)(ini.path.dist, done);
};

function helpFunc() {
  return _gulp2.default.src('gulpfile.babel.js').pipe((0, _gulpHelpTasksTree2.default)({
    tasks: _gulp2.default.tasks,
    description: {
      'help': 'Display help and tasks tree'
    }
  }));
};

/**
 *  Removes given files
 *
 *  @method removeFiles
 *  @param {Array.String} src   An array of source file paths.
 *  @param {Object} srcOpt      An options object for gulp.src
 *  @return {Stream}            Gulp Stream
 *
removeFiles(src, srcOpt) {
    srcOpt = (srcOpt === undefined) ? null : srcOpt;
    return gulp.src(src, srcOpt)
        .pipe(rm());
}
 /**
 *  Merges given files in order given
 *
 *  @method   removeFiles
 *  @param {Array.String} src       An array of source file paths.
 *  @param {String} dirOut          The output directory
 *  @param {String} fileOut         The output file name
 *  @return {Stream}                Gulp Stream
 *
mergeFiles(src, dirOut, fileOut) {
    return combiner.obj([
        gulp.src(src),
        concat(fileOut),
        gulp.dest(dirOut)
    ]);
}
 /**
 *  Makes a single markdown file from an .ejs template
 *
 *  @method   outputToExample
 *  @param {Object} template        The .ejs template to use to create the .md file
 *  @param {String} dirOut          The output directory
 *  @param {String} fileOut         The output file name
 *  @param {Array.String | null | false} srcOverride       null: use stream src, false: no source, string: file to use
 *  @return {Stream}                Gulp Stream
 *
genSingleMarkdox(template, dirOut, fileOut, srcOverride) {
    let tasks = [
        markdox(template),
        concat(fileOut),
        gulp.dest(dirOut)
    ];
     if (srcOverride === false) {
        tasks.unshift(gulp.src('./app.js'));
    } else if (srcOverride !== null) {
        tasks.unshift(gulp.src(srcOverride));
    }
     return combiner.obj(tasks);
}
 /**
 *  Converts the output of a command to be used as an example in Markdown
 *
 *  @method   outputToExample
 *  @param {Array.String} command   The command to run.
 *  @param {Array.RegExp} filters   The regex filters for removing lines
 *  @param {String} dirOut          The output directory
 *  @param {String} fileOut         The output file name
 *  @return {Stream}                Gulp Stream
 *
outputToExample(command, filters, dirOut, fileOut) {
    return combiner.obj([
        gulp.src('./app.js'),
        execFull(command, {
            continueOnError: false,
            pipeStdout: true
        }),
        deleteLines(filters),
        indent({
            tabs: true,
            amount: 1
        }),
        concat(fileOut),
        gulp.dest(dirOut),
        execFull.reporter({
            err: true, // default = true, false means don't write err
            stderr: true, // default = true, false means don't write stderr
            stdout: false // default = true, false means don't write stdout
        })
    ]);
}
 /**
 *  Formats files
 *
 *  @method   codeFormat
 *  @param {Array.String} src       An array of source file paths.
 *  @param {Class} formatter        The formatter to use
 *  @param {Object} format          The options for the formatter
 *  @return {Stream}                Gulp Stream
 *
codeFormat(src, formatter, formatOpt) {
    return combiner.obj([
        gulp.src(src, ini.opt.inPlace),
        formatter(formatOpt),
        gulp.dest('./')
    ]);
}
 /**
 *  Checks syntax of a filetype
 *
 *  @method   codeLint
 *  @param {Array.String} src       An array of source file paths.
 *  @param {Class} linter           The linter to use
 *  @param {Object} linterOpt       Options object for the linter
 *  @param {Object} reporterState   If the reporter is in a seperate method
 *  @return {Stream}                Gulp Stream
 *
codeLint(src, linter, linterOpt, reporterState) {
    let tasks = [
        gulp.src(src),
        linter(linterOpt)
    ];
     if (reporterState) {
        tasks.push(linter.reporter());
        tasks.push(linter.reporter('fail'));
    }
     return combiner.obj(tasks);
}
*/