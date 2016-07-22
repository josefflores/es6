/**
 *  The configuration file for file formatting.
 *
 *  @name   format.js
 */

//  EXPORTS

export let css = {
    'indent': '    ',
    'openbrace': 'end_of_line',
    'autosemicolon': true
};

export let js = {
    'indent_size': 4,
    'indent_char': '',
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
    'comma_first': false
};

export let html = {
    'indent_size': 8,
    'indent_char': '',
    'indent_with_tabs': false,
    'eol': '\n',
    'end_with_newline': false,
    'preserve_newlines': true,
    'max_preserve_newlines': 2,
    'indent_inner_html': false,
    'brace_style': 'collapse',
    'indent_scripts': 'normal',
    'wrap_line_length': 0,
    'wrap_attributes': 'auto',
    'wrap_attributes_indent_size': 'indent_size',
    'unformatted': 'inline',
    'extra_liners': '[head,body,/html]'
};