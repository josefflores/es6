/**
 *  This holds the Gulp Live Server wrapper.
 *
 *  @name   Gulp-Scripts.js
 */

//  IMPORTS

import gls from 'gulp-live-server';
import * as gu from './Gulp-Util';

/**
 *  @class GulpServer
 */

//	PRIVATE VARIABLES
let instance;
let count = 0;

export default class GulpLiveServer {
    constructor() {
        instance = null;
    }

    start(done) {
        if (count === 0) {
            ++count;
            instance = gls.new(global.app.ini.paths.entry);
            instance.start();
            return gu.actionMsg(done, __filename, ' - server.start:');
        }
        return gu.actionMsg(done, __filename, ' - server.start: [skipping as already started]');
    }
    restart(done) {
        instance.start.bind(instance)();
        return gu.actionMsg(done, __filename, ' - server.restart:');
    }
};