'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  This class holds all the error responses for the application.
 *
 *  @class  ErrorHandler
 */

//	PRIVATE VARIABLES
let _private = new WeakMap(); /**
                               *  This holds the error handlers for the application.
                               *
                               *  @name   ErrorHandler.js
                               */

//  IMPORTS

class ErrorHandler {

    constructor(app) {
        let origin = this.constructor.name;

        _private.set(this, {
            app: app,
            origin: origin,
            ini: global.app.ini
        });

        global.app.log({
            origin: origin,
            msg: ['Initializing.']
        });
    }

    /**
     *  Process a 404 missing resource
     *
     *  @method     ErrorHandler.notFound
     *
     *  @param  {Object}    req     The request passed by the application
     *  @param  {Object}    res     The response passed by the application
     *  @param  {Function}  next    The function to the next express item
     */
    notFound() {
        let _priv = _private.get(this);
        let ini = global.app.ini;

        global.app.log({
            origin: _priv.origin,
            msg: ['Adding', '404 - Not Found.']
        });

        _priv.app.use((req, res) => {
            res.status(400);
            res.render(_path2.default.join(ini.path.views, 'page.error.jade'), {
                title: '404: File Not Found',
                message: '',
                error: {}
            });
        });
    }

    /**
     *  Processes a 500 server error
     *
     *  @method   ErrorHandler.server
     *
     *  @see    tested against ini.mode for `dev|prod`.
     *          `dev` leaks stack trace to user
     *
     *  @param  {Object}    err     The error passed by the application
     *  @param  {Object}    req     The request passed by the application
     *  @param  {Object}    res     The response passed by the application
     *  @param  {Function}  next    The function to the next express item
     */
    server() {
        let ini = global.app.ini;

        global.app.log({
            origin: _priv.origin,
            msg: ['Adding', '500 - Server.']
        });

        _priv.app.use((err, req, res, next) => {
            res.status(err.status || 500);
            res.render(_path2.default.join(ini.path.views, 'page.error.jade'), {
                title: '500: Internal Server Error',
                message: 'There was an error in the system, sorry for the inconvenience.',
                error: ini.mode === 'dev' ? error : {}
            });
        });
    }
}exports.default = ErrorHandler;
;