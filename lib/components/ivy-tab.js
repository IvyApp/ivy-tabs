import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ivy-tab'],
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

  'aria-controls': Ember.computed.readOnly('tabPanel.elementId'),

  'aria-expanded': Ember.computed.readOnly('aria-selected'),

  'aria-selected': Ember.computed(function() {
    return this.get('active') + ''; // coerce to 'true' or 'false'
  }).property('active'),

  active: Ember.computed(function() {
    return this.get('tabsContainer.activeTab') === this;
  }).property('tabsContainer.activeTab'),

  registerWithTabList: Ember.on('didInsertElement', function() {
    this.get('tabList').registerTab(this);
  }),

  select: Ember.on('click', function() {
    this.get('tabList').selectTab(this);
  }),

  selected: Ember.computed(function() {
    if (this.get('active')) { return 'selected'; }
  }).property('active'),

  tabList: Ember.computed.readOnly('parentView'),

  tabPanel: Ember.computed(function() {
    return this.get('tabPanels').objectAt(this.get('tabs').indexOf(this));
  }).property('tabPanels.@each'),

  tabPanels: Ember.computed.readOnly('tabsContainer.tabPanels'),

  tabindex: Ember.computed(function() {
    if (this.get('active')) { return 0; }
  }).property('active'),

  tabs: Ember.computed.readOnly('tabList.tabs'),

  tabsContainer: Ember.computed.readOnly('tabList.tabsContainer'),

  unregisterWithTabList: Ember.on('willDestroyElement', function() {
    this.get('tabList').unregisterTab(this);
  })
});
