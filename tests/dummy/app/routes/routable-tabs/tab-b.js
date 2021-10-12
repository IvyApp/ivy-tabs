import Route from '@ember/routing/route';

export default class TabBRoute extends Route {
  setupController() {
    this.send('setCurrentTab', 'tab-b');
    return super.setupController(...arguments);
  }
}
