'use strict';

module.exports = {
  env: {
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended'
  ],
  overrides: [
    // node files
    {
      env: {
        browser: false,
        es6: true,
        node: true,
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
        'config/ember-try.js',
        'index.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'prettier.config.js',
        'tests/dummy/config/**/*.js'
      ],
      parserOptions: {
        ecmaVersion: 8,
        sourceType: 'script'
      },
      plugins: ['node'],
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
