'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 *  The configuration file for file formatting.
 *
 *  @name   format.js
 */

//  EXPORTS

let css = exports.css = {
    'indent': '    ',
    'openbrace': 'end-of-line',
    'autosemicolon': true
};

let js = exports.js = {
    'indent_size': 4,
    'indent_char': ' ',
    'eol': '\n',
    'indent_level': 0,
    'indent_with_tabs': false,
    'preserve_newlines': true,
    'max_preserve_newlines': 2,
    'jslint_happy': true,
    'space_after_anon_function': true,
    'brace_style': 'collapse',
    'break_chained_methods': true,
    'keep_array_indentation': false,
    'keep_function_indentation': false,
    'space_before_conditional': true,
    'eval_code': false,
    'unescape_strings': false,
    'wrap_line_length': 0,
    'wrap_attributes': 'auto',
    'wrap_attributes_indent_size': 4,
    'end_with_newline': false,
    'comma-first': false
};