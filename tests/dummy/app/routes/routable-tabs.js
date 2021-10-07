import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default Route.extend({
  router: service(),

  actions: {
    setCurrentTab(value) {
      this.controller.currentTab = value;
    },
    transitionToTab(tab) {
      this.router.transitionTo(`routable-tabs.${tab}`);
    },
  },
});
