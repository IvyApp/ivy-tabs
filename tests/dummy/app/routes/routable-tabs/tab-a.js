import Route from '@ember/routing/route';

export default class TabARoute extends Route {
  setupController() {
    this.send('setCurrentTab', 'tab-a');
    return super.setupController(...arguments);
  }
}
