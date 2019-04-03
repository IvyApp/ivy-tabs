import Application from '@ember/application';
import loadInitializers from 'ember-load-initializers';
import config from './config/environment';
import Resolver from './resolver';

const App = Application.extend({
  Resolver,
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix
});

loadInitializers(App, config.modulePrefix);

export default App;
