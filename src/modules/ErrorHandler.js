/**
 *  This holds the error handlers for the application.
 *
 *  @name   ErrorHandler.js
 */

//  REQUIRES

import path from 'path';

//	PRIVATE VARIABLES
let _private = new WeakMap();

/**
 *  This class holds all the error responses for the application.
 *
 *  @class  ErrorHandler
 */
export default class ErrorHandler {

    constructor(app) {
        _private.set(this, {
            ini: global.app.ini
        });

        global.app.log({
            origin: this.constructor.name,
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
        global.app.log({
            origin: this.constructor.name,
            msg: ['Adding', '404 - Not Found.']
        });

        _private.get(this)
            .app.use((req, res) => {
                res.status(400);
                res.render(path.join(ini.path.views, 'page.error.jade'), {
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
        global.app.log({
            origin: this.constructor.name,
            msg: ['Adding', '500 - Server.']
        });

        _private.get(this)
            .app.use((err, req, res, next) => {
                res.status(err.status || 500);
                res.render(path.join(ini.path.views, 'page.error.jade'), {
                    title: '500: Internal Server Error',
                    message: 'There was an error in the system, sorry for the inconvenience.',
                    error: (ini.mode === 'dev' ? error : {})
                });
            });
    }
};