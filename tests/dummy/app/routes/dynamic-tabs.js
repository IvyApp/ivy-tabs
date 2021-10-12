import Route from '@ember/routing/route';
import { A } from '@ember/array';

export default class DynamicTabsRoute extends Route {
  model() {
    return A();
  }
}
