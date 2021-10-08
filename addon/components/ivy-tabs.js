import Component from '@ember/component';
import { tracked } from '@glimmer/tracking';
import layout from '../templates/components/ivy-tabs';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabsComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default class IvyTabsTabsComponent extends Component {
  classNames = ['ivy-tabs'];

  layout = layout;
  @tracked tabList = null;

  /**
   * Registers the `ivy-tabs-tablist` instance.
   *
   * @method registerTabList
   * @param {IvyTabs.IvyTabListComponent} tabList
   */
  registerTabList(tabList) {
    this.tabList = tabList;
  }

  /**
   * Adds a panel to the `tabPanels` array.
   *
   * @method registerTabPanel
   * @param {IvyTabs.IvyTabPanelComponent} tabPanel
   */
  registerTabPanel(tabPanel) {
    this.tabPanels.pushObject(tabPanel);
  }

  /**
   * Set this to the model of the tab you'd like to be selected. Usually it is
   * bound to a controller property that is used as a query parameter, but can
   * be bound to anything.
   *
   * @property selection
   * @type Object
   */
  @tracked selection = null;
  @tracked tabPanels = [];

  /**
   * Removes the `ivy-tabs-tablist` component.
   *
   * @method unregisterTabList
   * @param {IvyTabs.IvyTabListComponent} tabList
   */
  unregisterTabList(/* tabList */) {
    this.tabList = null;
  }

  /**
   * Removes a panel from the `tabPanels` array.
   *
   * @method unregisterTabPanel
   * @param {IvyTabs.IvyTabPanelComponent} tabPanel
   */
  unregisterTabPanel(tabPanel) {
    this.tabPanels.removeObject(tabPanel);
  }
}
