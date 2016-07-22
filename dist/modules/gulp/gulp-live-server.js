'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _gulpLiveServer = require('gulp-live-server');

var _gulpLiveServer2 = _interopRequireDefault(_gulpLiveServer);

var _gulpUtil = require('./gulp-util');

var gu = _interopRequireWildcard(_gulpUtil);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  This is a wrapper arround the gulp-live-server, it sets up the server and,
 *  then restarts it when needed.
 *
 *  @class GulpLiveServer
 */

//	PRIVATE VARIABLES
/**
 *  This holds the Gulp Live Server wrapper.
 *
 *  @name   gulp-live-server.js
 */

//  IMPORTS

let _private = new WeakMap();

//  LOCAL IMPORTS

class GulpLiveServer {
    /**
     *  Initializes the server instance to be used across callers.
     *
     *  @method constructor
     */
    constructor() {
        let options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        _private.set(this, {
            instance: null,
            flagStart: true
        });
    }

    /**
     *  Starts a new server instance. Can only be run once.
     *
     *  @method start
     *  @param  done    {Function}  The function to run to signify pipe completion.
     *  @return         {Stream}    An action message pipe stream.
     */
    start(done) {
        let _priv = _private.get(this);

        if (_priv.flagStart) {
            _priv.flagStart = false;
            _priv.instance = _gulpLiveServer2.default.new(global.app.ini.paths.entry);
            _priv.instance.start();
            return gu.actionMsg(done, __filename, ' - server.start:');
        }
        return gu.actionMsg(done, __filename, ' - server.start: [skipping as already started]');
    }

    /**
     *  Restarts a server instance.
     *
     *  @method restart
     *  @param  done    {Function}  The function to run to signify pipe completion.
     *  @return         {Stream}    An action message pipe stream.
     */
    restart(done) {
        let _priv = _private.get(this);

        _priv.instance.start.bind(_priv.instance)();
        return gu.actionMsg(done, __filename, ' - server.restart:');
    }

    /**
     *  The prefered method, starts the server or restarts it depending on state.
     *
     *  @method run
     *  @param  done    {Function}  The function to run to signify pipe completion.
     *  @return         {Stream}    An action message pipe stream.
     */
    run(done) {
        let _priv = _private.get(this);

        if (_priv.flagStart) return this.start(done);
        return this.restart(done);
    }
};

//  EXPORTS

exports.default = GulpLiveServer;