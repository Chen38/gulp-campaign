// http://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    commonjs: true
  },
  'globals': {},
  'rules': {
    'no-unused-vars': 2,
    'arrow-parens': 1,
    'generator-star-spacing': 1,
    'no-debugger': 1,
    'space-before-function-paren': 1,
    'semi': 2,
    'no-console': 1,
    'consistent-this': [2, 'self', 'that'],
    'curly': 2,
    'default-case': 2,
    'eqeqeq': [2, 'always', { 'null': 'ignore' }],
    'for-direction': 2,
    'max-depth': 2,
    'max-params': 2,
    'new-cap': 2,
    'new-parens': 2,
    'space-before-function-paren': 0,
    'no-array-constructor': 2,
    'no-await-in-loop': 2,
    'no-delete-var': 2,
    'no-dupe-args': 2,
    'no-dupe-keys': 2,
    'no-duplicate-case': 2,
    'no-empty-function': 2,
    'no-eval': 2,
    'no-extra-semi': 2,
    'no-global-assign': 2,
    'no-alert': 1,
    'no-case-declarations': 2,
    'no-empty': [2, { 'allowEmptyCatch': true }],
    'no-implied-eval': 2,
    'no-new': 2,
    'no-obj-calls': 2,
    'no-redeclare': 2,
    'no-shadow-restricted-names': 2,
    'no-shadow': 2,
    'no-this-before-super': 2,
    'no-trailing-spaces': [2, {
      "skipBlankLines": true,
      "ignoreComments": true
    }],
    'valid-typeof': 2,
    'space-infix-ops': 2,
    'radix': 2,
    'no-undef': 2,
    'no-undefined': 2,
    'no-use-before-define': [2,
      {
        'functions': false,
        'classes': false,
      }
    ],
    'no-useless-escape': 2,
    'prefer-promise-reject-errors': 2,
    'quotes': [2, 'single', {
      'avoidEscape': true,
      'allowTemplateLiterals': true,
    }]
  }
}
