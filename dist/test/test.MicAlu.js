'use strict';

//	REQUIRES

var path = require('path');
var chai = require('chai');
var expect = require('chai').expect;

//	 GLOBAL APPLICATION

var root = path.join(path.resolve(__dirname, '..', '..'));
var ini = require(path.join(root, 'ini', 'gulp'));

//	REQUIRED CLASSES

var MicAlu = require(path.join(ini.path.lib, 'Mic', 'MicAlu'));
var MicUtil = require(path.join(ini.path.lib, 'Mic', 'MicUtil'));

//	TESTS

describe('MicAlu', function () {
    var micAlu = new MicAlu();
    var mu = new MicUtil();

    describe('Alu', function () {
        describe('addition', function () {
            var bits = {
                high: '0',
                low: '0'
            };

            it('0+0=0, N=0, Z=1', function () {
                var in1 = mu.const.get('ZERO');
                var in2 = mu.const.get('ZERO');
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('1+1=2, N=0, Z=0', function () {
                var in1 = mu.const.get('POS_ONE');
                var in2 = mu.const.get('POS_ONE');
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal(mu.int.toStr(2));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('0');
            });
            it('0+-1=-1, N=1, Z=0', function () {
                var in1 = mu.const.get('ZERO');
                var in2 = mu.const.get('NEG_ONE');
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('NEG_ONE'));
                expect(ret.n).to.equal('1');
                expect(ret.z).to.equal('0');
            });
        });

        describe('and', function () {
            var bits = {
                high: '0',
                low: '1'
            };

            it('AND test 1', function () {
                var in1 = '0000000000000000';
                var in2 = '1111111111111111';
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('AND test 2', function () {
                var in1 = '1111111111111111';
                var in2 = '0000000000000000';
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('AND test 3', function () {
                var in1 = '1010101010101010';
                var in2 = '0101010101010101';
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('AND test 4', function () {
                var in1 = '0101010101010101';
                var in2 = '0101010101010101';
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal('0101010101010101');
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('0');
            });
            it('AND test 5', function () {
                var in1 = '1010101010101010';
                var in2 = '1010101010101010';
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal('1010101010101010');
                expect(ret.n).to.equal('1');
                expect(ret.z).to.equal('0');
            });
        });

        describe('passThrough leftOp', function () {
            var bits = {
                high: '1',
                low: '0'
            };

            it('Passthrough test 1', function () {
                var in1 = '0000000000000000';
                var in2 = '1111111111111111';
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('Passthrough test 2', function () {
                var in1 = '1111111111111111';
                var in2 = '0000000000000000';
                var ret = micAlu.block(bits, in1, in2);

                expect(ret.result).to.equal('1111111111111111');
                expect(ret.n).to.equal('1');
                expect(ret.z).to.equal('0');
            });
        });

        describe('not leftOp', function () {
            var bits = {
                high: '1',
                low: '1'
            };

            it('not Test 1', function () {
                var in1 = '0000000000000001';
                var ret = micAlu.block(bits, in1, null);

                expect(ret.result).to.equal('1111111111111110');
                expect(ret.n).to.equal('1');
                expect(ret.z).to.equal('0');
            });
            it('not Test 2', function () {
                var in1 = '1111111111111110';
                var ret = micAlu.block(bits, in1, null);

                expect(ret.result).to.equal('0000000000000001');
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('0');
            });
            it('not Test 3', function () {
                var in1 = '1111111111111111';
                var ret = micAlu.block(bits, in1, null);

                expect(ret.result).to.equal('0000000000000000');
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
        });
    });

    describe('Shifter', function () {
        describe('SHIFT 0', function () {
            it('no shift', function () {
                var bits = {
                    high: '0',
                    low: '0'
                };
                var in1 = '1000000000000001';
                var ret = micAlu.shifter(bits, in1);
                expect(ret).to.equal(in1);
            });
        });
        describe('SHIFT 1', function () {
            it('shift right negative', function () {
                var bits = {
                    high: '0',
                    low: '1'
                };
                var in1 = '1000000000000001';
                var ret = micAlu.shifter(bits, in1);
                expect(ret).to.equal('1100000000000000');
            });
            it('shift right positive', function () {
                var bits = {
                    high: '0',
                    low: '1'
                };
                var in1 = '0100000000000001';
                var ret = micAlu.shifter(bits, in1);
                expect(ret).to.equal('0010000000000000');
            });
        });
        describe('SHIFT 2', function () {
            it('shift left', function () {
                var bits = {
                    high: '1',
                    low: '0'
                };
                var in1 = '1000000000000001';
                var ret = micAlu.shifter(bits, in1);
                expect(ret).to.equal('0000000000000010');
            });
        });
        describe('SHIFT 3', function () {
            it('invalid', function () {
                var bits = {
                    high: '1',
                    low: '1'
                };
                var in1 = '1000000000000001';
                var ret = micAlu.shifter(bits, in1);
                expect(ret).to.equal(false);
            });
        });
    });

    describe('Alu Shifter Block', function () {

        describe('ALU 0 SHIFT 0', function () {

            var bits = {
                alu: {
                    high: '0',
                    low: '0'
                },
                shifter: {
                    high: '0',
                    low: '0'
                }
            };
            it('R=0, N=0, Z=1', function () {
                var in1 = mu.const.get('ZERO');
                var in2 = mu.const.get('ZERO');
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('R=2, N=0, Z=0', function () {
                var in1 = mu.const.get('POS_ONE');
                var in2 = mu.const.get('POS_ONE');
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal(mu.int.toStr(2));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('0');
            });
            it('R=-1, N=1, Z=0', function () {
                var in1 = mu.const.get('ZERO');
                var in2 = mu.const.get('NEG_ONE');
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('NEG_ONE'));
                expect(ret.n).to.equal('1');
                expect(ret.z).to.equal('0');
            });
        });

        describe('ALU 1 SHIFT 1', function () {
            var bits = {
                alu: {
                    high: '0',
                    low: '1'
                },
                shifter: {
                    high: '0',
                    low: '1'
                }
            };

            it('AND test 1', function () {
                var in1 = '0000000000000000';
                var in2 = '1111111111111111';
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('AND test 2', function () {
                var in1 = '1111111111111111';
                var in2 = '0000000000000000';
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('AND test 3', function () {
                var in1 = '1010101010101010';
                var in2 = '0101010101010101';
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal(mu.const.get('ZERO'));
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('1');
            });
            it('AND test 4', function () {
                var in1 = '0101010101010101';
                var in2 = '0101010101010101';
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal('0010101010101010');
                expect(ret.n).to.equal('0');
                expect(ret.z).to.equal('0');
            });
            it('AND test 5', function () {
                var in1 = '1010101010101010';
                var in2 = '1010101010101010';
                var ret = micAlu.process(bits, in1, in2);

                expect(ret.result).to.equal('1101010101010101');
                expect(ret.n).to.equal('1');
                expect(ret.z).to.equal('0');
            });
        });
    });
});