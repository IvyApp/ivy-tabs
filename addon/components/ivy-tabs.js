import Ember from 'ember';
import layout from '../templates/components/ivy-tabs';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabsComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  layout: layout,

  classNames: ['ivy-tabs'],

  /**
   * Set this to the model of the tab you'd like to be selected. Usually it is
   * bound to a controller property that is used as a query parameter, but can
   * be bound to anything.
   *
   * @property selected
   * @type Object
   */
  selected: null,

  /**
   * Registers the `ivy-tab-list` instance.
   *
   * @method registerTabList
   * @param {IvyTabs.IvyTabListComponent} tabList
   */
  registerTabList(tabList) {
    this.set('tabList', tabList);
    Ember.run.once(this, this.selectTab);
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

  selectTab() {
    let selected = this.get('selected');
    if (Ember.isNone(selected)) {
      this.get('tabList').selectTabByIndex(0);
    } else {
      this.get('tabList').selectTabByModel(selected);
    }
  },

  tabPanels: Ember.computed(function() {
    return Ember.A();
  }).readOnly(),

  /**
   * Removes the `ivy-tab-list` component.
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
