import Ember from 'ember';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabsComponent
 * @namespace ivy.tabs
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  classNames: ['ivy-tabs'],

  /**
   * Set this to the index of the tab you'd like to be selected. Usually it is
   * bound to a controller property that is used as a query parameter, but can
   * be bound to anything.
   *
   * @property selectedIndex
   * @type Number
   * @default 0
   */
  selectedIndex: 0,

  /**
   * Registers the `ivy-tab-list` instance.
   *
   * @method registerTabList
   * @param {ivy.tabs.IvyTabListComponent} tabList
   */
  registerTabList: function(tabList) {
    this.set('tabList', tabList);
  },

  /**
   * Adds a panel to the `tabPanels` array.
   *
   * @method registerTabPanel
   * @param {ivy.tabs.IvyTabPanelComponent} tabPanel
   */
  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').pushObject(tabPanel);
  },

  /**
   * Removes the `ivy-tab-list` component.
   *
   * @method unregisterTabList
   * @param {ivy.tabs.IvyTabListComponent} tabList
   */
  unregisterTabList: function(tabList) {
    this.set('tabList', null);
  },

  /**
   * Removes a panel from the `tabPanels` array.
   *
   * @method unregisterTabPanel
   * @param {ivy.tabs.IvyTabPanelComponent} tabPanel
   */
  unregisterTabPanel: function(tabPanel) {
    this.get('tabPanels').removeObject(tabPanel);
  },

  _initTabPanels: Ember.on('init', function() {
    this.set('tabPanels', Ember.A());
  })
});
