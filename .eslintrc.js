module.exports = {
  extends: 'airbnb-base',
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    commonjs: true
  },
  'globals': {
    Promise: 0
  },
  'rules': {
    'no-unused-vars': 2,
    'arrow-parens': 1,
    'generator-star-spacing': 1,
    'no-debugger': 1,
    'space-before-function-paren': [2, 'always'],
    'spaced-comment': [2, 'always'],
    'semi': [2, 'never'],
    "indent": ['error', 4, { 'SwitchCase': 1 }],
    'no-console': 1,
    'no-multi-spaces': 2,
    'array-bracket-spacing': [2, 'always'],
    'consistent-this': [2, 'self', 'that'],
    'quote-props': [2, 'consistent-as-needed'],
    'curly': 2,
    'default-case': 2,
    'eqeqeq': [2, 'smart'],
    'max-len': [2, 200],
    'object-curly-newline': 0,
    'no-return-assign': 0,
    'no-param-reassign': 0,
  }
}
