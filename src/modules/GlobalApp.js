/**
 *  Holds the Global application obj, this object determines information about the
 *  running application and resolves which configuration file to use. It also
 *  creates logging function wrappers to help diferentiate message made by the
 * 	developers from those made by dependencies or the system. There are utility
 * 	functions as well to help with default objects.
 *
 *  @name   GlobalApplication.js
 */

//  IMPORTS

import path from 'path';
import chalk from 'chalk'; //  coloring for console label
import pJson from '../../package.json';

import iniDev from '../ini/development';
import iniProd from '../ini/production';

/**
 *  Ties in configurations and application reporting. It is to be imported in
 * 	the application entry point.
 *
 *  Examples:
 *
 *      import GApp from './path/to/GApp'
 * 		global.app = new GApp('development | production', __dirname);
 *      let ini = global.app.ini;
 *
 *  @class  GlobalApp
 *
 *  @param  mode 	{String}   	The ini (developement|production|gulp) file to use.
 *  @param  root 	{String}	The root directory path.
 */

//	PRIVATE VARIABLES
let _private = new WeakMap();

export default class GlobalApp {

    constructor(mode, root, debug = false) {

        _private.set(this, {
            mode,
            root: path.resolve(root),
            about: pJson.name + ' ' + pJson.version,
            debug
        });

        let origin = `${__filename} - ${this.constructor.name}`;
        let msg = ['Using ini:', mode];

        //  Output creation status and info
        this.log({
            origin,
            msg: ['Initializing.']
        });

        if (debug) {
            msg.push(this.ini);
        }
        this.log({
            origin,
            msg
        });

        this.log({
            origin,
            msg: ['Done.']
        });

    }

    /**
     *  Gets the configuration object
     *
     *  @method	get ini
     *  @return 				{string}	The configuration object
     */
    get ini() {
        let _priv = _private.get(this);

        switch (_priv.mode) {
        case 'development':
            return iniDev;
        case 'production':
            return iniProd;
        default:
            return undefined;
        }
    }

    /**
     *  Gets the document root path passed at creation
     *
     *  @method	get root
     *  @return 				{string}	The root path
     */
    get root() {
        let _priv = _private.get(this);

        return _priv.root;
    }

    /**
     * 	Is the master logging function, has all options exposed to make any type
     * 	of message with chalk capable colors. This will allow a user to deviate
     *  from the standard which is to be used sparingly if at all. Use the log
     * 	and err members which restrict input options.
     *
     * 	@method	masterLogger
     *
     * 	@param options.appColor 	 {string} 	The color for the application label
     * 	@param options.appLabel		 {string} 	The text for the application label
     * 	@param options.locationColor {string} 	The color for the class/func label
     * 	@param options.locationLabel {string} 	The text for the class/func label
     * 	@param options.errorColor 	 {string} 	The color for the error label
     * 	@param options.errorLabel 	 {string} 	The text for the error label
     * 	@param options.error	 	 {boolean} 	The flag to turn on/off the error state
     * 	@param options.arguments	 {array}	The array of arguments to log
     */
    masterLogger(options) {

        //	Generating settings from options
        let settings = this.setOpts({
            appColor: 'cyan',
            appLabel: null,
            locationColor: 'green',
            locationLabel: null,
            errorColor: 'bgRed',
            errorLabel: '<ERROR>',
            error: false,
            arguments: []
        }, options);

        //	VARIABLES
        let color;

        //	Stringify any objects for easy reading
        settings.arguments = settings.arguments.map((index) => {
            if (typeof index == 'object') {
                return `\n${JSON.stringify(index, null, 2)}`;
            }
            return index;
        });

        //  Add error text identifier
        if (settings.error) {
            color = settings.errorColor;
            settings.arguments.unshift(chalk[settings.errorColor](settings.errorLabel));
        }

        //	Add function/ class caller information
        if (settings.locationLabel !== null) {
            let thisColor = color || settings.locationColor;
            let txt = `(${settings.locationLabel})`;
            settings.arguments.unshift(chalk[thisColor](txt));
        }

        //	Add application information
        if (settings.appLabel !== null) {
            let thisColor = color || settings.appColor;
            let txt = `[${settings.appLabel}]`;
            settings.arguments.unshift(chalk[thisColor](txt));
        }

        //	Add spacing around errors
        if (settings.error) {
            settings.arguments.push('\n');
            settings.arguments.unshift('\n');
        }

        //  modify local console behavior
        console.log.apply(this, settings.arguments);
    }

    /**
     *  Application information logger
     *
     * 	Examples:
     *
     *		global.app = new GlobalApp();
     *      global.app.log({
     * 			origin: 'Class or Function name',
     * 			msg: ["Message", 'Message", ...]
     * 		});
     *
     *  @method log
     *
     *  @param 	options.origin 	{string}  Calling class or function name
     * 	@param 	options.msg 	{string}  Message to log
     */
    log(options) {
        let _priv = _private.get(this);

        //	Generating settings from options
        let settings = this.setOpts({
            origin: null,
            msg: []
        }, options);

        let pkg = {
            appLabel: _priv.about,
            locationLabel: settings.origin,
            arguments: settings.msg
        };

        this.masterLogger(pkg);
    }

    /**
     *  Application error logger
     *
     * 	Examples:
     *
     *		global.app = new GlobalApp();
     *      global.app.err({
     * 			origin: 'Class or Function name',
     * 			msg: ["Message", 'Message", ...]
     * 		});
     *
     *  @method log
     *
     *  @param 	options.origin 	{string}  Calling class or function name
     * 	@param 	options.msg 	{string}  Message to log
     */
    err(options) {
        let _priv = _private.get(this);

        //	Generating settings from options
        let settings = this.setOpts({
            origin: null,
            msg: []
        }, options);

        let pkg = {
            error: true,
            appLabel: _priv.about,
            locationLabel: settings.origin,
            arguments: settings.msg
        };

        this.masterLogger(pkg);
    }

    /**
     *  Throws an error if the required variable is not present, otherwise it
     *  returns it.
     *
     *  @method     rewOpts
     *
     *  @param obj.variable     {Any}       The variable being checked.
     *  @param obj.constructor  {String}    The constructor or function src.
     *  @param obj.error        {String}    The error message.
     */
    reqOpt(obj) {
        try {
            if (typeof (obj.variable) === 'undefined')
                throw obj.error
        } catch (e) {
            this.err({
                origin: obj.constructor,
                msg: [e]
            });
        }
        return obj.variable;
    }

    /**
     * 	Generates a settings object from passed options and a default object.
     * 	Options values take precedence over default values, but only properties
     * 	found in the default object are passed along to the settings object.
     * 	Is recursive on objects.
     *
     * 	Examples:
     * 		global.app = new GlobalApp();
     *
     * 		options = {
     *		 	origin: 'Some Value',
     *			depth: {
     *	 			someProp: 'newprop'
     *			}
     *		};
     *
     * 		let settings = global.app.setOpts({
     *			origin: null,
     *			depth: {
     *	 			someProp: 'prop'
     *			},
     *			prop: 'unchanged',
     *			msg: [],
     *			...
     *		}, options);
     *
     * 		// Results in settings having the followin
     * 		// {
     * 		//  	origin: 'SomeValue',
     *		//  	depth: {
     *	 	//  		someProp: 'newprop'
     *		//   	},
     *		//  	prop: 'unchanged',
     *		//  	msg: [],
     *		//  	...
     *		// }
     *
     * 	@method setOpts
     *
     * 	@param def 	{object}	The default object
     * 	@param opt 	{object}	The options object
     *
     * 	@return		{object}	The settings object
     */
    setOpts(def, opt) {

        /**
         * 	Helper function to allow for recursion
         *
         * 	@function makeSettings
         *
         * 	@param def 	{object}	The default object
         * 	@param opt 	{object}	The options object
         *	@param ret	{object}	The return object holder, used for recursion
         *
         * 	@return		{object}	The settings object
         */
        let makeSettings = (def, opt, ret = {}) => {
            if (typeof (opt) === 'undefined')
                return {};

            for (let p in def) {
                if (['string', 'number', 'boolean', 'symbol', 'function', null].indexOf(typeof opt[p]) >= 0 ||
                    Array.isArray(opt[p])) {
                    ret[p] = opt[p];
                } else if (typeof opt[p] === 'undefined') {
                    ret[p] = def[p];
                } else if (typeof opt[p] == 'object') {
                    //	Recursive step on objects
                    ret[p] = makeSettings(def[p], opt[p]);
                    //	Change {} to null
                    ret = ret == null ? null : ret;
                }
            }

            return ret;
        }

        return makeSettings(def, opt);
    }
};