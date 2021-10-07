import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),

  // if the user manually enters the routable-tabs route, be sure to redirect
  // to a known good instead.
  redirect() {
    this.router.transitionTo('routable-tabs.tab-a');
  },
});
