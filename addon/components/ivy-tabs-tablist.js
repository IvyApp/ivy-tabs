import Component from '@ember/component';
import { isNone } from '@ember/utils';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import layout from '../templates/components/ivy-tabs-tablist';
import { once, scheduleOnce } from '@ember/runloop';

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
    this.get('tabsContainer').registerTabList(this);
    once(this, this.selectTab);
  },

  _unregisterWithTabsContainer() {
    this.get('tabsContainer').unregisterTabList(this);
  },

  /**
   * Tells screenreaders that only one tab can be selected at a time.
   *
   * @property aria-multiselectable
   * @type String
   * @default 'false'
   */
  'aria-multiselectable': 'false',

  /**
   * The `role` attribute of the tab list element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tablist
   *
   * @property ariaRole
   * @type String
   * @default 'tablist'
   */
  ariaRole: 'tablist',

  attributeBindings: ['aria-multiselectable'],

  classNames: ['ivy-tabs-tablist'],

  /**
   * Gives focus to the selected tab.
   *
   * @method focusSelectedTab
   */
  focusSelectedTab() {
    this.get('selectedTab').element.focus();
  },

  init() {
    this._super(...arguments);
    once(this, this._registerWithTabsContainer);
  },

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
      case 37: /* left */
      case 38 /* up */:
        this.selectPreviousTab();
        break;
      case 39: /* right */
      case 40 /* down */:
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
    this.get('tabs').pushObject(tab);
    once(this, this.selectTab);
  },

  /**
   * Selects the next tab in the list, if any.
   *
   * @method selectNextTab
   */
  selectNextTab() {
    const selectedTab = this.get('selectedTab');
    const tabs = this.get('tabs');
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
    const selectedTab = this.get('selectedTab');
    const tabs = this.get('tabs');
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
    const selection = this.get('selection');

    if (isNone(selection) || this.get('tabs.length') === 1) {
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
    const tab = this.get('tabs').objectAt(index);

    if (tab) {
      tab.select();
    }
  },

  selectTabByModel(model) {
    const tab = this.get('tabs').findBy('model', model);

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
    return this.get('tabs').findBy('model', this.get('selection'));
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

    this.get('tabs').removeObject(tab);
  },

  willDestroy() {
    this._super(...arguments);
    once(this, this._unregisterWithTabsContainer);
  }
});
