'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _urlJoin = require('url-join');

var _urlJoin2 = _interopRequireDefault(_urlJoin);

var _httpResponses = require('../ini/segments/httpResponses');

var _httpResponses2 = _interopRequireDefault(_httpResponses);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 *  This is the Api class. It adds api point to the express application.
 *
 *  Examples:
 *
 *      let api = new Api(app);
 *
 *      api.add({
 *          "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
 *          "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
 *          "desc": "Description of the api method.",
 *          "return": "POST|PUT|GET|DELETE"
 *      },
 *      function(req, res, obj){
 *          // Api method action with final responses using
 *          // api.response(res, {errorObject}, {documentObject}, obj);
 *          // where errorObject and documentObject are user defined
 *      });
 *
 *      ...
 *
 *      api.end();
 *
 *  @class   Api
 *  @param {obj}    app     The express application
 */

//	PRIVATE

let _private = new WeakMap();

/**
 *  Checks to see if valid return type was passed
 *
 *  @method Api.validMethod
 *
 *  @param  {Enum}    method  The return type get|post|put|delete
 *
 *  @return {Boolean}   true    The return type is valid
 *  @return {Boolean}   false   An unknown return type
 */
/**
 *  The Api handler for the application.
 *
 *  @name   Api.js
 */

//  REQUIRES

let validMethod = method => {
    return ['get', 'post', 'put', 'delete'].in(method.toLowerCase());
};

class Api {

    constructor(app) {

        //	PRIVATE VARIABLES

        _private.set(this, {
            app: app,
            methods: []
        });

        global.app.log({
            origin: this.constructor.name,
            msg: ['Initializing.']
        });
    }

    /**
     *  Adds a method to the api and documents it.
     *
     *  Examples:
     *
     *      let api = new Api(app);
     *
     *      api.add({
     *          "url": urlJoin( "/api/", "Comma", "separated", "path", "components"),
     *          "param": null | {"paramName": { "desc": "description of param", "opt": null | [ "array of options" ] }, ...
     *          "desc": "Description of the api method.",
     *          "return": "POST|PUT|GET|DELETE"
     *      },
     *      function(req, res, obj){
     *          // Api method action with final responses using
     *          // api.response(res, {errorObject}, {documentObject}, obj);
     *          // where errorObject and documentObject are user defined
     *      });
     *
     *      ...
     *
     *  @method     Api.add
     *  @param  {Object}    obj     The api object documentation
     *  @param  {Function}  func    The api function
     */
    add(obj, func) {
        let _priv = _private.get(this);

        //  VARIABLES
        let ObjReturnType;

        global.app.log({
            origin: this.constructor.name,
            msg: ['Adding API method.', obj.url]
        });

        ObjReturnType = obj.return.toLowerCase();
        if (validMethod(ObjReturnType)) {
            global.app.err({
                origin: this.constructor.name,
                msg: ['Invalid API return methods for', obj.url]
            });
            return false;
        }

        //  Adding method to list
        _priv.methods.push(obj);

        //	Linking to app
        _priv.app[ObjReturnType](obj.url, (req, res) => {
            func(req, res, _httpResponses2.default.crud[ObjReturnType]);
        });

        global.app.log({
            origin: this.constructor.name,
            msg: ['MAPPED - ', obj.url]
        });
    }

    /**
     *  Passes the results of a database manipulation to the response handler,
     *  alongside the type of request that was made with any corresponding
     *  errors or documents.
     *
     *  @method   Api.response
     *
     *  @param  {Object}    res     The response passed by the application
     *  @param  {Object}    err     The error object
     *  @param  {Object}    doc     The data document
     *  @param  {Object}    obj     The request type.
     */
    response(res, err, doc, obj) {
        if (err) {
            // respond if there is an error
            global.app.err({
                origin: this.constructor.name,
                msg: ['Error case', err, doc]
            });

            res.status(obj.failure).send(_httpResponses2.default.resp[obj.failure].msg);
        } else {
            if (obj.data) {
                // respond for success and send data
                res.status(obj.success).json(doc);
            } else {
                // respond for success and send status
                res.status(obj.success).send(_httpResponses2.default.resp[obj.success].msg);
            }
        }
    }

    /**
     *  Signals the Api.add method will no longer be used and, prepares
     *  the help responses. Also sets up and handles api error for invalid url.
     *
     *  @method   Api.end
     */
    end() {
        let _priv = _private.get(this);
        let that = this;

        // Adding help method
        this.add({
            'url': (0, _urlJoin2.default)('/api', 'get', 'help'),
            'param': [null],
            'desc': 'Returns an api description object.',
            'return': 'GET'
        }, (req, res, obj) => {
            that.response(res, null, that.methods, obj);
        });

        // Sort methods by url
        _priv.methods.sort((a, b) => {
            if (a.url < b.url) return -1;
            if (a.url > b.url) return 1;
            return 0;
        });

        // Bad Request the API url does not  exist
        _priv.app.get('/api/*', (req, res) => {
            that.response(res, true, '400', _httpResponses2.default.crud.MISSING);
        });

        global.app.log({
            origin: this.constructor.name,
            msg: ['Waiting for method call ...']
        });
    }
}
exports.default = Api;