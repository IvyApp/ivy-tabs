import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';
import { scheduleOnce } from '@ember/runloop';

const Router = EmberRouter.extend({
  _trackPage() {
    scheduleOnce('afterRender', this, () => {
      const page = this.get('url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      this.get('metrics').trackPage({ page, title });
    });
  },

  didTransition() {
    this._super(...arguments);
    this._trackPage();
  },

  location: config.locationType,

  metrics: service(),

  rootURL: config.rootURL
});

Router.map(function() {
  this.route('dynamic-tabs');
  this.route('query-params');
});

export default Router;
