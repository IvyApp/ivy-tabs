import Route from '@ember/routing/route';

export default Route.extend({
  setupController() {
    this.send('setCurrentTab', 'tab-a');
    return this._super(...arguments);
  }
});
