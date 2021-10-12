import Component from '@glimmer/component';
import { once } from '@ember/runloop';
import { action } from '@ember/object';

/**
 * @module ivy-tabs
 */

let ivyTabsTabCount = 0;

/**
 * @class IvyTabComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default class IvyTabsTabComponent extends Component {
  _registerWithTabList() {
    this.args.tabList.registerTab(this);
  }

  _unregisterWithTabList() {
    this.args.tabList.unregisterTab(this);
  }

  /**
   * Tells screenreaders which panel this tab controls.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-controls
   *
   * @property aria-controls
   * @type String
   * @readOnly
   */
  get ariaControls() {
    if (this.tabPanel) {
      return this.tabPanel.elementId;
    }
    return '';
  }

  /**
   * Tells screenreaders whether or not this tab's panel is expanded.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
   *
   * @property aria-expanded
   * @type String
   * @readOnly
   */
  get ariaExpanded() {
    return String(this.isSelected); // coerce to 'true' or 'false'
  }

  @action
  handleClick(event) {
    event.preventDefault();
    this.select();
  }

  get href() {
    if (!this.tabPanel) {
      return '';
    }

    if (!this.args.fixedHref) {
      return '#' + this.tabPanel.elementId;
    } else {
      return this.args.fixedHref;
    }
  }

  /**
   * The index of this tab in the `ivy-tabs-tablist` component.
   *
   * @property index
   * @type Number
   */
  get index() {
    return this.tabs.indexOf(this);
  }

  constructor() {
    super(...arguments);
    this.uniqueSelector = `ivy-tabs-tab-${ivyTabsTabCount++}`;
    once(this, this._registerWithTabList);
  }

  /**
   * Whether or not this tab is selected.
   *
   * @property isSelected
   * @type Boolean
   */
  get isSelected() {
    return this.args.tabList.selectedTab === this;
  }

  /**
   * Called when the user clicks on the tab. Selects this tab.
   *
   * @method select
   */
  select() {
    const onSelect = this.args.onSelect;

    if (!this.isDestroying && typeof onSelect === 'function') {
      onSelect(this.args.model);
    }
  }

  focus() {
    let element = document.getElementById(this.id);
    if (element) {
      element.focus();
    }
  }

  get model() {
    return this.args.model;
  }

  get id() {
    if (this.args.id) {
      return this.args.id;
    }
    return this.uniqueSelector;
  }

  /**
   * The `selected` attribute of the tab element. If the tab's `isSelected`
   * property is `true` this will be the literal string 'selected', otherwise
   * it will be `undefined`.
   *
   * @property selected
   * @type String
   */
  get selected() {
    if (this.isSelected) {
      return 'selected';
    }
    return undefined;
  }

  /**
   * The `ivy-tabs-tabpanel` associated with this tab.
   *
   * @property tabPanel
   * @type IvyTabs.IvyTabPanelComponent
   */
  get tabPanel() {
    const tabPanels = this.tabPanels;
    for (let i = 0; i < tabPanels.length; i++) {
      const result = tabPanels[i];
      if (result.model === this.args.model) {
        return result;
      }
    }
    return null;
  }

  /**
   * The array of all `ivy-tabs-tabpanel` instances within the `ivy-tabs`
   * component.
   *
   * @property tabPanels
   * @type Array | IvyTabs.IvyTabPanelComponent
   * @readOnly
   */
  get tabPanels() {
    if (this.tabsContainer) {
      return this.tabsContainer.tabPanels;
    }
    return [];
  }

  /**
   * The array of all `ivy-tabs-tab` instances within the `ivy-tabs-tablist` component.
   *
   * @property tabs
   * @type Array | IvyTabs.IvyTabComponent
   * @readOnly
   */
  get tabs() {
    if (this.args.tabList) {
      return this.args.tabList.tabs;
    }
    return [];
  }

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type IvyTabs.IvyTabsComponent
   * @readOnly
   */
  get tabsContainer() {
    if (this.args.tabList) {
      return this.args.tabList.tabsContainer;
    }
    return null;
  }

  willDestroy() {
    super.willDestroy(...arguments);
    once(this, this._unregisterWithTabList);
  }
}
