import Component from '@ember/component';
import { once } from '@ember/runloop';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Component.extend({
  _registerWithTabList() {
    this.tabList.registerTab(this);
  },

  _unregisterWithTabList() {
    this.tabList.unregisterTab(this);
  },

  /**
   * Accessed as a className binding to apply the tab's `activeClass` CSS class
   * to the element when the tab's `isSelected` property is true.
   *
   * @property active
   * @type String
   */
  get active() {
    if (this.isSelected) {
      return this.activeClass;
    }
    return undefined;
  },

  /**
   * The CSS class to apply to a tab's element when its `isSelected` property
   * is `true`.
   *
   * @property activeClass
   * @type String
   * @default 'active'
   */
  activeClass: 'active',

  /**
   * Tells screenreaders which panel this tab controls.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-controls
   *
   * @property aria-controls
   * @type String
   * @readOnly
   */
  get 'aria-controls'() {
    if (this.tabPanel) {
      return this.tabPanel.elementId;
    }
    return '';
  },

  /**
   * Tells screenreaders whether or not this tab's panel is expanded.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
   *
   * @property aria-expanded
   * @type String
   * @readOnly
   */
  get 'aria-expanded'() {
    return String(this.isSelected); // coerce to 'true' or 'false'
  },

  /**
   * Tells screenreaders whether or not this tab is selected.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-selected
   *
   * @property aria-selected
   * @type String
   */
  get 'aria-selected'() {
    return String(this.isSelected); // coerce to 'true' or 'false'
  },

  /**
   * The `role` attribute of the tab element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tab
   *
   * @property ariaRole
   * @type String
   * @default 'tab'
   */
  ariaRole: 'tab',

  attributeBindings: [
    'aria-controls',
    'aria-expanded',
    'aria-selected',
    'href',
    'selected',
    'tabindex',
  ],

  classNameBindings: ['active'],

  classNames: ['ivy-tabs-tab'],

  click(event) {
    event.preventDefault();
    this.select();
  },

  /**
   * Override the 'a' tag's href with a dedicated dynamic value to allow routable tab links.
   * @property fixedHref
   * @type String
   * @default ""
   */
  fixedHref: '',

  get href() {
    if (this.tagName !== 'a' || !this.tabPanel) {
      return '';
    }

    if (!this.fixedHref) {
      return '#' + this.tabPanel.elementId;
    } else {
      return this.fixedHref;
    }
  },

  /**
   * The index of this tab in the `ivy-tabs-tablist` component.
   *
   * @property index
   * @type Number
   */
  get index() {
    return this.tabs.indexOf(this);
  },

  init() {
    this._super(...arguments);
    once(this, this._registerWithTabList);
  },

  /**
   * Whether or not this tab is selected.
   *
   * @property isSelected
   * @type Boolean
   */
  get isSelected() {
    return this.tabList.selectedTab === this;
  },

  /**
   * Object to uniquely identify this tab within the tabList.
   *
   * @property model
   * @type Object
   */
  model: null,

  /**
   * Called when the user clicks on the tab. Selects this tab.
   *
   * @method select
   */
  select() {
    const onSelect = this['on-select'];

    if (!this.isDestroying && typeof onSelect === 'function') {
      onSelect(this.model);
    }
  },

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
  },

  /**
   * The `ivy-tabs-tablist` component this tab belongs to.
   *
   * @property tabList
   * @type IvyTabs.IvyTabListComponent
   * @default null
   */
  tabList: null,

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
      if (result.model === this.model) {
        return result;
      }
    }
    return null;
  },

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
  },

  /**
   * Makes the selected tab keyboard tabbable, and prevents tabs from getting
   * focus when clicked with a mouse.
   *
   * @property tabindex
   * @type Number
   */
  get tabindex() {
    if (this.isSelected) {
      return 0;
    }
    return undefined;
  },

  /**
   * The array of all `ivy-tabs-tab` instances within the `ivy-tabs-tablist` component.
   *
   * @property tabs
   * @type Array | IvyTabs.IvyTabComponent
   * @readOnly
   */
  get tabs() {
    if (this.tabList) {
      return this.tabList.tabs;
    }
    return [];
  },

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type IvyTabs.IvyTabsComponent
   * @readOnly
   */
  get tabsContainer() {
    if (this.tabList) {
      return this.tabList.tabsContainer;
    }
    return null;
  },

  tagName: 'a',

  willDestroy() {
    this._super(...arguments);
    once(this, this._unregisterWithTabList);
  },
}).reopenClass({
  positionalParams: ['model'],
});
