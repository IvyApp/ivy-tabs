import Ember from 'ember';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabPanelComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  attributeBindings: ['aria-hidden', 'aria-labelledby'],
  classNames: ['ivy-tab-panel'],
  classNameBindings: ['active'],

  init() {
    this._super(...arguments);
    Ember.run.once(this, this._registerWithTabsContainer);
  },

  willDestroy() {
    this._super(...arguments);
    Ember.run.once(this, this._unregisterWithTabsContainer);
  },

  /**
   * Tells screenreaders whether or not the panel is visible.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-hidden
   *
   * @property aria-hidden
   * @type Boolean
   * @readOnly
   */
  'aria-hidden': Ember.computed('isSelected', function() {
    return `${!this.get('isSelected')}`;
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
  'aria-labelledby': Ember.computed.readOnly('tab.elementId'),

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property ariaRole
   * @type String
   * @default 'tabpanel'
   */
  ariaRole: 'tabpanel',

  /**
   * Accessed as a className binding to apply the panel's `activeClass` CSS
   * class to the element when the panel's `isSelected` property is true.
   *
   * @property active
   * @type String
   * @readOnly
   */
  active: Ember.computed('isSelected', function() {
    if (this.get('isSelected')) { return this.get('activeClass'); }
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
   * The index of this panel in the `ivy-tabs` component.
   *
   * @property index
   * @type Number
   */
  index: Ember.computed('tabPanels.[]', function() {
    return this.get('tabPanels').indexOf(this);
  }),

  /**
   * Whether or not this panel's associated tab is selected.
   *
   * @property isSelected
   * @type Boolean
   * @readOnly
   */
  isSelected: Ember.computed.readOnly('tab.isSelected'),

  /**
   * The `ivy-tab` associated with this panel.
   *
   * @property tab
   * @type IvyTabs.IvyTabComponent
   */
  tab: Ember.computed('tabs.[]', 'index', function() {
    const tabs = this.get('tabs');
    if (tabs) { return tabs.objectAt(this.get('index')); }
  }),

  /**
   * The `ivy-tab-list` component this panel belongs to.
   *
   * @property tabList
   * @type IvyTabs.IvyTabListComponent
   * @readOnly
   */
  tabList: Ember.computed.readOnly('tabsContainer.tabList'),

  /**
   * The array of all `ivy-tab-panel` instances within the `ivy-tabs`
   * component.
   *
   * @property tabPanels
   * @type Array | IvyTabs.IvyTabPanelComponent
   * @readOnly
   */
  tabPanels: Ember.computed.readOnly('tabsContainer.tabPanels'),

  /**
   * The array of all `ivy-tab` instances within the `ivy-tab-list` component.
   *
   * @property tabs
   * @type Array | IvyTabs.IvyTabComponent
   * @readOnly
   */
  tabs: Ember.computed.readOnly('tabList.tabs'),

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type IvyTabs.IvyTabsComponent
   * @default null
   */
  tabsContainer: null,

  _registerWithTabsContainer() {
    this.get('tabsContainer').registerTabPanel(this);
  },

  _unregisterWithTabsContainer() {
    this.get('tabsContainer').unregisterTabPanel(this);
  }
});
