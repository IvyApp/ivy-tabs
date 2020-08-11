import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    switchToTab(tab) {
      this.send('transitionToTab', tab);
    }
  },
  currentTab: null,
});
