/**
 *  This holds the scripts for Gulp.
 *
 *  @name   Gulp-Scripts.js
 */

//  IMPORTS

import combiner from 'stream-combiner2';
import gulp from 'gulp';
import rimraf from 'rimraf';
import help from 'gulp-help-tasks-tree';
import babel from 'gulp-babel';
import shell from 'gulp-shell';
import watch from 'gulp-watch';
import server from 'gulp-live-server';
import flow from 'gulp-flowtype';
import react from 'gulp-react';
import sourceMaps from 'gulp-sourcemaps';
import debug from 'gulp-debug';
import eslint from 'gulp-eslint';
import {argv} from 'yargs';
import formatCss from 'gulp-cssbeautify';
import formatJs from 'gulp-jsbeautify';
import formatJson from 'gulp-json-format';
import git from 'gulp-git';
import gulpIgnore from 'gulp-ignore';
import lintCss from 'gulp-csslint';
import lintJade from 'gulp-jadelint';
import lintJs from 'gulp-jshint';
import lintJson from 'gulp-jsonlint';
import mkdirp from 'mkdirp';
import path from 'path';
import runSequence from 'run-sequence';
import yaml from 'yamljs';

//import rm from 'gulp-rm';
//import concat from 'gulp-concat';
//import markdox from 'gulp-markdox';
//import {exec} from 'child_process';
//import execFull from 'gulp-exec';
//import deleteLines from 'gulp-delete-lines';
//import indent from 'gulp-indent';
//import run from 'run-sequence';

//	VARIABLES

let express;
let ini;

//	FUNCTIONS
export function init(){
	if (ini === undefined){
		ini = global.app.ini;
	}
}

export function lintFunc(done, file = ini.path.src){
	return gulp.src(file)
		.pipe(debug({title: '\tlinter:'}))
		.pipe(eslint())
		.pipe(eslint.format());
};

export function	formatFunc(done, file = ini.path.src) {
	return gulp.src(file);
};

export function	watchFunc(done){
	return gulp.watch(ini.path.src)
		.on('change', (file) => {
			lintFunc(done, file);
			formatFunc(done, file);
			babelFunc(done, file);
		});
};

export function	babelFunc(done, file = ini.path.src) {
	return gulp.src(file)
		.pipe(debug({title: '\ttranspose:'}))
		.pipe(babel())
		.pipe(gulp.dest(ini.path.dist));
};

export function	cleanFunc(done){
	rimraf(ini.path.dist, done);
};

export function	helpFunc(){
	return gulp.src('gulpfile.babel.js')
		.pipe(help({
			tasks: gulp.tasks,
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