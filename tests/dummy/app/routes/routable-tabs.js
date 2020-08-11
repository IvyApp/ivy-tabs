import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    setCurrentTab(value) {
      this.controller.currentTab = value;
    },
    transitionToTab(tab) {
      this.transitionTo(`routable-tabs.${tab}`);
    }
  }
});
