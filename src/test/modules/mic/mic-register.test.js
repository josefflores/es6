//	IMPORTS

import path from 'path';
import chai from 'chai';

//  LOCAL IMPORTS

import MicRegister from '../../../modules/mic/mic-register';
import MicUtil from '../../../modules/mic/mic-util';

//  VARIBALES

let expect = chai.expect;
let mr = new MicRegister();
let mu = new MicUtil();

let posOne = mu.const.get('POS_ONE');
let zero = mu.const.get('ZERO')
let negOne = mu.const.get('NEG_ONE');

//	TESTS

describe('MicRegister', () => {
    describe('Object is created', () => {
        it('Busses have been initialized to 0', () => {
            expect(mr.bus.get('a', '1'))
                .to.equal(zero);
            expect(mr.bus.get('a', '0'))
                .to.equal(false);
            expect(mr.bus.get('b', '1'))
                .to.equal(zero);
            expect(mr.bus.get('b', '0'))
                .to.equal(false);
            expect(mr.bus.get('c', '1'))
                .to.equal(false);
            expect(mr.bus.get('c', '0'))
                .to.equal(false);
        });
    });

    describe('Registers are readable', () => {
        it('Registers can be read into the a bus', () => {
            expect(mr.register.read('posOne', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(posOne);
            expect(mr.register.read('negOne', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(negOne);
            expect(mr.register.read('zero', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(zero);
        });

        it('Registers can be read into the b bus', () => {
            expect(mr.register.read('posOne', 'b'))
                .to.equal(true);
            expect(mr.bus.get('b', '1'))
                .to.equal(posOne);
            expect(mr.register.read('negOne', 'b'))
                .to.equal(true);
            expect(mr.bus.get('b', '1'))
                .to.equal(negOne);
            expect(mr.register.read('zero', 'b'))
                .to.equal(true);
            expect(mr.bus.get('b', '1'))
                .to.equal(zero);
        });

        it('Registers can not be read into the c bus', () => {
            expect(mr.register.read('posOne', 'c'))
                .to.equal(false);
            expect(mr.register.read('negOne', 'c'))
                .to.equal(false);
            expect(mr.register.read('zero', 'c'))
                .to.equal(false);
        });
    });

    describe('Registers are writable', () => {
        it('Registers can be loaded from the c bus', () => {
            expect(mr.register.read('a', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(zero);
            expect(mr.bus.set('c', posOne))
                .to.equal(true);
            expect(mr.register.load('a'))
                .to.equal(true);
            expect(mr.register.read('a', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(posOne);
        });

        it('Registers can not be loaded from the a bus', () => {
            expect(mr.bus.set('a', 2))
                .to.equal(false);
            expect(mr.bus.get('a', '1'))
                .to.not.equal(2);
        });

        it('Registers can not be loaded from the b bus', () => {
            expect(mr.bus.set('b', 2))
                .to.equal(false);
            expect(mr.bus.get('b', '1'))
                .to.not.equal(2);
        });
    });
});