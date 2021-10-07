import Controller from '@ember/controller';
import EmberObject from '@ember/object';
import { empty, filterBy } from '@ember/object/computed';

export default Controller.extend({
  actions: {
    addItem() {
      this.model.pushObject(
        EmberObject.create({
          checked: false,
          index: this.incrementProperty('nextIndex'),
        })
      );
    },

    removeItem(item) {
      this.model.removeObject(item);
    },

    removeSelected() {
      this.model.removeObjects(this.checkedItems);
    },
  },

  checkedItems: filterBy('model', 'checked', true),

  nextIndex: 0,

  noCheckedItems: empty('checkedItems'),
});
