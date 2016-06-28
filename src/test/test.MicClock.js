//	REQUIRES

var path = require('path');
var chai = require('chai');
var expect = require('chai')
    .expect;

//	 GLOBAL APPLICATION

var root = path.join(path.resolve(__dirname, '..', '..'));
var ini = require(path.join(root, 'ini', 'gulp'));

//	REQUIRED CLASSES

var MicClock = require(path.join(ini.path.lib, 'Mic', 'MicClock'));

//	TESTS

describe('MicClock', function () {

    describe('#getTime()', function () {
        var micClock = new MicClock();
        it('A new MicClock should initialize to { cycle:0, subCycle:0}', function () {
            expect(micClock.getTime()
                    .cycle)
                .to.equal(0);
            expect(micClock.getTime()
                    .subCycle)
                .to.equal(0);
        });
    });

    describe('#tick()', function () {
        var micClock = new MicClock();
        it('Transitions through subcycles into a cycle, 5 ticks cycle to { cycle:2, subCycle:1}', function () {

            var tickTest = function (cycle, subCycle) {
                micClock.tick();
                expect(micClock.getTime()
                        .cycle)
                    .to.equal(cycle);
                expect(micClock.getTime()
                        .subCycle)
                    .to.equal(subCycle);
            };

            tickTest(1, 1);
            tickTest(1, 2);
            tickTest(1, 3);
            tickTest(1, 4);
            tickTest(2, 1);

        });
    });
});