var distES6 = require('broccoli-dist-es6-module');

module.exports = distES6('lib', {
  global: 'ivy.tabs',
  packageName: 'ivy-tabs',
  main: 'main',
  shim: {
    'ember': 'Ember'
  }
});
