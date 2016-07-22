//	IMPORTS

import chai from 'chai';

//  LOCAL IMPORTS

import MicClock from '../../../modules/mic/mic-clock';

//  VARIABLES

let expect = chai.expect;

//  FUNCTIONS

function test(cycle, subCycle, micClock, tick) {
    if (tick)
        micClock.tick(micClock);

    expect(micClock.time
            .cycle)
        .to.equal(cycle);
    expect(micClock.time
            .subCycle)
        .to.equal(subCycle);
};

//	TESTS

describe('MicClock', () => {
    describe('#time', () => {
        let micClock = new MicClock();
        it('A new MicClock should initialize to { cycle:0, subCycle:0}', () => {
            test(0, 0, micClock, false);
        });
    });

    describe('#tick()', () => {
        let micClock = new MicClock();
        it('Transitions through subcycles into a cycle, 5 ticks cycle to { cycle:2, subCycle:1}', () => {
            test(1, 1, micClock, true);
            test(1, 2, micClock, true);
            test(1, 3, micClock, true);
            test(1, 4, micClock, true);
            test(2, 1, micClock, true);
        });
    });
});