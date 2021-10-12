import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class RoutableTabs extends Route {
  @service router;

  @tracked currentTab = null;

  setupController(controller) {
    return super.setupController(controller, this.currentTab);
  }

  @action
  setCurrentTab(value) {
    this.currentTab = value;
  }

  @action
  transitionToTab(tab) {
    this.router.transitionTo(`routable-tabs.${tab}`);
  }
}
