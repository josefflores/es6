'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _gulpUtil = require('./gulp-util');

var gu = _interopRequireWildcard(_gulpUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  Wrapper to chokidar that allows for in pipe watch start and stopping.
 *
 *  @class  GulpMonitor
 */

//  PRIVATE VARIABLES
/**
 *  This holds the chokidar wrapper.
 *
 *  @name   gulp-monitor.js
 */

// IMPORTS

let _private = new WeakMap();

//  LOCAL IMPORTS

class GulpMonitor {
    /**
     *  Instantiates a chokidar object to watch files.
     *
     *  @method constructor
     *  @param  src     {Glob}      The file paths being watched.
     *  @param  options {Object}    The options being passed to the class.
     */
    constructor() {
        let src = arguments.length <= 0 || arguments[0] === undefined ? global.app.ini.paths.server : arguments[0];
        let options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        //	Default chokidar settings: https://www.npmjs.com/package/chokidar
        let defaults = {
            persistent: true,
            ignored: '',
            ignoreInitial: false,
            followSymlinks: true,
            cwd: '.',
            usePolling: false,
            interval: 100,
            binaryInterval: 300,
            useFsEvents: false,
            alwaysStat: false,
            depth: undefined,
            awaitWriteFinish: false,
            ignorePermissionErrors: false,
            atomic: true
        };

        //  Generate settings from defaults and options
        let settings = global.app.setOpts(defaults, options);

        //  Store private variables
        _private.set(this, {
            defaults: defaults,
            settings: settings,
            options: options,
            watcher: _chokidar2.default.watch(src, settings)
        });
    }

    /**
     *  Remove a src from the watch list.
     *
     *  @method unwatch
     *  @param  done    {Function}  The function to run to signify pipe completion.
     *  @param  src     {Glob}      The file paths being unwatched.
     *  @return         {Stream}    An action message pipe stream.
     */
    unwatch(done, src) {
        let _priv = _private.get(this);

        _priv.watcher.unwatch(src);
        return gu.actionMsg(done, src, ' - unwatch:', _priv.settings);
    }

    /**
     *  Add a src to the watch list.
     *
     *  @method watch
     *  @param  done    {Function}  The function to run to signify pipe completion.
     *  @param  src     {Glob}      The file paths being watched.
     *  @return         {Stream}    An action message pipe stream.
     */
    watch(done, src) {
        let _priv = _private.get(this);

        _priv.watcher.add(src);
        return gu.actionMsg(done, src, ' - watch:', _priv.settings);
    }

    /**
     *  Allows for chaining events onto the watcher
     *
     *  @method on
     *
     *  @param  event   {String}    The event type name.
     *  @param  func    {Function}  The callback function to run.
     *  @return         {Stream}    An action message pipe stream.
     */
    on(event, func) {
        let _priv = _private.get(this);

        //  Pass to watcher
        _priv.watcher.on(event, func);
        //  Allows for chaining
        return this;
    }
};

//  EXPORTS

exports.default = GulpMonitor;