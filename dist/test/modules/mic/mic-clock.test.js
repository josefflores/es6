'use strict';

var _chai = require('chai');

var _chai2 = _interopRequireDefault(_chai);

var _micClock = require('../../../modules/mic/mic-clock');

var _micClock2 = _interopRequireDefault(_micClock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//  VARIABLES

//	IMPORTS

let expect = _chai2.default.expect;

//  FUNCTIONS

//  LOCAL IMPORTS

function test(cycle, subCycle, micClock, tick) {
    if (tick) micClock.tick(micClock);

    expect(micClock.time.cycle).to.equal(cycle);
    expect(micClock.time.subCycle).to.equal(subCycle);
};

//	TESTS

describe('MicClock', () => {
    describe('#time', () => {
        let micClock = new _micClock2.default();
        it('A new MicClock should initialize to { cycle:0, subCycle:0}', () => {
            test(0, 0, micClock, false);
        });
    });

    describe('#tick()', () => {
        let micClock = new _micClock2.default();
        it('Transitions through subcycles into a cycle, 5 ticks cycle to { cycle:2, subCycle:1}', () => {
            test(1, 1, micClock, true);
            test(1, 2, micClock, true);
            test(1, 3, micClock, true);
            test(1, 4, micClock, true);
            test(2, 1, micClock, true);
        });
    });
});