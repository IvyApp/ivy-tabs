import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabsComponent
 * @namespace IvyTabs
 * @extends glimmer Component
 */
export default class IvyTabsTabsComponent extends Component {
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
