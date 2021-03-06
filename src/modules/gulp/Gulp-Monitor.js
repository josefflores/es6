/**
 *  This holds the chokidar wrapper.
 *
 *  @name   gulp-monitor.js
 */

// IMPORTS

import chokidar from 'chokidar';

//  LOCAL IMPORTS

import * as gu from './gulp-util';

/**
 *  Wrapper to chokidar that allows for in pipe watch start and stopping.
 *
 *  @class  GulpMonitor
 */

//  PRIVATE VARIABLES
let _private = new WeakMap();

class GulpMonitor {
    /**
     *  Instantiates a chokidar object to watch files.
     *
     *  @method constructor
     *  @param  src     {Glob}      The file paths being watched.
     *  @param  options {Object}    The options being passed to the class.
     */
    constructor(src = global.app.ini.paths.server, options = {}) {
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
            defaults,
            settings,
            options,
            watcher: chokidar.watch(src, settings)
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

export default GulpMonitor;