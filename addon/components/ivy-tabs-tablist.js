import Ember from 'ember';
import layout from '../templates/components/ivy-tabs-tablist';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabListComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  layout: layout,

  attributeBindings: ['aria-multiselectable'],
  classNames: ['ivy-tabs-tablist'],

  init() {
    this._super(...arguments);
    Ember.run.once(this, this._registerWithTabsContainer);
  },

  willDestroy() {
    this._super(...arguments);
    Ember.run.once(this, this._unregisterWithTabsContainer);
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

  /**
   * Gives focus to the selected tab.
   *
   * @method focusSelectedTab
   */
  focusSelectedTab() {
    this.get('selectedTab').$().focus();
  },

  /**
   * Event handler for navigating tabs via arrow keys. The left (or up) arrow
   * selects the previous tab, while the right (or down) arrow selects the next
   * tab.
   *
   * @method navigateOnKeyDown
   * @param {Event} event
   */
  navigateOnKeyDown: Ember.on('keyDown', function(event) {
    switch (event.keyCode) {
    case 37: /* left */
    case 38: /* up */
      this.selectPreviousTab();
      break;
    case 39: /* right */
    case 40: /* down */
      this.selectNextTab();
      break;
    default:
      return;
    }

    event.preventDefault();
    Ember.run.scheduleOnce('afterRender', this, this.focusSelectedTab);
  }),

  /**
   * Adds a tab to the `tabs` array.
   *
   * @method registerTab
   * @param {IvyTabs.IvyTabComponent} tab
   */
  registerTab(tab) {
    const tabs = this.get('tabs');
    const tabsContainer = this.get('tabsContainer');
    tabs.pushObject(tab);

    Ember.run.once(tabsContainer, tabsContainer.selectTab);
  },

  /**
   * Selects the next tab in the list, if any.
   *
   * @method selectNextTab
   */
  selectNextTab() {
    const selectedTab = this.get('selectedTab');
    let index = selectedTab.get('index') + 1;
    if (index === this.get('tabs.length')) { index = 0; }
    this.selectTabByIndex(index);
  },

  /**
   * Selects the previous tab in the list, if any.
   *
   * @method selectPreviousTab
   */
  selectPreviousTab() {
    const selectedTab = this.get('selectedTab');
    let index = selectedTab.get('index') - 1;

    // Previous from the first tab should select the last tab.
    if (index < 0) { index = this.get('tabs.length') - 1; }
    // This would only happen if there are no tabs, so stay at 0.
    if (index < 0) { index = 0; }

    this.selectTabByIndex(index);
  },

  selection: Ember.computed.alias('tabsContainer.selection'),

  /**
   * The currently-selected `ivy-tabs-tab` instance.
   *
   * @property selectedTab
   * @type IvyTabs.IvyTabComponent
   */
  selectedTab: Ember.computed('selection', 'tabs.@each.model', function() {
    return this.get('tabs').findBy('model', this.get('selection'));
  }),

  /**
   * Select the tab at `index`.
   *
   * @method selectTabByIndex
   * @param {Number} index
   */
  selectTabByIndex(index) {
    const tab = this.get('tabs').objectAt(index);

    if (!tab) {
      throw new Error('Tab index out of bounds');
    }

    tab.select();
  },

  selectTabByModel(model) {
    const tab = this.get('tabs').findBy('model', model);

    if (!tab) {
      throw new Error('Tab could not be found by model');
    }

    tab.select();
  },

  tabs: Ember.computed(function() {
    return Ember.A();
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

    if (tab.get('isSelected') && index === 0) {
      this.selectNextTab();
    }

    this.get('tabs').removeObject(tab);
  },

  _registerWithTabsContainer() {
    this.get('tabsContainer').registerTabList(this);
  },

  _unregisterWithTabsContainer() {
    this.get('tabsContainer').unregisterTabList(this);
  }
});
