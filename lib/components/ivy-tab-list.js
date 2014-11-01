import Ember from 'ember';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabListComponent
 * @namespace ivy.tabs
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: 'ul',
  attributeBindings: ['aria-multiselectable', 'role'],
  classNames: ['ivy-tab-list'],

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
   * @property role
   * @type String
   * @default 'tablist'
   */
  role: 'tablist',

  /**
   * Adds a tab to the `tabs` array.
   *
   * @method registerTab
   * @param {ivy.tabs.IvyTabComponent} tab
   */
  registerTab: function(tab) {
    this.get('tabs').pushObject(tab);
  },

  /**
   * Selects the previous tab in the list, if any.
   *
   * @method selectPreviousTab
   */
  selectPreviousTab: function() {
    var index = this.get('selectedIndex');
    if (index > 0) { this.selectTabByIndex(index - 1); }
  },

  selectedIndex: Ember.computed.alias('tabsContainer.selectedIndex'),

  /**
   * The currently-selected `ivy-tab` instance.
   *
   * @property selectedTab
   * @type ivy.tabs.IvyTabComponent
   */
  selectedTab: Ember.computed(function() {
    return this.get('tabs').objectAt(this.get('selectedIndex'));
  }).property('selectedIndex', 'tabs.[]'),

  /**
   * Select the given tab.
   *
   * @method selectTab
   * @param {ivy.tabs.IvyTabComponent} tab
   */
  selectTab: function(tab) {
    this.selectTabByIndex(this.get('tabs').indexOf(tab));
  },

  /**
   * Select the tab at `index`.
   *
   * @method selectTabByIndex
   * @param {Number} index
   */
  selectTabByIndex: function(index) {
    this.set('selectedIndex', index);
  },

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type ivy.tabs.IvyTabsComponent
   * @readOnly
   */
  tabsContainer: Ember.computed.alias('parentView').readOnly(),

  /**
   * Removes a tab from the `tabs` array.
   *
   * @method unregisterTab
   * @param {ivy.tabs.IvyTabComponent} tab
   */
  unregisterTab: function(tab) {
    this.get('tabs').removeObject(tab);
    if (tab.get('isSelected')) { this.selectPreviousTab(); }
  },

  _initTabs: Ember.on('init', function() {
    this.set('tabs', Ember.A());
  }),

  _registerWithTabsContainer: Ember.on('didInsertElement', function() {
    this.get('tabsContainer').registerTabList(this);
  }),

  _unregisterWithTabsContainer: Ember.on('willDestroyElement', function() {
    this.get('tabsContainer').unregisterTabList(this);
  })
});
