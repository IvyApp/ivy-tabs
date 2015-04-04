import Ember from 'ember';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['aria-controls', 'aria-expanded', 'aria-selected', 'role', 'selected', 'tabindex'],
  classNames: ['ivy-tab'],
  classNameBindings: ['active'],

  init: function() {
    this._super();
    Ember.run.once(this, this._registerWithTabList);
  },

  willDestroy: function() {
    this._super();
    Ember.run.once(this, this._unregisterWithTabList);
  },

  /**
   * Tells screenreaders which panel this tab controls.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-controls
   *
   * @property aria-controls
   * @type String
   * @readOnly
   */
  'aria-controls': Ember.computed.alias('tabPanel.elementId').readOnly(),

  /**
   * Tells screenreaders whether or not this tab's panel is expanded.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-expanded
   *
   * @property aria-expanded
   * @type String
   * @readOnly
   */
  'aria-expanded': Ember.computed.alias('aria-selected').readOnly(),

  /**
   * Tells screenreaders whether or not this tab is selected.
   *
   * See http://www.w3.org/TR/wai-aria/states_and_properties#aria-selected
   *
   * @property aria-selected
   * @type String
   */
  'aria-selected': Ember.computed(function() {
    return this.get('isSelected') + ''; // coerce to 'true' or 'false'
  }).property('isSelected'),

  /**
   * The `role` attribute of the tab element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tab
   *
   * @property role
   * @type String
   * @default 'tab'
   */
  role: 'tab',

  /**
   * The `selected` attribute of the tab element. If the tab's `isSelected`
   * property is `true` this will be the literal string 'selected', otherwise
   * it will be `undefined`.
   *
   * @property selected
   * @type String
   */
  selected: Ember.computed(function() {
    if (this.get('isSelected')) { return 'selected'; }
  }).property('isSelected'),

  /**
   * Makes the selected tab keyboard tabbable, and prevents tabs from getting
   * focus when clicked with a mouse.
   *
   * @property tabindex
   * @type Number
   */
  tabindex: Ember.computed(function() {
    if (this.get('isSelected')) { return 0; }
  }).property('isSelected'),

  /**
   * Accessed as a className binding to apply the tab's `activeClass` CSS class
   * to the element when the tab's `isSelected` property is true.
   *
   * @property active
   * @type String
   * @readOnly
   */
  active: Ember.computed(function() {
    if (this.get('isSelected')) { return this.get('activeClass'); }
  }).property('isSelected'),

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
   * The index of this tab in the `ivy-tab-list` component.
   *
   * @property index
   * @type Number
   */
  index: Ember.computed(function() {
    return this.get('tabs').indexOf(this);
  }).property('tabs.[]'),

  /**
   * Whether or not this tab is selected.
   *
   * @property isSelected
   * @type Boolean
   */
  isSelected: Ember.computed(function() {
    return this.get('tabList.selectedTab') === this;
  }).property('tabList.selectedTab'),

  /**
   * Called when the user clicks on the tab. Selects this tab.
   *
   * @method select
   */
  select: Ember.on('click', 'touchEnd', function() {
    this.get('tabList').selectTab(this);
  }),

  /**
   * The `ivy-tab-list` component this tab belongs to.
   *
   * @property tabList
   * @type IvyTabs.IvyTabListComponent
   * @readOnly
   */
  tabList: Ember.computed.alias('parentView').readOnly(),

  /**
   * The `ivy-tab-panel` associated with this tab.
   *
   * @property tabPanel
   * @type IvyTabs.IvyTabPanelComponent
   */
  tabPanel: Ember.computed(function() {
    return this.get('tabPanels').objectAt(this.get('index'));
  }).property('tabPanels.[]', 'index'),

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
  tabsContainer: Ember.computed.alias('tabList.tabsContainer').readOnly(),

  _registerWithTabList: function() {
    this.get('tabList').registerTab(this);
  },

  _unregisterWithTabList: function() {
    this.get('tabList').unregisterTab(this);
  }
});
