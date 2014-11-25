/* jshint node: true */
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');
var compileES6 = require('broccoli-es6-concatenator');
var es3Safe = require('broccoli-es3-safe-recast');
var Funnel = require('broccoli-funnel');
var replace = require('broccoli-replace');
var registry = require('./registry');
var wrap = require('./wrap');
var packageDetails = require('../package.json');
var version = packageDetails.version;
var name = packageDetails.name;

var appTree = pickFiles('../app', { srcDir: '/', destDir: 'app'});

var addonTree = pickFiles('../addon', {srcDir: '/', destDir: name});
var precompiled = mergeTrees([addonTree, appTree]);
var registrations = registry(pickFiles(precompiled, {srcDir: '/app', destDir: '/'}));
var bower = pickFiles('../bower_components', {srcDir: '/loader.js', destDir: '/'});
var glue = new Funnel('.', { include: [/^glue\.js$/] });

var jsTree = mergeTrees([glue, mergeTrees([precompiled, registrations, bower])]);

var compiled = compileES6(jsTree, {
  wrapInEval: false,
  loaderFile: 'loader.js',
  inputFiles: [ name + '/index.js', 'app/**/*.js'],
  ignoredModules: ['ember', name],
  outputFile: '/' + name + '-' + version + '.js',
  legacyFilesToAppend: ['registry-output.js', 'glue.js']
});
compiled = wrap(compiled);
compiled = es3Safe(compiled);

var packageManagersTree = pickFiles('./package_manager_files', {
  srcDir: '/',
  destDir: '/'
});

var distTree = replace(mergeTrees([compiled, packageManagersTree]), {
  files: ['**/*.js', '**/*.json'],
  patterns: [
    { match: /VERSION_STRING_PLACEHOLDER/g, replacement: version }
  ]
});

module.exports = distTree;
