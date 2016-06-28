//	REQUIRES

var path = require('path');
var chai = require('chai');
var expect = require('chai')
    .expect;

//	 GLOBAL APPLICATION

var root = path.join(path.resolve(__dirname, '..', '..'));
var ini = require(path.join(root, 'ini', 'gulp'));

//	REQUIRED CLASSES

var MicRegister = require(path.join(ini.path.lib, 'Mic', 'MicRegister'));
var MicUtil = require(path.join(ini.path.lib, 'Mic', 'MicUtil'));

//	TESTS

describe('MicRegister', function () {
    var mr = new MicRegister();
    var mu = new MicUtil();

    describe('Object is created', function () {

        it('Busses have been initialized to 0', function () {
            expect(mr.bus.get('a', '1'))
                .to.equal(mu.const.get('ZERO'));

            expect(mr.bus.get('a', '0'))
                .to.equal(false);

            expect(mr.bus.get('b', '1'))
                .to.equal(mu.const.get('ZERO'));

            expect(mr.bus.get('b', '0'))
                .to.equal(false);

            expect(mr.bus.get('c', '1'))
                .to.equal(false);

            expect(mr.bus.get('c', '0'))
                .to.equal(false);
        });

    });

    describe('Registers are readable', function () {

        it('Registers can be read into the a bus', function () {
            expect(mr.register.read('posOne', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(mu.const.get('POS_ONE'));

            expect(mr.register.read('negOne', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(mu.const.get('NEG_ONE'));

            expect(mr.register.read('zero', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(mu.const.get('ZERO'));
        });

        it('Registers can be read into the b bus', function () {
            expect(mr.register.read('posOne', 'b'))
                .to.equal(true);
            expect(mr.bus.get('b', '1'))
                .to.equal(mu.const.get('POS_ONE'));

            expect(mr.register.read('negOne', 'b'))
                .to.equal(true);
            expect(mr.bus.get('b', '1'))
                .to.equal(mu.const.get('NEG_ONE'));

            expect(mr.register.read('zero', 'b'))
                .to.equal(true);
            expect(mr.bus.get('b', '1'))
                .to.equal(mu.const.get('ZERO'));
        });

        it('Registers can not be read into the c bus', function () {
            expect(mr.register.read('posOne', 'c'))
                .to.equal(false);

            expect(mr.register.read('negOne', 'c'))
                .to.equal(false);

            expect(mr.register.read('zero', 'c'))
                .to.equal(false);
        });

    });

    describe('Registers are writable', function () {

        it('Registers can be loaded from the c bus', function () {
            expect(mr.register.read('a', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(mu.const.get('ZERO'));
            expect(mr.bus.set('c', mu.const.get('POS_ONE')))
                .to.equal(true);
            expect(mr.register.load('a'))
                .to.equal(true);
            expect(mr.register.read('a', 'a'))
                .to.equal(true);
            expect(mr.bus.get('a', '1'))
                .to.equal(mu.const.get('POS_ONE'));
        });

        it('Registers can not be loaded from the a bus', function () {
            expect(mr.bus.set('a', 2))
                .to.equal(false);
            expect(mr.bus.get('a', '1'))
                .to.not.equal(2);
        });

        it('Registers can not be loaded from the b bus', function () {
            expect(mr.bus.set('b', 2))
                .to.equal(false);
            expect(mr.bus.get('b', '1'))
                .to.not.equal(2);
        });

    });

});