import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class RoutableTabsController extends Controller {
  @action
  switchToTab(tab) {
    this.send('transitionToTab', tab);
  }
}
