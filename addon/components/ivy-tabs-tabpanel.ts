import { attribute, className, classNames } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { reads } from '@ember-decorators/object/computed';
import MutableArray from '@ember/array/mutable';
import Component from '@ember/component';
import { once } from '@ember/runloop';
import IvyTabs from './ivy-tabs';
import IvyTabsTab from './ivy-tabs-tab';

@classNames('ivy-tabs-tabpanel')
export default class IvyTabsTabpanel<Model> extends Component {
  /**
   * Accessed as a className binding to apply the panel's `activeClass` CSS
   * class to the element when the panel's `isSelected` property is true.
   *
   * @property active
   * @readOnly
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
   * Tells screenreaders whether or not the panel is visible.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
   *
   * @property aria-hidden
   * @readOnly
   */
  @attribute('aria-hidden')
  @computed('isSelected')
  get ariaHidden() {
    return `${!this.isSelected}`;
  }

  /**
   * Whether or not this panel's associated tab is selected.
   *
   * @property isSelected
   * @readOnly
   */
  @computed('model', 'selection')
  get isSelected() {
    return this.model === this.selection;
  }

  /**
   * The `ivy-tabs-tab` associated with this panel.
   *
   * @property tab
   */
  @computed('model', 'tabs.@each.model')
  get tab() {
    if (!this.tabs) {
      return;
    }
    return this.tabs.findBy('model', this.model);
  }

  /**
   * Makes the selected tab keyboard tabbable, and prevents tabs from getting
   * focus when clicked with a mouse.
   *
   * @property tabindex
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

  public selection: Model | null = null;

  /**
   * The CSS class to apply to a panel's element when its `isSelected` property
   * is `true`.
   *
   * @property activeClass
   * @default 'active'
   */
  public activeClass: string = 'active';

  /**
   * Tells screenreaders which tab labels this panel.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
   *
   * @property aria-labelledby
   * @readOnly
   */
  @attribute
  @reads('tab.elementId')
  public 'aria-labelledby': string;

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property ariaRole
   * @default 'tabpanel'
   */
  public ariaRole = 'tabpanel';

  /**
   * Object to uniquely identify this tab within the tabList.
   *
   * @property model
   */
  public model: Model | null = null;

  /**
   * The array of all `ivy-tabs-tab` instances within the `ivy-tabs-tablist` component.
   *
   * @property tabs
   * @readOnly
   */
  @reads('tabsContainer.tabList.tabs')
  public readonly tabs!: MutableArray<IvyTabsTab<Model>>;

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @default null
   */
  public tabsContainer: IvyTabs<Model> | null = null;

  constructor(properties?: object) {
    super(properties);
    once(this, this._registerWithTabsContainer);
  }

  public willDestroy() {
    super.willDestroy();
    once(this, this._unregisterWithTabsContainer);
  }

  private _registerWithTabsContainer() {
    if (!this.tabsContainer) {
      return;
    }
    this.tabsContainer.registerTabPanel(this);
  }

  private _unregisterWithTabsContainer() {
    if (!this.tabsContainer) {
      return;
    }
    this.tabsContainer.unregisterTabPanel(this);
  }
}
