import { inject as service } from '@ember-decorators/service';
import Route from '@ember/routing/route';
import RouterService from '@ember/routing/router-service';
import Metrics from 'ember-metrics/services/metrics';

export default class ApplicationRoute extends Route {
  @service public metrics!: Metrics;
  @service public router!: RouterService;

  constructor(properties?: object) {
    super(properties);

    this.on('routeDidChange', () => {
      this.metrics.trackPage({
        page: this.router.currentURL,
        title: this.router.currentRouteName || 'unknown'
      });
    });
  }
}
