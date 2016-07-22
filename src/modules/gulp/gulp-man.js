/**
 *  This holds the manpage generator. It is composed of an exported function that
 *  wraps the gulp.task method through the GulpMan class.
 *
 *  @name   gulp-man.js
 */

// 	IMPORTS

import chalk from 'chalk';

//  LOCAL IMPORTS

import pJson from '../../../package.json';

/**
 * 	Generates a man page for gulp tasks, by intercepting the gulp.task requests.
 *
 * 	@class GulpMan
 */

// 	PRIVATE
let _private = new WeakMap();

class GulpMan {
    /**
     * 	Sets up the options and intializes the class.
     *
     * 	@method constructor
     * 	@param	task {Function}	The gulp.task function
     * 	@param	opt.tab			{Number} 	The spacing string, default: 4 spaces.
     * 	@param	opt.styleTitle 	{String} 	The topic title style, default: cyan,
     * 										any style accepted by chalk
     * 	@param	opt.styleTask 	{String} 	The topic title style, default: bold,
     * 										any style accepted by chalk
     */
    constructor(task, opt = {}) {
        //	optional values
        let settings = global.app.setOpts({
            StyleTask: 'bold',
            styleTitle: 'cyan',
            tab: 4
        }, opt);

        //	Required value check
        settings.task = global.app.reqOpt({
            constructor: this.constructor.name,
            error: 'gulp.task function required.',
            variable: task
        });

        //	system values
        settings.info = {};
        settings.missing = [];
        settings.msg = [];
        settings.obj = [];
        settings.t = ' '.repeat(settings.tab);

        //  Set private variable
        _private.set(this, settings);
    }

    /**
     *  Setter for the manpage information object.
     *
     *  @method set info
     *  @param  info.name   {String}    The name of the gulp file
     *  @param  info.usage  {String}    The usage instructions.
     *  @param  info.desc   {String}    Description of the files purpose
     *  @param  info.bugs   {String}    The bugs section content.
     *  @param  info.also   {String}    The also section content.
     *  @param  info.title  {String}    The title of the application.
     *  @param  info.copy   {String}    The copyright information.
     *  @param  info.auth   {String}    The authors information.
     *  @param  info.debug  {Boolean}   If debug information is displayed.
     */
    set info(info) {
        //  Get private variables
        let _priv = _private.get(this);

        _priv.info = info;
    }

    /**
     *  Add a task object for manpage display.
     *
     *  @method add
     *  @param  obj         {Object}    The task object to add.
     */
    add(obj) {
        //  Get private variables
        let _priv = _private.get(this);

        _priv.obj.push(obj);
    }

    /**
     *  The gulp.task replacement function.
     *
     *  @method task
     *  @param  name        {String}    The task name.
     *  @param  func        {Function}  The task function.
     *  @return             {Function}  The gulp.task return value
     */
    task(name, func) {
        //  Get private variables
        let _priv = _private.get(this);

        return func ?
            _priv.task(name, func) :
            _priv.task(name);
    }

    /**
     *  Print the menu
     *
     *  @method menu
     *  @param  done        {Function}  Callback for stream return.
     */
    menu(done) {
        //  Get private variables
        let _priv = _private.get(this);

        /**
         *  Prints a section of the manpage.
         *
         *  @function printSection
         *  @param  label       {String}    The section label.
         *  @param  prop        {String}    The property stored in this.info to display.
         */
        function printSection(label, prop) {
            //  VARIABLES
            let item = _priv.menuSettings;
            let t = _priv.t;
            let title = chalk[_priv.styleTitle](`${label.toUpperCase()}`);

            //  Generate section string
            if (prop == 'title' && item[prop]) {
                _priv.msg.push(`\n${t}${item[prop].toUpperCase()}(${pJson.version})${t.repeat(2)}${label}\n`);
            } else if (item[prop]) {
                _priv.msg.push(`\n${t}${title}\n${t.repeat(2)}${item[prop]}\n`);
            } else if (typeof (prop) === 'undefined') {
                _priv.msg.push(`\n${t}${title}`);
            } else {
                _priv.missing.push(prop);
            }
        };

        /**
         *  Prints the tasks.
         *
         *  @mfunction printTasks
         *  @param  obj         {String}    The section label.
         *  @param  prop        {String}    The property stored in this.info to display.
         */
        function printTasks(obj) {
            //  VARIABLES
            let t = _priv.t;

            //  Generate tak list
            if (obj) {
                printSection('OPTIONS');
                //  Sort but have default first
                obj.sort((a, b) => {
                        if (a.name == 'default')
                            return -1;
                        if (b.name == 'default' || a.name > b.name)
                            return 1;
                        if (a.name < b.name)
                            return -1;
                        return 0;
                    })
                    //  Add sorted tasks
                    .forEach((o) => {
                        let title = chalk[_priv.StyleTask](`${o.name}`);
                        _priv.msg.push(`\n${t.repeat(2)}${title}\n${t.repeat(3)}${o.desc}\n`);
                    });
            }
        };

        //  Determine components from this.info and package.json
        _priv.menuSettings = global.app.setOpts({
                name: 'gulpfile',
                usage: `gulp ${chalk['bold']('[OPTIONS]')}`,
                desc: 'A Gulp task runner.',
                bugs: pJson.bugs,
                also: pJson.homepage,
                title: pJson.name,
                copy: pJson.license,
                auth: pJson.author,
                debug: false
            },
            _priv.info);

        //  Generate menu
        printSection('User Commands', 'title');
        printSection('NAME', 'name');
        printSection('SYNOPSIS', 'usage');
        printSection('DESCRIPTION', 'desc');

        printTasks(_priv.obj);

        printSection('AUTHOR', 'auth');
        printSection('REPORTING BUGS', 'bugs');
        printSection('COPYRIGHT', 'copy');
        printSection('SEE ALSO', 'also');

        //  Add Errpr section
        if (_priv.menuSettings.debug && _priv.missing.length) {
            _priv.menuSettings.error = _priv.missing;
            printSection('ERROR', 'error');
        }

        //  Print Menu
        console.log(_priv.msg.join(''));

        //  Callback to signal end
        if (done) {
            done();
        }
    };
};

//	EXPORTS

/**
 * 	Wraps the gulp task and connects it the GulpMan class.
 *
 * 	@function   gulpTaskWrapper
 * 	@param 	gulp 	{Object} 	The gulp task runner object.
 *  @param  options {object}    The GulpMan options
 * 	@return			{Function}	the gulp.task registered function.
 */
export default function gulpTaskWrapper(gulp, options = {}) {
    //	Required value check that gulp exists
    gulp = global.app.reqOpt({
        variable: gulp,
        constructor: 'gulpTaskWrapper',
        error: 'gulp.task function required.'
    });

    //	Set up manual generator
    let gulpMan = new GulpMan(gulp.task, options);

    //	Return the Processing function for the manual
    return (option) => {
        if (option.name === 'default') {
            gulpMan.info = option.man || {};
            option.desc = option.desc || 'Displays man page.'
            option.func = (done) => {
                gulpMan.menu(done);
            };
        }

        //  Convert to the Gulp Way
        if (option.name) {
            option.func.displayName = option.name;
        }
        if (option.desc) {
            option.func.description = option.desc;
            //  Store for help if a description is given
            if (option.man === true ||
                option.name === 'default') {
                gulpMan.add(option);
            }
        }

        //  Return original for identical behavior
        return gulpMan.task(option.name, option.func);
    }
};