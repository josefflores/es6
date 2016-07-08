//	REQUIRES

var path = require('path');
var MicUtil = require(path.join(__dirname, 'MicUtil'));

//	CLASS

function Clock(opt) {

    //	HELPER OBJECTS

    var mu = new MicUtil();

    //	OPTIONS

    var options = mu.opt.o(opt, {
        length: 4
    });

    //	VARIABLES

    var data = {
        cycle: 0,
        subCycle: 0
    };

    //	PRIVATE FUNTIONS

    /**
     * 	Increments a clock cycle
     *
     * 	@function 	incCycle
     */
    function incCycle() {
        ++data.cycle;
    }
    /**
     * 	Increments a subcycle
     *
     * 	@function 	incCycle
     */
    function incSubCycle() {
        //	keep it in length range
        data.subCycle = (data.subCycle % options.length);
        //	modify to start at 1 to range
        ++data.subCycle;
    }
    /**
     * 	Increment the clock
     *
     * 	@function 	tick
     */
    function tick() {
        incSubCycle();
        if (data.subCycle === 1) {
            incCycle();
        }
    }
    /**
     * 	Get the clock value
     *
     * 	@function 	getTime
     *
     * 	@return 	<obj>	data.cycle		The clock cycles
     * 	@return 	<obj>	data.subCycle	The clock subCycles
     */
    function getTime() {
        return data;
    }

    //	PUBLIC INTERFACE

    return {
        tick: tick,
        getTime: getTime
    };
}

//  EXPORTS
module.exports = Clock;