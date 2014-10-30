import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ivy-tab'],
  classNameBindings: ['active'],
  tagName: 'li',
  attributeBindings: ['aria-controls', 'aria-expanded', 'aria-selected',
                      'role', 'selected', 'tabindex'],

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tab
   *
   * @property role
   * @type {String}
   */
  role: 'tab',

  activeClass: 'active',

  'aria-controls': Ember.computed.readOnly('tabPanel.elementId'),

  'aria-expanded': Ember.computed.readOnly('aria-selected'),

  'aria-selected': Ember.computed(function() {
    return this.get('_isActive') + ''; // coerce to 'true' or 'false'
  }).property('_isActive'),

  active: Ember.computed(function() {
    return this.get('_isActive') ? this.get('activeClass') : false;
  }).property('_isActive', 'activeClass'),

  _isActive: Ember.computed(function() {
    return this.get('tabsContainer.activeTab') === this;
  }).property('tabsContainer.activeTab'),

  index: Ember.computed(function() {
    return this.get('tabs').indexOf(this);
  }).property('tabs.@each'),

  registerWithTabList: Ember.on('didInsertElement', function() {
    this.get('tabList').registerTab(this);
  }),

  select: Ember.on('click', function() {
    this.get('tabList').selectTab(this);
  }),

  selected: Ember.computed(function() {
    if (this.get('_isActive')) { return 'selected'; }
  }).property('_isActive'),

  tabList: Ember.computed.readOnly('parentView'),

  tabPanel: Ember.computed(function() {
    return this.get('tabPanels').objectAt(this.get('index'));
  }).property('tabPanels.@each', 'index'),

  tabPanels: Ember.computed.readOnly('tabsContainer.tabPanels'),

  tabindex: Ember.computed(function() {
    if (this.get('_isActive')) { return 0; }
  }).property('_isActive'),

  tabs: Ember.computed.readOnly('tabList.tabs'),

  tabsContainer: Ember.computed.readOnly('tabList.tabsContainer'),

  unregisterWithTabList: Ember.on('willDestroyElement', function() {
    this.get('tabList').unregisterTab(this);
  })
});
