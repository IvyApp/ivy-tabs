import Controller from 'ember-controller';
import EmberObject from 'ember-object';

export default Controller.extend({
  actions: {
    addItem() {
      this.get('model').pushObject(EmberObject.create({
        index: this.incrementProperty('nextIndex')
      }));
    },

    removeItem(item) {
      this.get('model').removeObject(item);
    }
  },

  nextIndex: 0
});
