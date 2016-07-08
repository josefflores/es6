/**
 *  The configuration file for file syntax linting.
 *
 *  @name   linter.js
 */

//	EXPORTS

export let css = {
    'adjoining-classes': false,
    'box-sizing': false,
    'box-model': false,
    'compatible-vendor-prefixes': false,
    'floats': false,
    'font-sizes': false,
    'gradients': false,
    'important': false,
    'known-properties': false,
    'outline-none': false,
    'qualified-headings': false,
    'regex-selectors': false,
    'shorthand': false,
    'text-indent': false,
    'unique-headings': false,
    'universal-selector': false,
    'unqualified-attributes': false,
    'vendor-prefix': false,
    'overqualified-elements': false
};

export let js = {
    'maxerr': 50,
    'bitwise': false,
    'camelcase': false,
    'curly': true,
    'eqeqeq': true,
    'forin': false,
    'freeze': false,
    'immed': false,
    'latedef': false,
    'newcap': true,
    'noarg': true,
    'noempty': true,
    'nonbsp': true,
    'nonew': false,
    'plusplus': false,
    'quotmark': 'single',
    'undef': false,
    'unused': false,
    'strict': false,
    'maxparams': false,
    'maxdepth': false,
    'maxstatements': false,
    'maxcomplexity': false,
    'maxlen': false,
    'varstmt': false,
    'asi': false,
    'boss': false,
    'debug': false,
    'eqnull': false,
    'esversion': 6,
    'moz': false,
    'evil': false,
    'expr': false,
    'funcscope': false,
    'globalstrict': false,
    'iterator': false,
    'lastsemic': false,
    'laxbreak': false,
    'laxcomma': false,
    'loopfunc': false,
    'multistr': false,
    'noyield': false,
    'notypeof': false,
    'proto': false,
    'scripturl': false,
    'shadow': false,
    'sub': false,
    'supernew': false,
    'validthis': false,
    'browser': false,
    'browserify': false,
    'couch': false,
    'devel': false,
    'dojo': false,
    'jasmine': false,
    'jquery': false,
    'mocha': false,
    'mootools': false,
    'node': false,
    'nonstandard': false,
    'phantom': false,
    'prototypejs': false,
    'qunit': false,
    'rhino': false,
    'shelljs': false,
    'typed': false,
    'worker': false,
    'wsh': false,
    'yui': false,
    'globals': {}
};

export let jade = {
    'disallowSpecificAttributes': [
        'xmlns', {
            'br': 'role'
        }, {
            'hr': 'role'
        }, {
            'nav': 'role'
        }
    ],
    'disallowSpecificTags': [
        'b',
        'hgroup',
        'i',
        's',
        'u'
    ],
    'requireSpecificAttributes': [{
        'abbr': 'title'
    }, {
        'html': 'lang'
    }, {
        'meter': [
            'min',
            'max'
        ]
    }, {
        'ol': 'type'
    }, {
        'progress': 'max'
    }, {
        'script[async]': 'defer'
    }],
    'validateAttributeQuoteMarks': true
};