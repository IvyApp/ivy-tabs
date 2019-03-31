import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.on('routeDidChange', () => {
      const page = this.get('router.url');
      const title = this.getWithDefault('currentRouteName', 'unknown');
      this.get('metrics').trackPage({ page, title });
    });
  },

  metrics: service(),

  router: service()
});
