import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['aria-controls', 'aria-expanded', 'aria-selected', 'role', 'selected', 'tabindex'],
  classNames: ['ivy-tab'],
  classNameBindings: ['active'],

  'aria-controls': Ember.computed.alias('tabPanel.elementId').readOnly(),

  'aria-expanded': Ember.computed.alias('aria-selected').readOnly(),

  'aria-selected': Ember.computed(function() {
    return this.get('isSelected') + ''; // coerce to 'true' or 'false'
  }).property('isSelected'),

  role: 'tab',

  selected: Ember.computed(function() {
    if (this.get('isSelected')) { return 'selected'; }
  }).property('isSelected'),

  tabindex: Ember.computed(function() {
    if (this.get('isSelected')) { return 0; }
  }).property('isSelected'),

  active: Ember.computed(function() {
    if (this.get('isSelected')) { return this.get('activeClass'); }
  }).property('isSelected'),

  activeClass: 'active',

  index: Ember.computed(function() {
    return this.get('tabs').indexOf(this);
  }).property('tabs.[]'),

  isSelected: Ember.computed(function() {
    return this.get('tabList.selectedTab') === this;
  }).property('tabList.selectedTab'),

  registerWithTabList: Ember.on('didInsertElement', function() {
    this.get('tabList').registerTab(this);
  }),

  select: Ember.on('click', function() {
    this.get('tabList').selectTab(this);
  }),

  tabList: Ember.computed.alias('parentView').readOnly(),

  tabPanel: Ember.computed(function() {
    return this.get('tabPanels').objectAt(this.get('index'));
  }).property('tabPanels.[]', 'index'),

  tabPanels: Ember.computed.alias('tabsContainer.tabPanels').readOnly(),

  tabs: Ember.computed.alias('tabList.tabs').readOnly(),

  tabsContainer: Ember.computed.alias('tabList.tabsContainer').readOnly(),

  unregisterWithTabList: Ember.on('willDestroyElement', function() {
    this.get('tabList').unregisterTab(this);
  })
});
