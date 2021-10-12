import EmberRouter from '@ember/routing/router';
import config from 'dummy/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('dynamic-tabs');
  this.route('query-params');
  this.route('routable-tabs', function () {
    this.route('tab-a');
    this.route('tab-b');
    this.route('tab-c');
  });
});
