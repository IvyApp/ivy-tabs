var distES6 = require('broccoli-dist-es6-module');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var replace = require('broccoli-replace');
var getVersion = require('git-repo-version');

var distTrees = [];

distTrees.push(pickFiles('config/package_manager_files', {
  srcDir: '/',
  destDir: '/'
}));

distTrees.push(distES6('lib', {
  global: 'ivy.tabs',
  packageName: 'ivy-tabs',
  main: 'main',
  shim: {
    'ember': 'Ember'
  }
}));

distTrees = mergeTrees(distTrees);
distTrees = replace(distTrees, {
  files: ['**/*.js', '**/*.json'],
  patterns: [
    { match: /VERSION_STRING_PLACEHOLDER/g, replacement: getVersion() }
  ]
});

module.exports = distTrees;
