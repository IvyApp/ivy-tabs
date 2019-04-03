import { classNames } from '@ember-decorators/component';
import { A } from '@ember/array';
import Component from '@ember/component';
// @ts-ignore: Ignore import of compiled template
import layout from '../templates/components/ivy-tabs';
import IvyTabsTablist from './ivy-tabs-tablist';
import IvyTabsTabpanel from './ivy-tabs-tabpanel';

@classNames('ivy-tabs')
export default class IvyTabs<Model> extends Component {
  public layout = layout;

  /**
   * Set this to the model of the tab you'd like to be selected. Usually it is
   * bound to a controller property that is used as a query parameter, but can
   * be bound to anything.
   */
  public selection: Model | null = null;

  public tabList: IvyTabsTablist<Model> | null = null;

  public readonly tabPanels = A<IvyTabsTabpanel<Model>>();

  /**
   * Registers the `ivy-tabs-tablist` instance.
   */
  public registerTabList(tabList: IvyTabsTablist<Model>) {
    this.set('tabList', tabList);
  }

  /**
   * Adds a panel to the `tabPanels` array.
   */
  public registerTabPanel(tabPanel: IvyTabsTabpanel<Model>) {
    this.tabPanels.pushObject(tabPanel);
  }

  /**
   * Removes the `ivy-tabs-tablist` component.
   */
  public unregisterTabList() {
    this.set('tabList', null);
  }

  /**
   * Removes a panel from the `tabPanels` array.
   */
  public unregisterTabPanel(tabPanel: IvyTabsTabpanel<Model>) {
    this.tabPanels.removeObject(tabPanel);
  }
}
