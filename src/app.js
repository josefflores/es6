import GApp from './modules/GlobalApp'

//	GLOBALS

global.app = new GApp('development', __dirname);

console.log('server started');