//	IMPORT

import chai from 'chai';

//  letIABLES

let expect = chai.expect;
let mu = new MicUtil();

let bitZero = '0000000000000000';
let zero = mu.const.get('ZERO');
let posOne = mu.const.get('POS_ONE');
let negOne = mu.const.get('NEG_ONE');

//	REQUIRED CLASSES

import MicUtil from '../../../modules/mic/mic-util';

//	TESTS

describe('MicUtil', () => {
    describe('Constant functions work', () => {
        it('Verify constants can be retrieved', () => {
            expect(mu.const.get('ZERO'))
                .to.equal(bitZero);

            expect(mu.const.get('NOT_IN_CONSTANTS'))
                .to.equal(undefined);
        });
    });

    describe('Can generate bit strings', () => {
        it('Verify constants against generator', () => {
            expect(mu.int.toStr(0))
                .to.equal(mu.const.get('ZERO'));

            expect(mu.int.toStr(1))
                .to.equal(mu.const.get('POS_ONE'));

            expect(mu.int.toStr(-1))
                .to.equal(mu.const.get('NEG_ONE'));
        });

        it('Verify range of generator', () => {
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

        it('Random samples', () => {
            expect(mu.int.toStr(649))
                .to.equal('0000001010001001');

            expect(mu.int.toStr(-649))
                .to.equal('1111110101110111');
        });
    });

    describe('Can decode bit strings', () => {
        it('Verify constants against decoder', () => {
            expect(mu.bit.str.toInt(mu.const.get('ZERO')))
                .to.equal(0);

            expect(mu.bit.str.toInt(mu.const.get('POS_ONE')))
                .to.equal(1);

            expect(mu.bit.str.toInt(mu.const.get('NEG_ONE')))
                .to.equal(-1);
        });

        it('Verify range of decoder', () => {
            expect(mu.bit.str.toInt('0111111111111111'))
                .to.equal(32767);

            expect(mu.bit.str.toInt('1000000000000000'))
                .to.equal(-32768);

            expect(mu.bit.str.toInt('01111111111111111'))
                .to.equal(false);

            expect(mu.bit.str.toInt('10000000000000000'))
                .to.equal(false);
        });

        it('Random samples', () => {
            expect(mu.bit.str.toInt('0000001010001001'))
                .to.equal(649);

            expect(mu.bit.str.toInt('1111110101110111'))
                .to.equal(-649);
        });
    });

    describe('Can ADD bit strings', () => {
        it(' 0 +  0 == 0', () => {
            let result = mu.bit.str.add(bitZero, bitZero);

            expect(result)
                .to.equal(bitZero);
        });

        it(' 0 +  1 == 1', () => {
            let result = mu.bit.str.add(bitZero, posOne);

            expect(result)
                .to.equal(posOne);
        });

        it(' 1 +  1 == 2', () => {
            let result = mu.bit.str.add(posOne, posOne);

            expect(result)
                .to.equal(mu.int.toStr(2));
        });

        it(' 1 + -1 == 0', () => {
            let result = mu.bit.str.add(posOne, negOne);

            expect(result)
                .to.equal(bitZero);
        });

        it('-1 + -1 == -2', () => {
            let result = mu.bit.str.add(negOne, negOne);

            expect(result)
                .to.equal(mu.int.toStr(-2));
        });
    });

    describe('Can INVERT bit strings', () => {
        it('INVERT test 1', () => {
            let result = mu.bit.str.invert('0000000000000001');
            expect(result)
                .to.equal('1111111111111110');
        });
        it('INVERT test 2', () => {
            let result = mu.bit.str.invert('0000000000000000');
            expect(result)
                .to.equal('1111111111111111');
        });
        it('INVERT test 3', () => {
            let result = mu.bit.str.invert('1010101010101010');
            expect(result)
                .to.equal('0101010101010101');
        });
    });

    describe('Can AND bit strings', () => {
        it('AND test 1', () => {
            let result = mu.bit.str.and(
                '0000000000000000',
                '1111111111111111');
            expect(result)
                .to.equal('0000000000000000');
        });

        it('AND test 2', () => {
            let result = mu.bit.str.and(
                '0101010101010101',
                '1111111111111111');
            expect(result)
                .to.equal('0101010101010101');
        });

        it('AND test 3', () => {
            let result = mu.bit.str.and(
                '0101010101010101',
                '1010101010101010');
            expect(result)
                .to.equal('0000000000000000');
        });

        it('AND test 4', () => {
            let result = mu.bit.str.and(
                '1111111111111111',
                '0000000000000000');
            expect(result)
                .to.equal('0000000000000000');
        });
    });

    describe('Can tell if bit strings are positive', () => {
        it('bitZero is positive', () => {
            expect(mu.bit.str.isPositive(mu.int.toStr(0)))
                .to.equal(true);
        });
        it('one is positive', () => {
            expect(mu.bit.str.isPositive(mu.int.toStr(1)))
                .to.equal(true);
        });
        it('-1 is not positive', () => {
            expect(mu.bit.str.isPositive(mu.int.toStr(-1)))
                .to.equal(false);
        });

    });

    describe('Can shift bits', () => {
        it('shift right negative', () => {
            let ret = mu.bit.str.shift('R',
                '1000000000000001');
            expect(ret)
                .to.equal('1100000000000000');
        });
        it('shift right positive', () => {
            let ret = mu.bit.str.shift('R',
                '0100000000000001');
            expect(ret)
                .to.equal('0010000000000000');
        });

        it('shift left', () => {
            let ret = mu.bit.str.shift('L',
                '1000000000000001');
            expect(ret)
                .to.equal('0000000000000010');
        });

        it('shift invalid', () => {
            let ret = mu.bit.str.shift('X',
                '1000000000000001');
            expect(ret)
                .to.equal(false);
        });

    });
});