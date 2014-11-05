var getVersion = require('git-repo-version');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var replace = require('broccoli-replace');
var transpileES6 = require('broccoli-es6-module-transpiler');

var distTrees = [];

distTrees.push(transpileES6('lib', {
  formatter: 'bundle',
  output: '/ivy-tabs.js'
}));

distTrees.push(pickFiles('config/package_manager_files', {
  srcDir: '/',
  destDir: '/'
}));

var distTree = mergeTrees(distTrees);
distTree = replace(distTree, {
  files: ['**/*.js', '**/*.json'],
  patterns: [
    { match: /VERSION_STRING_PLACEHOLDER/g, replacement: getVersion() }
  ]
});

module.exports = distTree;
