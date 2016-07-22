//	IMPORTS

import path from 'path';

/**
 *  A cycle clock for use with Mic1
 *
 *  @class  MicClock
 */

//  CLASS
let _private = new WeakMap();

export default class MicClock {
    /**
     *  Initializes the clock.
     *
     *  @param  options.length  {Number}    The options object, default: 4.
     */
    constructor(options = {}) {
        let settings = global.app.setOpts({
            length: 4
        }, options);

        _private.set(this, {
            clock: {
                cycle: 0,
                subCycle: 0,
            },
            length: settings.length
        });
    }

    /**
     * 	Get the clock value
     *
     * 	@function 	getTime
     *
     * 	@return 	<obj>	data.cycle		The clock cycles
     * 	@return 	<obj>	data.subCycle	The clock subCycles
     */
    get time() {
        let _priv = _private.get(this);

        return _priv.clock;
    }

    /**
     * 	Increment the clock
     *
     * 	@function 	tick
     */
    tick() {
        let _priv = _private.get(this);

        /**
         * 	Increments a clock cycle
         *
         * 	@function 	incCycle
         */
        function incCycle() {
            ++_priv.clock.cycle;
        }

        /**
         * 	Increments a subcycle
         *
         * 	@function 	incCycle
         */
        function incSubCycle() {
            //	keep it in length range
            _priv.clock.subCycle %= _priv.length;
            //	modify to start at 1 to range
            ++_priv.clock.subCycle;
        }

        incSubCycle();
        if (_priv.clock.subCycle === 1) {
            incCycle();
        }
    }
};