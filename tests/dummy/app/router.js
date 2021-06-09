import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dynamic-tabs');
  this.route('query-params');
  this.route('routable-tabs', function() {
    this.route('tab-a');
    this.route('tab-b');
    this.route('tab-c');
  });
});

export default Router;
