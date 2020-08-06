import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  init() {
    this._super(...arguments);

    this.on('routeDidChange', () => {
      const page = this.router.url;
      const title = this.currentRouteName || 'unknown';
      this.metrics.trackPage({ page, title });
    });
  },

  metrics: service(),

  router: service()
});
