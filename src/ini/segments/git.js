/**
 *  The configuration file for git commands.
 *
 *  @name   git.js
 */

//	EXPORTS

export let git = {
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
};