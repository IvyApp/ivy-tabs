import Component from '@glimmer/component';
import { once } from '@ember/runloop';

/**
 * @module ivy-tabs
 */

let instanceCount = 0;

/**
 * @class IvyTabPanelComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default class IvyTabsPanelComponent extends Component {
  _registerWithTabsContainer() {
    this.args.tabsContainer.registerTabPanel(this);
  }

  _unregisterWithTabsContainer() {
    this.args.tabsContainer.unregisterTabPanel(this);
  }

  /**
   * Accessed as a className binding to apply the panel's `activeClass` CSS
   * class to the element when the panel's `isSelected` property is true.
   *
   * @property active
   * @type String
   * @readOnly
   */
  get active() {
    if (this.isSelected) {
      return this.args.activeClass || 'active';
    }
    return undefined;
  }

  get elementId() {
    return this.args.id || this.internalId;
  }

  get model() {
    return this.args.model;
  }

  /**
   * Tells screenreaders whether or not the panel is visible.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
   *
   * @property aria-hidden
   * @type Boolean
   * @readOnly
   */
  get ariaHidden() {
    return `${!this.isSelected}`;
  }

  /**
   * Tells screenreaders which tab labels this panel.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
   *
   * @property aria-labelledby
   * @type String
   * @readOnly
   */
  get ariaLabelledby() {
    const tab = this.tab;
    if (tab) {
      return tab.id;
    }

    return '';
  }

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property ariaRole
   * @type String
   * @default 'tabpanel'
   */
  get ariaRole() {
    return this.args.ariaRole || 'tabpanel';
  }

  constructor() {
    super(...arguments);
    this.internalId = `ivy-tabs-panel-${instanceCount++}`;
    once(this, this._registerWithTabsContainer);
  }

  /**
   * Whether or not this panel's associated tab is selected.
   *
   * @property isSelected
   * @type Boolean
   * @readOnly
   */
  get isSelected() {
    return this.args.model === this.args.selection;
  }

  /**
   * The `ivy-tabs-tab` associated with this panel.
   *
   * @property tab
   * @type IvyTabs.IvyTabComponent
   */
  get tab() {
    const tabs = this.tabs;
    if (tabs) {
      return tabs.findBy('model', this.args.model);
    }
    return undefined;
  }

  /**
   * The array of all `ivy-tabs-tab` instances within the `ivy-tabs-tablist` component.
   *
   * @property tabs
   * @type Array | IvyTabs.IvyTabComponent
   * @readOnly
   */
  get tabs() {
    const tabList = this.args.tabsContainer.tabList;
    if (tabList) {
      return tabList.tabs;
    }
    return [];
  }

  willDestroy() {
    super.willDestroy(...arguments);
    once(this, this._unregisterWithTabsContainer);
  }
}
