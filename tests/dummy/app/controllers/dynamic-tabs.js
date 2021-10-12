import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

class ModelObject {
  @tracked checked = false;
  @tracked index;
  constructor(index) {
    this.index = index;
  }
}

export default class DynamicTabsController extends Controller {
  @action
  addItem() {
    this.model.pushObject(new ModelObject(++this.nextIndex));
  }

  @action
  removeItem(item) {
    this.model.removeObject(item);
  }

  @action
  removeSelected() {
    this.model.removeObjects(this.checkedItems);
  }

  @action
  updateSelection(item) {
    this.selection = item;
  }

  get checkedItems() {
    let result = [];
    for (let i = 0; i < this.model.length; i++) {
      if (this.model[i].checked) {
        result.push(this.model[i]);
      }
    }
    return result;
  }

  @tracked
  nextIndex = 0;

  get noCheckedItems() {
    return this.checkedItems.length === 0;
  }
  @tracked
  selection = null;
}
