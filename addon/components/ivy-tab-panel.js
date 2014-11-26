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
  attributeBindings: ['aria-labelledby', 'role'],
  classNames: ['ivy-tab-panel'],
  classNameBindings: ['active'],

  init: function() {
    this._super();
    Ember.run.once(this, this._registerWithTabsContainer);
  },

  willDestroy: function() {
    this._super();
    Ember.run.once(this, this._unregisterWithTabsContainer);
  },

  /**
   * Tells screenreaders which tab labels this panel.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-labelledby
   *
   * @property aria-labelledby
   * @type String
   * @readOnly
   */
  'aria-labelledby': Ember.computed.alias('tab.elementId').readOnly(),

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property role
   * @type String
   * @default 'tabpanel'
   */
  role: 'tabpanel',

  /**
   * Accessed as a className binding to apply the panel's `activeClass` CSS
   * class to the element when the panel's `isSelected` property is true.
   *
   * @property active
   * @type String
   * @readOnly
   */
  active: Ember.computed(function() {
    if (this.get('isSelected')) { return this.get('activeClass'); }
  }).property('isSelected'),

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
  index: Ember.computed(function() {
    return this.get('tabPanels').indexOf(this);
  }).property('tabPanels.[]'),

  /**
   * Whether or not this panel's associated tab is selected.
   *
   * @property isSelected
   * @type Boolean
   * @readOnly
   */
  isSelected: Ember.computed.alias('tab.isSelected').readOnly(),

  /**
   * If `false`, this panel will appear hidden in the DOM. This is an alias to
   * `isSelected`.
   *
   * @property isVisible
   * @type Boolean
   * @readOnly
   */
  isVisible: Ember.computed.alias('isSelected').readOnly(),

  /**
   * The `ivy-tab` associated with this panel.
   *
   * @property tab
   * @type IvyTabs.IvyTabComponent
   */
  tab: Ember.computed(function() {
    var tabs = this.get('tabs');
    if (tabs) { return tabs.objectAt(this.get('index')); }
  }).property('tabs.[]', 'index'),

  /**
   * The `ivy-tab-list` component this panel belongs to.
   *
   * @property tabList
   * @type IvyTabs.IvyTabListComponent
   * @readOnly
   */
  tabList: Ember.computed.alias('tabsContainer.tabList').readOnly(),

  /**
   * The array of all `ivy-tab-panel` instances within the `ivy-tabs`
   * component.
   *
   * @property tabPanels
   * @type Array | IvyTabs.IvyTabPanelComponent
   * @readOnly
   */
  tabPanels: Ember.computed.alias('tabsContainer.tabPanels').readOnly(),

  /**
   * The array of all `ivy-tab` instances within the `ivy-tab-list` component.
   *
   * @property tabs
   * @type Array | IvyTabs.IvyTabComponent
   * @readOnly
   */
  tabs: Ember.computed.alias('tabList.tabs').readOnly(),

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type IvyTabs.IvyTabsComponent
   * @readOnly
   */
  tabsContainer: Ember.computed.alias('parentView').readOnly(),

  _registerWithTabsContainer: function() {
    this.get('tabsContainer').registerTabPanel(this);
  },

  _unregisterWithTabsContainer: function() {
    this.get('tabsContainer').unregisterTabPanel(this);
  }
});
