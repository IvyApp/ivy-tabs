import { inject as service } from '@ember/service';
import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([routeName, models, options]) {
    // urlFor is sensitive to the number of arguments passed, so only specify what we have.
    if (!models && !options) {
      return this.router.urlFor(routeName);
    } else if (models) {
      return this.router.urlFor(routeName, models);
    } else {
      return this.router.urlFor(routeName, models, options);
    }
  },

  router: service(),
});
