import Component from '@ember/component';
import { computed } from '@ember/object';
import { A } from '@ember/array';
import layout from '../templates/components/ivy-tabs';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabsComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Component.extend({
  layout: layout,

  classNames: ['ivy-tabs'],

  /**
   * Set this to the model of the tab you'd like to be selected. Usually it is
   * bound to a controller property that is used as a query parameter, but can
   * be bound to anything.
   *
   * @property selection
   * @type Object
   */
  selection: null,

  /**
   * Registers the `ivy-tabs-tablist` instance.
   *
   * @method registerTabList
   * @param {IvyTabs.IvyTabListComponent} tabList
   */
  registerTabList(tabList) {
    this.set('tabList', tabList);
  },

  /**
   * Adds a panel to the `tabPanels` array.
   *
   * @method registerTabPanel
   * @param {IvyTabs.IvyTabPanelComponent} tabPanel
   */
  registerTabPanel(tabPanel) {
    this.get('tabPanels').pushObject(tabPanel);
  },

  tabPanels: computed(function() {
    return A();
  }).readOnly(),

  /**
   * Removes the `ivy-tabs-tablist` component.
   *
   * @method unregisterTabList
   * @param {IvyTabs.IvyTabListComponent} tabList
   */
  unregisterTabList(/* tabList */) {
    this.set('tabList', null);
  },

  /**
   * Removes a panel from the `tabPanels` array.
   *
   * @method unregisterTabPanel
   * @param {IvyTabs.IvyTabPanelComponent} tabPanel
   */
  unregisterTabPanel(tabPanel) {
    this.get('tabPanels').removeObject(tabPanel);
  }
});
