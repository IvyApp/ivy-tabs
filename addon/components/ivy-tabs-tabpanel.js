import Component from '@ember/component';
import { computed } from '@ember/object';
import { readOnly } from '@ember/object/computed';
import { once } from '@ember/runloop';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabPanelComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Component.extend({
  _registerWithTabsContainer() {
    this.tabsContainer.registerTabPanel(this);
  },

  _unregisterWithTabsContainer() {
    this.tabsContainer.unregisterTabPanel(this);
  },

  /**
   * Accessed as a className binding to apply the panel's `activeClass` CSS
   * class to the element when the panel's `isSelected` property is true.
   *
   * @property active
   * @type String
   * @readOnly
   */
  active: computed('isSelected', 'activeClass', function () {
    if (this.isSelected) {
      return this.activeClass;
    }
    return undefined;
  }),

  /**
   * The CSS class to apply to a panel's element when its `isSelected` property
   * is `true`.
   *
   * @property activeClass
   * @type String
   * @default 'active'
   */
  activeClass: 'active',

  /**
   * Tells screenreaders whether or not the panel is visible.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
   *
   * @property aria-hidden
   * @type Boolean
   * @readOnly
   */
  'aria-hidden': computed('isSelected', function () {
    return `${!this.isSelected}`;
  }).readOnly(),

  /**
   * Tells screenreaders which tab labels this panel.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
   *
   * @property aria-labelledby
   * @type String
   * @readOnly
   */
  'aria-labelledby': readOnly('tab.elementId'),

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property ariaRole
   * @type String
   * @default 'tabpanel'
   */
  ariaRole: 'tabpanel',

  attributeBindings: ['aria-hidden', 'aria-labelledby', 'tabindex'],

  classNameBindings: ['active'],

  classNames: ['ivy-tabs-tabpanel'],

  init() {
    this._super(...arguments);
    once(this, this._registerWithTabsContainer);
  },

  /**
   * Whether or not this panel's associated tab is selected.
   *
   * @property isSelected
   * @type Boolean
   * @readOnly
   */
  isSelected: computed('model', 'selection', function () {
    return this.model === this.selection;
  }).readOnly(),

  /**
   * Object to uniquely identify this tab within the tabList.
   *
   * @property model
   * @type Object
   */
  model: null,

  /**
   * The `ivy-tabs-tab` associated with this panel.
   *
   * @property tab
   * @type IvyTabs.IvyTabComponent
   */
  tab: computed('model', 'tabs.@each.model', function () {
    const tabs = this.tabs;
    if (tabs) {
      return tabs.findBy('model', this.model);
    }
    return undefined;
  }),

  /**
   * Makes the selected tab keyboard tabbable, and prevents tabs from getting
   * focus when clicked with a mouse.
   *
   * @property tabindex
   * @type Number
   */
  tabindex: computed('isSelected', function () {
    if (this.isSelected) {
      return 0;
    }
    return undefined;
  }),

  /**
   * The array of all `ivy-tabs-tab` instances within the `ivy-tabs-tablist` component.
   *
   * @property tabs
   * @type Array | IvyTabs.IvyTabComponent
   * @readOnly
   */
  tabs: readOnly('tabsContainer.tabList.tabs'),

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type IvyTabs.IvyTabsComponent
   * @default null
   */
  tabsContainer: null,

  willDestroy() {
    this._super(...arguments);
    once(this, this._unregisterWithTabsContainer);
  },
}).reopenClass({
  positionalParams: ['model'],
});
