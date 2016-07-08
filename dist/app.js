'use strict';

var _GlobalApp = require('./modules/GlobalApp');

var _GlobalApp2 = _interopRequireDefault(_GlobalApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//	GLOBALS

global.app = new _GlobalApp2.default('development', __dirname); /**
                                                                 * 	The application entry point.
                                                                 *
                                                                 * 	@name app.js
                                                                 */

//	IMPORTS

console.log('server started');