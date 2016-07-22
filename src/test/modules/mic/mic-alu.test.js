/**
 *  MicAlu test suite.
 *
 *  @name   mic.alu.test.js
 */

//	IMPORTS

import chai from 'chai';

//  LOCAL IMPORTS

import MicClock from '../../../modules/mic/mic-clock';
import MicAlu from '../../../modules/mic/mic-alu';
import MicUtil from '../../../modules/mic/mic-util';

//  VARIABLES

let expect = chai.expect;
let micAlu = new MicAlu();
let mu = new MicUtil();

let posTwo = mu.int.toStr(2);
let posOne = mu.const.get('POS_ONE');
let zero = mu.const.get('ZERO');
let negOne = mu.const.get('NEG_ONE');

//  FUNCTIONS

function test(msg, bits, input, expected, test) {
    input = global.app.setOpts({
        a: null,
        b: null
    }, input);

    it(msg, () => {
        let ret = micAlu[test](bits, input.a, input.b);
        if (test === 'shifter') {
            expect(ret)
                .to.equal(expected.result);
        } else {
            expect(ret.result)
                .to.equal(expected.result);
        }

        if (ret.n) {
            expect(ret.n)
                .to.equal(expected.n);
        }
        if (ret.z) {
            expect(ret.z)
                .to.equal(expected.z);
        }
    });
}

function testBlock(msg, bits, input, expected) {
    test(msg, bits, input, expected, 'block');
}

function testProcess(msg, bits, input, expected) {
    test(msg, bits, input, expected, 'process');
}

function testShift(msg, bits, input, expected) {
    test(msg, bits, input, expected, 'shifter');
}

//	TESTS

describe('MicAlu', () => {
    describe('Alu', () => {
        describe('addition', () => {
            let bits = {
                high: '0',
                low: '0'
            };

            testBlock('0+0=0, N=0, Z=1',
                bits, {
                    a: zero,
                    b: zero
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testBlock('1+1=2, N=0, Z=0',
                bits, {
                    a: posOne,
                    b: posOne
                }, {
                    result: posTwo,
                    n: '0',
                    z: '0'
                });
            testBlock('0+-1=-1, N=1, Z=0',
                bits, {
                    a: zero,
                    b: negOne
                }, {
                    result: negOne,
                    n: '1',
                    z: '0'
                });
        });
        describe('and', () => {
            let bits = {
                high: '0',
                low: '1'
            };

            testBlock('AND test 1',
                bits, {
                    a: '0000000000000000',
                    b: '1111111111111111'
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testBlock('AND test 2',
                bits, {
                    a: '1111111111111111',
                    b: '0000000000000000'
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });

            testBlock('AND test 3',
                bits, {
                    a: '1010101010101010',
                    b: '0101010101010101'
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testBlock('AND test 4',
                bits, {
                    a: '0101010101010101',
                    b: '0101010101010101'
                }, {
                    result: '0101010101010101',
                    n: '0',
                    z: '0'
                });
            testBlock('AND test 5',
                bits, {
                    a: '1010101010101010',
                    b: '1010101010101010'
                }, {
                    result: '1010101010101010',
                    n: '1',
                    z: '0'
                });
        });
        describe('passThrough leftOp', () => {
            let bits = {
                high: '1',
                low: '0'
            };

            testBlock('Passthrough test 1',
                bits, {
                    a: '0000000000000000',
                    b: '1111111111111111'
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testBlock('Passthrough test 2',
                bits, {
                    a: '1111111111111111',
                    b: '0000000000000000'
                }, {
                    result: '1111111111111111',
                    n: '1',
                    z: '0'
                });
        });
        describe('not leftOp', () => {
            let bits = {
                high: '1',
                low: '1'
            };

            testBlock('not Test 1',
                bits, {
                    a: '0000000000000001'
                }, {
                    result: '1111111111111110',
                    n: '1',
                    z: '0'
                });
            testBlock('not Test 2',
                bits, {
                    a: '1111111111111110'
                }, {
                    result: '0000000000000001',
                    n: '0',
                    z: '0'
                });
            testBlock('not Test 3',
                bits, {
                    a: '1111111111111111'
                }, {
                    result: '0000000000000000',
                    n: '0',
                    z: '1'
                });
        });
    });

    describe('Shifter', () => {
        describe('SHIFT 0', () => {
            testShift('no shift', {
                high: '0',
                low: '0'
            }, {
                a: '1000000000000001'
            }, {
                result: '1000000000000001'
            });
        });
        describe('SHIFT 1', () => {
            testShift('shift right negative', {
                high: '0',
                low: '1'
            }, {
                a: '1000000000000001'
            }, {
                result: '1100000000000000'
            });
            testShift('shift right positive', {
                high: '0',
                low: '1'
            }, {
                a: '0100000000000001'
            }, {
                result: '0010000000000000'
            });
        });
        describe('SHIFT 2', () => {
            testShift('shift left', {
                high: '1',
                low: '0'
            }, {
                a: '1000000000000001'
            }, {
                result: '0000000000000010'
            });
        });
        describe('SHIFT 3', () => {
            testShift('invalid', {
                high: '1',
                low: '1'
            }, {
                a: '1000000000000001'
            }, {
                result: false
            });
        });
    });

    describe('Alu Shifter Block', () => {
        describe('ALU 0 SHIFT 0', () => {
            let bits = {
                alu: {
                    high: '0',
                    low: '0'
                },
                shifter: {
                    high: '0',
                    low: '0'
                }
            };
            testProcess('R=0, N=0, Z=1',
                bits, {
                    a: zero,
                    b: zero
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testProcess('R=2, N=0, Z=0',
                bits, {
                    a: posOne,
                    b: posOne
                }, {
                    result: posTwo,
                    n: '0',
                    z: '0'
                });
            testProcess('R=-1, N=1, Z=0',
                bits, {
                    a: zero,
                    b: negOne
                }, {
                    result: negOne,
                    n: '1',
                    z: '0'
                });
        });
        describe('ALU 1 SHIFT 1', () => {
            let bits = {
                alu: {
                    high: '0',
                    low: '1'
                },
                shifter: {
                    high: '0',
                    low: '1'
                }
            };

            testProcess('AND test 1',
                bits, {
                    a: '0000000000000000',
                    b: '1111111111111111'
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testProcess('AND test 2',
                bits, {
                    a: '1111111111111111',
                    b: '0000000000000000'
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testProcess('AND test 3',
                bits, {
                    a: '1010101010101010',
                    b: '0101010101010101'
                }, {
                    result: zero,
                    n: '0',
                    z: '1'
                });
            testProcess('AND test 4',
                bits, {
                    a: '0101010101010101',
                    b: '0101010101010101'
                }, {
                    result: '0010101010101010',
                    n: '0',
                    z: '0'
                });
            testProcess('AND test 5',
                bits, {
                    a: '1010101010101010',
                    b: '1010101010101010'
                }, {
                    result: '1101010101010101',
                    n: '1',
                    z: '0'
                });
        });
    });
});