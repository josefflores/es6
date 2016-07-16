/**
 *  This holds the chokidar wrapper.
 *
 *  @name   Gulp-Monitor.js
 */

// IMPORTS

import chokidar from 'chokidar';
import * as gu from './Gulp-Util';

/**
 *  Wrapper to chokidar that allows for in pipe watch start and stopping.
 *
 *  @class  GulpMonitor
 */

//  PRIVATE
let _private = new WeakMap();

export default class Monitor {
    constructor(src = global.app.ini.paths.server, options) {
        //	Default settings: https://www.npmjs.com/package/chokidar
        let settings = global.app.setOpts({
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
        }, options);

        _private.set(this, {
            settings: {
                base: './'
            },
            watcher: chokidar.watch(src, settings)
        });
    }
    unwatch(done, src) {
        _private.get(this)
            .watcher.unwatch(src);
        return gu.actionMsg(done, src, ' - unwatch:', _private.get(this)
            .settings);
    }
    watch(done, src) {
        _private.get(this)
            .watcher.add(src);
        return gu.actionMsg(done, src, ' - watch:', _private.get(this)
            .settings);
    }
    on(event, func) {
        _private.get(this)
            .watcher.on(event, func);
        return this;
    }
};