import { action } from '@ember-decorators/object';
import { empty, filterBy } from '@ember-decorators/object/computed';
import MutableArray from '@ember/array/mutable';
import Controller from '@ember/controller';

interface Item {
  checked: boolean;
  index: number;
}

export default class DynamicTabs extends Controller {
  @filterBy('model', 'checked', true)
  public checkedItems!: MutableArray<Item>;

  public model!: MutableArray<Item>;

  public nextIndex = 0;

  @empty('checkedItems')
  public noCheckedItems!: boolean;

  @action
  public addItem() {
    this.model.pushObject({
      checked: false,
      index: this.incrementProperty('nextIndex')
    });
  }

  @action
  public removeItem(item: Item) {
    this.model.removeObject(item);
  }

  @action
  public removeSelected() {
    this.model.removeObjects(this.checkedItems);
  }
}
