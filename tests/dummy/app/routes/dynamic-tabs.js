import Route from 'ember-route';
import { A } from 'ember-array/utils';

export default Route.extend({
  model() {
    return A();
  }
});
