'use strict';

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _micUtil = require('./mic-util');

var _micUtil2 = _interopRequireDefault(_micUtil);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//	CLASS

//	REQUIRES

function MicAlu(opt) {

    //	HELPER OBJECTS

    let mu = new _micUtil2.default();

    //	OPTIONS

    let options = global.app.setOpts({
        bitLength: 16
    }, opt);
    mu = new _micUtil2.default(options);

    //	VARIABLES

    let data = {
        result: mu.const.get('ZERO'),
        n: mu.const.get('ZERO'),
        z: mu.const.get('ZERO')
    };

    //	PRIVATE FUNCTIONS

    /**
     * 	Adds the two bit strings
     *
     * 	@function 	add
     *
     * 	@param		<string>	leftOp	One off the operands
     * 	@param		<string>	rightOp	One off the operands
     */
    let add = (leftOp, rightOp) => {
        data.result = mu.bit.str.add(leftOp, rightOp);
    };

    /**
     * 	Ands the two bit strings
     *
     * 	@function 	and
     *
     * 	@param		<string>	leftOp	One off the operands
     * 	@param		<string>	rightOp	One off the operands
     */
    function and(leftOp, rightOp) {
        data.result = mu.bit.str.and(leftOp, rightOp);
    }

    /**
     * 	Inverts the bit string
     *
     * 	@function 	invert
     *
     * 	@param		<string>	input		The operand
     */
    function invert(input) {
        data.result = mu.bit.str.invert(input);
    }

    /**
     * 	Passes throough the bit string
     *
     * 	@function 	passThrough
     *
     * 	@param		<string>	input		The operand
     */
    function passThrough(input) {
        data.result = input;
    }

    /**
     * 	Set the bits of the alu.
     *
     * 	@function 	set
     *
     * 	@param		<obj.char>	bits.low	switch bit low
     * 	@param		<obj.char>	bits.high	switch bit high
     *
     * 	@param		<string>	leftOp		One off the operands
     * 	@param		<string>	rightOp		One off the operands
     */
    function set(bits, leftOp, rightOp) {
        //	VARIABLES
        var value, base;

        //	Get base string to append flag bits
        base = mu.const.get('ZERO').slice(0, -2);

        //	Performs calculation
        value = mu.bit.str.toInt(base + bits.high + bits.low);
        if (value === 0) {
            add(leftOp, rightOp);
        } else if (value === 1) {
            and(leftOp, rightOp);
        } else if (value === 2) {
            passThrough(leftOp);
        } else if (value === 3) {
            invert(leftOp);
        }

        //	Determines which of Z or N need to be turned on
        value = mu.bit.str.toInt(data.result);
        if (value === 0) {
            data.n = '0';
            data.z = '1';
        } else if (value < 0) {
            data.n = '1';
            data.z = '0';
        } else {
            data.n = '0';
            data.z = '0';
        }

        return data;
    }

    /**
     * The shifter block in mic architecture
     *
     * 	@function shifter
     *
     * 	@param		<obj.char>	bits.low	switch bit low
     * 	@param		<obj.char>	bits.high	switch bit high
     *
     * 	@param		<string>	input		input bit string
     */
    function shifter(bits, input) {
        //	VARIABLES
        var value, base;

        //	Get base string to append flag bits
        base = mu.const.get('ZERO').slice(0, -2);

        //	Performs calculation
        value = mu.bit.str.toInt(base + bits.high + bits.low);
        if (value === 2) {
            return mu.bit.str.shift('L', input);
        } else if (value === 1) {
            return mu.bit.str.shift('R', input);
        } else if (value === 0) {
            return input;
        }

        return false;
    }

    /**
     * 	This is the alu shifter block
     *
     * 	@param		<char>			bits.alu.low		alu switch bit low
     * 	@param		<char>			bits.alu.high		alu switch bit high
     * 	@param		<char>			bits.shifter.low	shifter switch bit low
     * 	@param		<char>			bits.shifter.high	shifter switch bit high
     *
     * 	@param		<string>		leftOp				bus A operand
     * 	@param		<string>		rightOp				bus B operand
     */
    function block(bits, leftOp, rightOp) {
        //	VARIABLES
        var ret;

        set(bits.alu, leftOp, rightOp);
        data.result = shifter(bits.shifter, data.result);

        return data;
    }

    //	PRIVATE INTERFACE

    return {
        process: block,
        shifter: shifter,
        block: set
    };
}

//  EXPORTS

module.exports = MicAlu;