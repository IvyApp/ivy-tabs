/* jshint node:true */

var autoRegister = require('broccoli-ember-auto-register');
var compileES6 = require('broccoli-es6-concatenator');
var es3Safe = require('broccoli-es3-safe-recast');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var replace = require('broccoli-replace');
var wrap = require('./wrap');

var packageDetails = require('../package.json');
var packageName = packageDetails.name;
var version = packageDetails.version;

var addonTree = pickFiles('../addon', {
  srcDir: '/',
  destDir: packageName
});

var appTree = pickFiles('../app', {
  srcDir: '/',
  destDir: '/app'
});

var registrations = autoRegister(pickFiles(appTree, {
  srcDir: '/app',
  files: ['**/*.js'],
  destDir: '/'
}), {
  moduleName: packageName + '-shim',
  modulePrefix: packageName,
  outputFile: 'registry-output.js'
});

var loaderTree = pickFiles('../bower_components', {
  srcDir: '/loader.js',
  destDir: '/'
});

var glueTree = pickFiles('.', {
  files: ['glue.js'],
  srcDir: '/',
  destDir: '/'
});

var jsTree = mergeTrees([glueTree, addonTree, appTree, registrations, loaderTree]);

var compiledJsTree = compileES6(jsTree, {
  wrapInEval: false,
  loaderFile: 'loader.js',
  inputFiles: [packageName + '/index.js', 'app/**/*.js'],
  ignoredModules: ['ember', packageName],
  outputFile: '/' + packageName + '-' + version + '.js',
  legacyFilesToAppend: ['registry-output.js', 'glue.js']
});
compiledJsTree = es3Safe(compiledJsTree);
compiledJsTree = wrap(compiledJsTree);

var packageTree = pickFiles('package_manager_files', {
  srcDir: '/',
  destDir: '/'
});

var distTree = replace(mergeTrees([compiledJsTree, packageTree]), {
  files: ['**/*.js', '**/*.json'],
  patterns: [
    { match: /VERSION_STRING_PLACEHOLDER/g, replacement: version }
  ]
});

module.exports = distTree;
