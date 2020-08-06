'use strict';

module.exports = {
  env: {
    browser: true
  },
  overrides: [
    // node files
    {
      env: {
        browser: false,
        node: true
      },
      excludedFiles: [
        'addon/**',
        'addon-test-support/**',
        'app/**',
        'tests/dummy/app/**'
      ],
      files: [
        '.eslintrc.js',
        '.template-lintrc.js',
        'commitlint.config.js',
        'ember-cli-build.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'prettier.config.js',
        'tests/dummy/config/**/*.js'
      ],
      parserOptions: {
        ecmaVersion: 2015,
        sourceType: 'script'
      },
      plugins: ['node'],
      extends: ['plugin:node/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: ['ember'],
  root: true,
  rules: {
    'sort-keys': 'error'
  }
};
