import { A } from '@ember/array';
import Route from '@ember/routing/route';

export default class DynamicTabsRoute extends Route {
  public model() {
    return A();
  }
}
