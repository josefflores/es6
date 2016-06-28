//	CLASS

/**
 * 	A utility class for Mic objects, Number <=> string conversions, named
 * 	constants
 *
 * 	@class MicUtil
 *  @param {object} opt
 */
function MicUtil(opt) {

    //	OPTIONS

    var options = dObj(opt, {
        bitLength: 16
    });

    //	VARIABLES

    var constants = {
        ZERO: '0000000000000000',
        POS_ONE: '0000000000000001',
        NEG_ONE: '1111111111111111',
        A_MASK: '0000111111111111',
        S_MASK: '0000000011111111',
        SP: '0000111110000000'
    };

    //	PRIVATE FUNCTIONS

    /**
     * 	Gets an object and overwrites options.
     *
     * 	@function 	dObj
     *
     * 	@param		{obj}	obj		Object to add from
     * 	@param		{obj}	def		Object to add and overwrite
     */
    function dObj(obj, def) {
        for (var k in obj) {
            def[k] = obj[k];
        }
        return def;
    }
    /**
     *  Gets the default parameter if one was not given.
     *
     *  @function   dVar
     *
     *  @param  	{any} 		param 		The value to test
     *  @param  	{any}		def         The default value
     *
     *  @return     {any}					The default paramater
     */
    function dVar(param, def) {
        return (typeof param !== 'undefined') ? param : def;
    }
    /**
     * 	Check Sign Bit of a bit string.
     *
     * 	@function 	isPositive
     *
     * 	@param 		{string}	input		The bit String to check.
     *
     * 	@return 	{boolean}	true		The bit string is positive
     * 	@return 	{boolean}	false		The bit string is negative
     *
     */
    function isPositive(input) {
        if (input[0] === '0') {
            return true;
        }
        return false;
    }
    /**
     *	Calculate the exclusive range of the signed bit string.
     *
     *	@function getSignedIntRange
     *
     *	@return 	{object}	obj.min		Minimum range
     *	@return 	{object}	obj.max		Maximum range
     */
    function getSignedIntRange() {
        //	VARIABLES
        var ret = {};

        //	Calculate range
        ret.max = Math.pow(2, options.bitLength - 1);
        ret.min = (-1 * ret.max);
        ret.max -= 1;

        return ret;
    }
    /**
     * 	Add a two bits together, allows for a carry bit.
     *
     * 	@function addBits
     *
     * 	@param 		{char}		leftOp		One of the bits to add
     * 	@param 		{char}		rightOp		One of the bits to add
     * 	@param 		{char}		oldCarry	Carry bit from previous operation
     *
     * 	@return 	{obj}		obj.carry	The carry bit
     * 	@return 	{obj}		obj.ret		The calculation result
     */
    function addBits(leftOp, rightOp, carry) {
        //	VARIABLES
        var calc, ret = {
            ret: '0',
            carry: '0'
        };

        //	Perform calulation
        calc = parseInt(leftOp, 2) + parseInt(rightOp, 2) + parseInt(carry, 2);

        //	Determine result
        if (calc === 3) {
            ret.ret = '1';
            ret.carry = '1';
        } else if (calc === 2) {
            ret.carry = '1';
        } else if (calc === 1) {
            ret.ret = '1';
        }

        //	Return result of calculation
        return ret;
    }
    /**
     * 	Adds two binary bit strings
     *
     * 	@function 	addBitString
     *
     * 	@param 		{string}	leftOp		One of the bit strings to add
     * 	@param 		{string}	rightOp		One of the bit strings to add
     *
     * 	@return 	{string}				The result bit string
     */
    function addBitString(leftOp, rightOp) {
        //	VARIABLES
        var i, out = {},
            output = [];

        //	Set initial carry bit
        out.carry = '0';

        //	Loop through all the bits
        for (i = leftOp.length - 1; i >= 0; --i) {
            //	Calculate the addition at the index
            out = addBits(leftOp[i], rightOp[i], out.carry);
            output[i] = out.ret;
        }
        //	Merge array into string
        return output.join('');
    }
    /**
     * 	Performs the and operation on the input strings
     *
     * 	@function 	andBitString
     *
     * 	@param 		{string}	leftOp		One of the input strings
     * 	@param		{string}	rightOp		One of the input strings
     *
     * 	@returns	{string}				result
     */
    function andBitString(leftOp, rightOp) {
        return leftOp.split('')
            .map(function (character, index) {
                if (character === '1' && rightOp[index] === '1') {
                    return '1';
                }
                return '0';
            })
            .join('');
    }
    /**
     * 	Inverts a bit string
     *
     * 	@param 		{string}	input	Bit string to invert
     * 	@return 	{string}			Inverted bit string
     */
    function invertBits(input) {
        //	break string into array
        return input.split('')
            //	flip all bits
            .map(function (character) {
                return character === '1' ? '0' : '1';
            })
            //	merge array
            .join('');
    }
    /**
     * 	Performs twos complement
     *
     * 	@function twosComplement
     *
     *	@param		{string}	input		The bit string to be operated on
     *
     * 	@return		{string}				The complemented string
     */
    function twosComplement(input) {
        //	Add a bit string of "...00001"
        return addBitString(invertBits(input), padLeft(1, options.bitLength));
    }
    /**
     *	Creates a left padded string of size options.bitLength
     *
     * 	@function	padLeft
     *
     * 	@param		{string}	input		The bit string to pad
     */
    function padLeft(input) {
        //	VARIABLES
        var size, pad, str, r;

        //	Get range
        r = getSignedIntRange();

        //	Convert to binary string
        str = (input >>> 0)
            .toString(2);

        //	Construct string the size of options.bitLength
        if (input >= 0) {

            //	Calculate padding length
            size = options.bitLength - str.length + 1;

            //	Adjust if padding length is negative or larger than options.bitLength
            if (size > options.bitLength) {
                size = options.bitLength;
            } else if (size < 0) {
                size = 0;
            }

            //	Create padding
            pad = Array(size)
                .join(input >= 0 ? '0' : '1');

            //	Merge padding and bit string
            str = pad + str;
        }

        //	Return bit string of options.bitLength length
        return str.substring(str.length - options.bitLength, str.length);
    }
    /**
     *	Gets the value stored in the constants object
     *
     *	@function 	getConstant
     *
     *	@param		{string}	constName	The constant to search for.
     *
     * 	@return 	{string}				The constants value.
     *	@return 	{undefined}				No constant found.
     */
    function getConstant(constName) {
        return constants[constName];
    }
    /**
     * 	Check if input is an integer
     *
     * 	@function 	isInt
     *
     * 	@param 	{number}	input		A number to check
     *
     * 	@return {boolean}	true		Number is an integer
     * 	@return {boolean}	false		Number is not an integer
     */
    function isInt(input) {
        if (input === parseInt(input, 10)) {
            return true;
        }
        return false;
    }
    /**
     * 	Convert a signed integer to bit String
     *
     * 	@function 	intToStr
     *
     * 	@param 	{number}	input		number to convert
     *
     * 	@return {string}				The bit string conversion.
     * 	@return {boolean}	false 		The input was invalid.
     */
    function intToStr(input) {
        //	VARIABLES
        var ret, r;

        //	Get range of valid inputs
        r = getSignedIntRange();

        //	Check if input is an integer or within the range
        if (!isInt(input) || input > r.max || input < r.min) {
            return false;
        }

        //	Perform conversion
        if (input >= 0) {
            ret = padLeft(input, options.bitLength);
        } else {
            ret = padLeft((-1) * input, options.bitLength);
            ret = twosComplement(ret);
        }

        return ret;
    }
    /**
     * 	Converts a binary string to an integer.
     *
     * 	@function 	strToInt
     *
     * 	@param {string}		input		Binary string to convert to an integer.
     */
    function strToInt(input) {
        //	VARIABLES
        var ret, r;

        //	Get range of valid inputs
        r = getSignedIntRange();

        //	Convert to an integer
        if (isPositive(input)) {
            ret = parseInt(input, 2);
        } else {
            ret = twosComplement(input);
            ret = parseInt(ret, 2);
            ret *= -1;
        }

        //	Check if integer is within range
        if (ret > r.max || ret < r.min) {
            return false;
        }

        //	return the value
        return ret;
    }
    /**
     * 	Check if the bit is on.
     *
     * 	@function bitIsOn
     *
     * 	@param 	{char} 		bit 	The bit to test.
     *
     * 	@return {boolean} 	true 	Bit is on.
     * 	@return {boolean} 	false 	Bit is off.
     */
    function bitIsOn(bit) {
        if (bit === '1') {
            return true;
        }
        return false;
    }
    /**
     * 	Shift a bit string 1 bit.
     *
     * 	@function 	shift
     *
     * 	@param 	{char}		direction	'L' | 'R' shift direction
     * 	@param 	{string}	input		The string to shift
     *
     * 	@return {string}				The shifted string
     * 	@return false					Invalid operation
     */
    function shift(direction, input) {
        //	VARIABLES
        var left = isPositive(input) ? '0' : '1';
        var right = '0';

        //	shift 1 bit in given direction
        if (direction === 'L') {
            return (input + right)
                .slice(1, input.length + 1);
        } else if (direction === 'R') {
            return (left + input)
                .slice(0, -1);
        }

        //	Invalid direction
        return false;
    }
    //	PUBLIC INTERFACE

    return {
        opt: {
            v: dVar,
            o: dObj
        },
        const: {
            get: getConstant
        },
        int: {
            toStr: intToStr,
        },
        bit: {
            isOn: bitIsOn,
            str: {
                toInt: strToInt,
                add: addBitString,
                invert: invertBits,
                and: andBitString,
                isPositive: isPositive,
                shift: shift
            }
        }
    };
}

//	EXPORTS

module.exports = MicUtil;