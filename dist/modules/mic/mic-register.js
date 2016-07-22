'use strict';

var _micUtil = require('./mic-util');

var _micUtil2 = _interopRequireDefault(_micUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//	REQUIRES

var path = require('path');


//	CLASS

function MicRegister() {

    //	HELPER OBJECTS

    var mu = new _micUtil2.default();

    //	VARIABLES

    var busses = {
        a: mu.const.get('ZERO'),
        b: mu.const.get('ZERO'),
        c: mu.const.get('ZERO')
    };

    var registers = {
        pc: mu.const.get('ZERO'),
        ac: mu.const.get('ZERO'),
        sp: mu.const.get('ZERO'),
        ir: mu.const.get('ZERO'),
        tir: mu.const.get('ZERO'),
        zero: mu.const.get('ZERO'),
        posOne: mu.const.get('POS_ONE'),
        negOne: mu.const.get('NEG_ONE'),
        amask: mu.const.get('A_MASK'),
        smask: mu.const.get('S_MASK'),
        a: mu.const.get('ZERO'),
        b: mu.const.get('ZERO'),
        c: mu.const.get('ZERO'),
        d: mu.const.get('ZERO'),
        e: mu.const.get('ZERO'),
        f: mu.const.get('ZERO')
    };

    //	Validation arrays
    var registerNames = ['pc', 'ac', 'sp', 'ir', 'tir', 'zero', 'posOne', 'negOne', 'amask', 'smask', 'a', 'b', 'c', 'd', 'e', 'f'];
    var readableBus = ['a', 'b'];
    var writableBus = ['c'];

    //	PRIVATE FUNCTIONS

    /**
     * 	Load a register from the c bus.
     *
     * 	@function	registerRead
     *
     * 	@param 		<string> 	regName Bit string held in the bus
     *
     * 	@return 	<string>	true	valid request
     * 	@return 	<boolean> 	false	invalid request
     */
    function registerLoad(regName) {
        if (registerNames.indexOf(regName) >= 0) {
            registers[regName] = busses.c;
            return true;
        }
        return false;
    }
    /**
     * 	Read a register into a given bus.
     *
     * 	@function	registerRead
     *
     * 	@param 		<string> 	regName Bit string held in the bus
     * 	@param 		<char> 		bus		c bus
     *
     * 	@return 	<string>	true	valid request
     * 	@return 	<boolean> 	false	invalid request
     */
    function registerRead(regName, bus) {
        //	is a valid request
        if (readableBus.indexOf(bus) >= 0 && registerNames.indexOf(regName) >= 0) {
            busses[bus] = registers[regName];
            return true;
        }
        //	invalid request
        return false;
    }
    /**
     * 	Set the contents of the register bus
     *
     * 	@function 	busSet
     *
     * 	@param 		<char> 		bus		c bus
     * 	@param 		<string> 	value 	Bit string held in the bus
     *
     * 	@return 	<string>	true	valid request
     * 	@return 	<boolean> 	false	invalid request
     */
    function busSet(bus, value) {
        //	If a valid bus set contents
        if (writableBus.indexOf(bus) >= 0) {
            busses[bus] = value;
            return true;
        }
        return false;
    }
    /**
     * 	Get the contents of the register bus
     *
     * 	@function 	busGet
     *
     * 	@param 		<char> 		bus		a | b bus
     *
     * 	@return 	<string>			Bit string held in the bus
     * 	@return 	<boolean> 	false	invalid request
     */
    function busGet(bus) {
        //	If a valid bus get contents
        if (readableBus.indexOf(bus) >= 0) {
            return busses[bus];
        }
        //	Invalid bus
        return false;
    }
    /**
     * 	Acts as the latch for the A and B bus
     *
     * 	@function busLatch
     *
     * 	@param 		<char> 		bus		a | b bus
     * 	@param 		<char> 		flag	if bit is on, the latch will pass the value
     *
     * 	@return 	<string>			Bit string held in the bus
     * 	@return 	<boolean> 	false	invalid request
     */
    function busLatch(bus, flag) {
        if (mu.bit.isOn(flag)) {
            return busGet(bus);
        }
        return false;
    }

    //	PUBLIC INTERFACE

    return {
        register: {
            load: registerLoad,
            read: registerRead
        },
        bus: {
            set: busSet,
            get: busLatch
        }
    };
}

//	EXPORTS

module.exports = MicRegister;