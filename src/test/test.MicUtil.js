//	REQUIRES

var path = require('path');
var chai = require('chai');
var expect = require('chai')
    .expect;

//	 GLOBAL APPLICATION

var root = path.join(path.resolve(__dirname, '..', '..'));
var ini = require(path.join(root, 'ini', 'gulp'));

//	REQUIRED CLASSES

var MicUtil = require(path.join(ini.path.lib, 'Mic', 'MicUtil'));

//	TESTS

describe('MicUtil', function () {

    var mu = new MicUtil();

    describe('Option setters work', function () {
        it('Default object option overwritten', function () {
            var opt = {
                bitLength: 2
            };
            var def = {
                bitLength: 23
            };
            var use = mu.opt.o(opt, def);

            expect(use.bitLength)
                .to.equal(opt.bitLength);
        });

        it('Default object option used', function () {
            var def = {
                bitLength: 23
            };
            var use = mu.opt.o(undefined, def);

            expect(use.bitLength)
                .to.equal(23);
        });

        it('Default variable option overwritten', function () {
            var opt = 2;
            var def = 23;
            var use = mu.opt.v(opt, def);

            expect(use)
                .to.equal(opt);
        });

        it('Default variable option used', function () {
            var def = 23;
            var use = mu.opt.v(undefined, def);

            expect(use)
                .to.equal(def);
        });
    });

    describe('Constant functions work', function () {
        it('Verify constants can be retrieved', function () {
            expect(mu.const.get('ZERO'))
                .to.equal('0000000000000000');

            expect(mu.const.get('NOT_IN_CONSTANTS'))
                .to.equal(undefined);
        });
    });

    describe('Can generate bit strings', function () {
        it('Verify constants against generator', function () {
            expect(mu.int.toStr(0))
                .to.equal(mu.const.get('ZERO'));

            expect(mu.int.toStr(1))
                .to.equal(mu.const.get('POS_ONE'));

            expect(mu.int.toStr(-1))
                .to.equal(mu.const.get('NEG_ONE'));
        });

        it('Verify range of generator', function () {
            expect(mu.int.toStr(32767))
                .to.equal('0111111111111111');

            expect(mu.int.toStr(-32768))
                .to.equal('1000000000000000');

            expect(mu.int.toStr(-32769))
                .to.equal(false);

            expect(mu.int.toStr(32768))
                .to.equal(false);

            expect(mu.int.toStr(-9999999999))
                .to.equal(false);

            expect(mu.int.toStr(99999999999))
                .to.equal(false);
        });

        it('Random samples', function () {
            expect(mu.int.toStr(649))
                .to.equal('0000001010001001');

            expect(mu.int.toStr(-649))
                .to.equal('1111110101110111');
        });
    });

    describe('Can decode bit strings', function () {
        it('Verify constants against decoder', function () {
            expect(mu.bit.str.toInt(mu.const.get('ZERO')))
                .to.equal(0);

            expect(mu.bit.str.toInt(mu.const.get('POS_ONE')))
                .to.equal(1);

            expect(mu.bit.str.toInt(mu.const.get('NEG_ONE')))
                .to.equal(-1);
        });

        it('Verify range of decoder', function () {
            expect(mu.bit.str.toInt('0111111111111111'))
                .to.equal(32767);

            expect(mu.bit.str.toInt('1000000000000000'))
                .to.equal(-32768);

            expect(mu.bit.str.toInt('01111111111111111'))
                .to.equal(false);

            expect(mu.bit.str.toInt('10000000000000000'))
                .to.equal(false);
        });

        it('Random samples', function () {
            expect(mu.bit.str.toInt('0000001010001001'))
                .to.equal(649);

            expect(mu.bit.str.toInt('1111110101110111'))
                .to.equal(-649);
        });
    });

    describe('Can ADD bit strings', function () {
        it(' 0 +  0 == 0', function () {
            var result = mu.bit.str.add(
                mu.const.get('ZERO'),
                mu.const.get('ZERO'));

            expect(result)
                .to.equal(mu.const.get('ZERO'));
        });

        it(' 0 +  1 == 1', function () {
            var result = mu.bit.str.add(
                mu.const.get('ZERO'),
                mu.const.get('POS_ONE'));

            expect(result)
                .to.equal(mu.const.get('POS_ONE'));
        });

        it(' 1 +  1 == 2', function () {
            var result = mu.bit.str.add(
                mu.const.get('POS_ONE'),
                mu.const.get('POS_ONE'));

            expect(result)
                .to.equal(mu.int.toStr(2));
        });

        it(' 1 + -1 == 0', function () {
            var result = mu.bit.str.add(
                mu.const.get('POS_ONE'),
                mu.const.get('NEG_ONE'));

            expect(result)
                .to.equal(mu.const.get('ZERO'));
        });

        it('-1 + -1 == -2', function () {
            var result = mu.bit.str.add(
                mu.const.get('NEG_ONE'),
                mu.const.get('NEG_ONE'));

            expect(result)
                .to.equal(mu.int.toStr(-2));
        });
    });

    describe('Can INVERT bit strings', function () {
        it('INVERT test 1', function () {
            var result = mu.bit.str.invert('0000000000000001');
            expect(result)
                .to.equal('1111111111111110');
        });
        it('INVERT test 2', function () {
            var result = mu.bit.str.invert('0000000000000000');
            expect(result)
                .to.equal('1111111111111111');
        });
        it('INVERT test 3', function () {
            var result = mu.bit.str.invert('1010101010101010');
            expect(result)
                .to.equal('0101010101010101');
        });
    });

    describe('Can AND bit strings', function () {
        it('AND test 1', function () {
            var result = mu.bit.str.and(
                '0000000000000000',
                '1111111111111111');
            expect(result)
                .to.equal('0000000000000000');
        });

        it('AND test 2', function () {
            var result = mu.bit.str.and(
                '0101010101010101',
                '1111111111111111');
            expect(result)
                .to.equal('0101010101010101');
        });

        it('AND test 3', function () {
            var result = mu.bit.str.and(
                '0101010101010101',
                '1010101010101010');
            expect(result)
                .to.equal('0000000000000000');
        });

        it('AND test 4', function () {
            var result = mu.bit.str.and(
                '1111111111111111',
                '0000000000000000');
            expect(result)
                .to.equal('0000000000000000');
        });
    });

    describe('Can tell if bit strings are positive', function () {
        it('zero is positive', function () {
            expect(mu.bit.str.isPositive(mu.int.toStr(0)))
                .to.equal(true);
        });
        it('one is positive', function () {
            expect(mu.bit.str.isPositive(mu.int.toStr(1)))
                .to.equal(true);
        });
        it('-1 is not positive', function () {
            expect(mu.bit.str.isPositive(mu.int.toStr(-1)))
                .to.equal(false);
        });

    });

    describe('Can shift bits', function () {
        it('shift right negative', function () {
            var in1 = '1000000000000001';
            var ret = mu.bit.str.shift('R', in1);
            expect(ret)
                .to.equal('1100000000000000');
        });
        it('shift right positive', function () {
            var in1 = '0100000000000001';
            var ret = mu.bit.str.shift('R', in1);
            expect(ret)
                .to.equal('0010000000000000');
        });

        it('shift left', function () {
            var in1 = '1000000000000001';
            var ret = mu.bit.str.shift('L', in1);
            expect(ret)
                .to.equal('0000000000000010');
        });

        it('shift invalid', function () {
            var in1 = '1000000000000001';
            var ret = mu.bit.str.shift('X', in1);
            expect(ret)
                .to.equal(false);
        });

    });
});