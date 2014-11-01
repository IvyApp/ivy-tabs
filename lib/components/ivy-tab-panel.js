import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['aria-labeledby', 'role'],
  classNames: ['ivy-tab-panel'],
  classNameBindings: ['active'],

  'aria-labeledby': Ember.computed.alias('tab.elementId').readOnly(),

  role: 'tabpanel',

  active: Ember.computed(function() {
    if (this.get('isSelected')) { return this.get('activeClass'); }
  }).property('isSelected'),

  activeClass: 'active',

  index: Ember.computed(function() {
    return this.get('tabPanels').indexOf(this);
  }).property('tabPanels.[]'),

  isSelected: Ember.computed.alias('tab.isSelected').readOnly(),

  isVisible: Ember.computed.alias('isSelected').readOnly(),

  registerWithTabsContainer: Ember.on('didInsertElement', function() {
    this.get('tabsContainer').registerTabPanel(this);
  }),

  tab: Ember.computed(function() {
    var tabs = this.get('tabs');
    if (tabs) { return tabs.objectAt(this.get('index')); }
  }).property('tabs.[]', 'index'),

  tabList: Ember.computed.alias('tabsContainer.tabList').readOnly(),

  tabPanels: Ember.computed.alias('tabsContainer.tabPanels').readOnly(),

  tabs: Ember.computed.alias('tabList.tabs').readOnly(),

  tabsContainer: Ember.computed.alias('parentView').readOnly(),

  unregisterWithTabsContainer: Ember.on('willDestroyElement', function() {
    this.get('tabsContainer').unregisterTabPanel(this);
  }),
});
