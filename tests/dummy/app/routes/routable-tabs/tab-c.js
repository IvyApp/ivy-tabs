import Route from '@ember/routing/route';

export default class TabCRoute extends Route {
  setupController() {
    this.send('setCurrentTab', 'tab-c');
    return super.setupController(...arguments);
  }
}
