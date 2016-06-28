/**
 *  The configuration file to use during gulp tasks. It holds settings for the gulp taskrunner.
 *
 *  @name   gulp.js
 */

import paths from './common/paths.js';

// 	SETTINGS
export default {
    app: {
        mode: 'dev'
    },
    opt: {
        help: {
            hideDepsMessage: true,
            hideEmpty: true
        },
        inPlace: {
            base: './'
        },
        git: {
            lock: {
                read: false
            },
            add: {
                args: '-A'
            },
            commit: {
                options: {
                    'm="message"': 'Commit message to use.'
                }
            }
        }
    },
    path: paths
};
