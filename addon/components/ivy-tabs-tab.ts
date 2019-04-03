import {
  attribute,
  className,
  classNames,
  tagName
} from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { reads } from '@ember-decorators/object/computed';
import MutableArray from '@ember/array/mutable';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import IvyTabs from './ivy-tabs';
import IvyTabsTablist from './ivy-tabs-tablist';
import IvyTabsTabpanel from './ivy-tabs-tabpanel';

@classNames('ivy-tabs-tab')
@tagName('a')
export default class IvyTabsTab<Model> extends Component {
  /**
   * Accessed as a className binding to apply the tab's `activeClass` CSS class
   * to the element when the tab's `isSelected` property is true.
   */
  @className
  @computed('isSelected')
  get active() {
    if (!this.isSelected) {
      return;
    }
    return this.activeClass;
  }

  /**
   * Tells screenreaders whether or not this tab is selected.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-selected
   */
  @attribute('aria-selected')
  @computed('isSelected')
  get ariaSelected() {
    return this.isSelected + ''; // coerce to 'true' or 'false'
  }

  @attribute
  @computed('tabPanel.elementId', 'tagName')
  get href() {
    if (this.tagName !== 'a' || !this.tabPanel) {
      return;
    }

    return '#' + this.tabPanel.elementId;
  }

  /**
   * The index of this tab in the `ivy-tabs-tablist` component.
   */
  @computed('tabs.[]')
  get index() {
    return this.tabs.indexOf(this);
  }

  /**
   * Whether or not this tab is selected.
   */
  @computed('tabList.selectedTab')
  get isSelected() {
    return this.tabList.selectedTab === this;
  }

  /**
   * The `selected` attribute of the tab element. If the tab's `isSelected`
   * property is `true` this will be the literal string 'selected', otherwise
   * it will be `undefined`.
   */
  @attribute
  @computed('isSelected')
  get selected() {
    if (!this.isSelected) {
      return;
    }
    return 'selected';
  }

  /**
   * The `ivy-tabs-tabpanel` associated with this tab.
   */
  @computed('tabPanels.@each.model', 'model')
  get tabPanel() {
    return this.tabPanels.findBy('model', this.model);
  }

  /**
   * Makes the selected tab keyboard tabbable, and prevents tabs from getting
   * focus when clicked with a mouse.
   */
  @attribute
  @computed('isSelected')
  get tabindex() {
    if (!this.isSelected) {
      return;
    }
    return 0;
  }

  public static positionalParams = ['model'];

  /**
   * The CSS class to apply to a tab's element when its `isSelected` property
   * is `true`.
   */
  public activeClass: string = 'active';

  /**
   * Tells screenreaders which panel this tab controls.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-controls
   */
  @attribute
  @reads('tabPanel.elementId')
  public readonly 'aria-controls': string;

  /**
   * Tells screenreaders whether or not this tab's panel is expanded.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
   */
  @attribute
  @reads('ariaSelected')
  public readonly 'aria-expanded': 'false' | 'true';

  /**
   * The `role` attribute of the tab element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tab
   */
  public ariaRole: string = 'tab';

  /**
   * Object to uniquely identify this tab within the tabList.
   */
  public model: Model | null = null;

  /**
   * The `ivy-tabs-tablist` component this tab belongs to.
   */
  public tabList!: IvyTabsTablist<Model>;

  /**
   * The array of all `ivy-tabs-tabpanel` instances within the `ivy-tabs`
   * component.
   */
  @reads('tabsContainer.tabPanels')
  public readonly tabPanels!: MutableArray<IvyTabsTabpanel<Model>>;

  /**
   * The array of all `ivy-tabs-tab` instances within the `ivy-tabs-tablist` component.
   */
  @reads('tabList.tabs')
  public readonly tabs!: MutableArray<IvyTabsTab<Model>>;

  /**
   * The `ivy-tabs` component.
   */
  @reads('tabList.tabsContainer')
  public readonly tabsContainer!: IvyTabs<Model>;

  public 'on-select'?: (model: Model) => void;

  constructor(properties?: object) {
    super(properties);
    once(this, this._registerWithTabList);
  }

  public click(event: Event) {
    event.preventDefault();
    this.select();
  }

  /**
   * Called when the user clicks on the tab. Selects this tab.
   */
  public select() {
    const onSelect = this['on-select'];

    if (!this.isDestroying && typeof onSelect === 'function' && !!this.model) {
      onSelect(this.model);
    }
  }

  public willDestroy() {
    super.willDestroy();
    once(this, this._unregisterWithTabList);
  }

  private _registerWithTabList() {
    this.tabList.registerTab(this);
  }

  private _unregisterWithTabList() {
    this.tabList.unregisterTab(this);
  }
}
