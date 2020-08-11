import Component from '@ember/component';
import layout from '../templates/components/ivy-tabs-tablist';
import { A } from '@ember/array';
import { computed } from '@ember/object';
import { empty } from '@ember/object/computed';
import { isNone } from '@ember/utils';
import { once, scheduleOnce } from '@ember/runloop';

export const DOWN_ARROW = 40;
export const LEFT_ARROW = 37;
export const RIGHT_ARROW = 39;
export const UP_ARROW = 38;

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabListComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Component.extend({
  _registerWithTabsContainer() {
    this.tabsContainer.registerTabList(this);
    once(this, this.selectTab);
  },

  _unregisterWithTabsContainer() {
    this.tabsContainer.unregisterTabList(this);
  },

  /**
   * The label of the tablist for screenreaders to use.
   *
   * @property aria-label
   * @type String
   * @default ''
   */
  'aria-label': '',

  /**
   * Tells screenreaders to notify the user during DOM modifications.
   *
   * @property aria-live
   * @type String
   * @default 'polite'
   */
  'aria-live': 'polite',

  /**
   * Tells screenreaders that only one tab can be selected at a time.
   *
   * @property aria-multiselectable
   * @type String
   * @default 'false'
   */
  'aria-multiselectable': computed('isEmpty', function() {
    if (!this.isEmpty) {
      return 'false';
    }
    return undefined;
  }).readOnly(),

  /**
   * Tells screenreaders which DOM modification activites to monitor for user
   * notification.
   *
   * @property aria-relevant
   * @type String
   * @default 'all'
   */
  'aria-relevant': 'all',

  /**
   * The `role` attribute of the tab list element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tablist
   *
   * @property ariaRole
   * @type String
   * @default 'tablist'
   */
  ariaRole: computed('isEmpty', function() {
    if (!this.isEmpty) {
      return 'tablist';
    } else {
      // FIXME: Ember 3.1.0-beta.1 introduced a bug which does not bind/watch
      // ariaRole changes if it's initially falsy. This sets a non-falsy,
      // "safe" value for ariaRole until it can be a "tablist" when Tabs are
      // added.
      return 'presentation';
    }
  }).readOnly(),

  attributeBindings: [
    'aria-label',
    'aria-live',
    'aria-multiselectable',
    'aria-relevant'
  ],

  classNames: ['ivy-tabs-tablist'],

  /**
   * Gives focus to the selected tab.
   *
   * @method focusSelectedTab
   */
  focusSelectedTab() {
    this.selectedTab.element.focus();
  },

  init() {
    this._super(...arguments);
    once(this, this._registerWithTabsContainer);
  },

  isEmpty: empty('tabs'),

  /**
   * Event handler for navigating tabs via arrow keys. The left (or up) arrow
   * selects the previous tab, while the right (or down) arrow selects the next
   * tab.
   *
   * @method keyDown
   * @param {Event} event
   */
  keyDown(event) {
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
  },

  layout: layout,

  /**
   * Adds a tab to the `tabs` array.
   *
   * @method registerTab
   * @param {IvyTabs.IvyTabComponent} tab
   */
  registerTab(tab) {
    this.tabs.pushObject(tab);
    once(this, this.selectTab);
  },

  /**
   * Selects the next tab in the list, if any.
   *
   * @method selectNextTab
   */
  selectNextTab() {
    const selectedTab = this.selectedTab;
    const tabs = this.tabs;
    const length = tabs.get('length');

    let idx = selectedTab.get('index');
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
  },

  /**
   * Selects the previous tab in the list, if any.
   *
   * @method selectPreviousTab
   */
  selectPreviousTab() {
    const selectedTab = this.selectedTab;
    const tabs = this.tabs;
    const length = tabs.get('length');

    let idx = selectedTab.get('index');
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
  },

  selectTab() {
    const selection = this.selection;

    if (isNone(selection) || this.tabs.length === 1) {
      this.selectTabByIndex(0);
    } else {
      this.selectTabByModel(selection);
    }
  },

  /**
   * Select the tab at `index`.
   *
   * @method selectTabByIndex
   * @param {Number} index
   */
  selectTabByIndex(index) {
    const tab = this.tabs.objectAt(index);

    if (tab) {
      tab.select();
    }
  },

  selectTabByModel(model) {
    const tab = this.tabs.findBy('model', model);

    if (tab) {
      tab.select();
    }
  },

  /**
   * The currently-selected `ivy-tabs-tab` instance.
   *
   * @property selectedTab
   * @type IvyTabs.IvyTabComponent
   */
  selectedTab: computed('selection', 'tabs.@each.model', function() {
    return this.tabs.findBy('model', this.selection);
  }),

  tabs: computed(function() {
    return A();
  }).readOnly(),

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type IvyTabs.IvyTabsComponent
   * @default null
   */
  tabsContainer: null,

  /**
   * Removes a tab from the `tabs` array.
   *
   * @method unregisterTab
   * @param {IvyTabs.IvyTabComponent} tab
   */
  unregisterTab(tab) {
    const index = tab.get('index');

    if (tab.get('isSelected')) {
      if (index === 0) {
        this.selectNextTab();
      } else {
        this.selectPreviousTab();
      }
    }

    this.tabs.removeObject(tab);
  },

  willDestroy() {
    this._super(...arguments);
    once(this, this._unregisterWithTabsContainer);
  }
});
