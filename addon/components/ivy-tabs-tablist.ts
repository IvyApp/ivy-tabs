import { attribute, classNames } from '@ember-decorators/component';
import { computed } from '@ember-decorators/object';
import { empty } from '@ember-decorators/object/computed';
import { A } from '@ember/array';
import Component from '@ember/component';
import { once, scheduleOnce } from '@ember/runloop';
import { isNone } from '@ember/utils';
// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/ivy-tabs-tablist';
import IvyTabs from './ivy-tabs';
import IvyTabsTab from './ivy-tabs-tab';

export const DOWN_ARROW = 40;
export const LEFT_ARROW = 37;
export const RIGHT_ARROW = 39;
export const UP_ARROW = 38;

@classNames('ivy-tabs-tablist')
export default class IvyTabsTablist<Model> extends Component {
  /**
   * Tells screenreaders that only one tab can be selected at a time.
   */
  @attribute('aria-multiselectable')
  @computed('isEmpty')
  get ariaMultiselectable() {
    if (this.isEmpty) {
      return;
    }
    return 'false';
  }

  /**
   * The `role` attribute of the tab list element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tablist
   */
  @computed('isEmpty')
  get ariaRole() {
    if (!this.isEmpty) {
      return 'tablist';
    } else {
      // FIXME: Ember 3.1.0-beta.1 introduced a bug which does not bind/watch
      // ariaRole changes if it's initially falsy. This sets a non-falsy,
      // "safe" value for ariaRole until it can be a "tablist" when Tabs are
      // added.
      return 'presentation';
    }
  }

  /**
   * The currently-selected `ivy-tabs-tab` instance.
   */
  @computed('selection', 'tabs.@each.model')
  get selectedTab() {
    return this.tabs.findBy('model', this.selection);
  }

  /**
   * The label of the tablist for screenreaders to use.
   */
  @attribute
  public 'aria-label': string = '';

  /**
   * Tells screenreaders to notify the user during DOM modifications.
   */
  @attribute
  public 'aria-live': string = 'polite';

  /**
   * Tells screenreaders which DOM modification activites to monitor for user
   * notification.
   */
  @attribute
  public 'aria-relevant': string = 'all';

  @empty('tabs')
  public isEmpty!: boolean;

  public layout = layout;

  public readonly tabs = A<IvyTabsTab<Model>>();

  /**
   * The `ivy-tabs` component.
   */
  public tabsContainer!: IvyTabs<Model>;

  public selection: Model | null = null;

  constructor(properties?: object) {
    super(properties);
    once(this, this._registerWithTabsContainer);
  }

  /**
   * Gives focus to the selected tab.
   */
  public focusSelectedTab() {
    if (!this.selectedTab || !this.selectedTab.element) {
      return;
    }
    (this.selectedTab.element as HTMLElement).focus();
  }

  /**
   * Event handler for navigating tabs via arrow keys. The left (or up) arrow
   * selects the previous tab, while the right (or down) arrow selects the next
   * tab.
   */
  public keyDown(event: KeyboardEvent) {
    switch (event.keyCode) {
      case LEFT_ARROW:
      case UP_ARROW:
        this.selectPreviousTab();
        break;
      case RIGHT_ARROW:
      case DOWN_ARROW:
        this.selectNextTab();
        break;
      default:
        return;
    }

    event.preventDefault();
    scheduleOnce('afterRender', this, this.focusSelectedTab);
  }

  /**
   * Adds a tab to the `tabs` array.
   */
  public registerTab(tab: IvyTabsTab<Model>) {
    this.tabs.pushObject(tab);
    once(this, this.selectTab);
  }

  /**
   * Selects the next tab in the list, if any.
   */
  public selectNextTab() {
    const selectedTab = this.selectedTab;

    if (!selectedTab) {
      return;
    }

    const tabs = this.tabs;
    const length = tabs.length;

    let idx = selectedTab.index;
    let tab;

    do {
      idx++;
      // Next from the last tab should select the first tab.
      if (idx === length) {
        idx = 0;
      }

      tab = tabs.objectAt(idx);
    } while (tab && tab.isDestroying && tab !== selectedTab);

    if (tab) {
      tab.select();
    }
  }

  /**
   * Selects the previous tab in the list, if any.
   */
  public selectPreviousTab() {
    const selectedTab = this.selectedTab;

    if (!selectedTab) {
      return;
    }

    const tabs = this.tabs;
    const length = tabs.length;

    let idx = selectedTab.index;
    let tab;

    do {
      idx--;
      // Previous from the first tab should select the last tab.
      if (idx < 0) {
        idx = length - 1;
      }
      // This would only happen if there are no tabs, so stay at 0.
      if (idx < 0) {
        idx = 0;
      }

      tab = tabs.objectAt(idx);
    } while (tab && tab.isDestroying && tab !== selectedTab);

    if (tab) {
      tab.select();
    }
  }

  public selectTab() {
    const selection = this.selection;

    if (isNone(selection) || this.tabs.length === 1) {
      this.selectTabByIndex(0);
    } else {
      this.selectTabByModel(selection);
    }
  }

  /**
   * Select the tab at `index`.
   */
  public selectTabByIndex(index: number) {
    const tab = this.tabs.objectAt(index);

    if (tab) {
      tab.select();
    }
  }

  public selectTabByModel(model: Model) {
    const tab = this.tabs.findBy('model', model);

    if (tab) {
      tab.select();
    }
  }

  /**
   * Removes a tab from the `tabs` array.
   */
  public unregisterTab(tab: IvyTabsTab<Model>) {
    const index = tab.index;

    if (tab.isSelected) {
      if (index === 0) {
        this.selectNextTab();
      } else {
        this.selectPreviousTab();
      }
    }

    this.tabs.removeObject(tab);
  }

  public willDestroy() {
    super.willDestroy();
    once(this, this._unregisterWithTabsContainer);
  }

  private _registerWithTabsContainer() {
    this.tabsContainer.registerTabList(this);
    once(this, this.selectTab);
  }

  private _unregisterWithTabsContainer() {
    this.tabsContainer.unregisterTabList();
  }
}
