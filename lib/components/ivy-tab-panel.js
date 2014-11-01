import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['aria-labeledby', 'role'],
  classNames: ['ivy-tab-panel'],
  classNameBindings: ['active'],

  'aria-labeledby': Ember.computed.readOnly('tab.elementId'),

  role: 'tabpanel',

  active: Ember.computed(function() {
    if (this.get('isSelected')) { return this.get('activeClass'); }
  }).property('isSelected'),

  activeClass: 'active',

  index: Ember.computed(function() {
    return this.get('tabPanels').indexOf(this);
  }).property('tabPanels.[]'),

  isSelected: Ember.computed.readOnly('tab.isSelected'),

  isVisible: Ember.computed.readOnly('isSelected'),

  registerWithTabsContainer: Ember.on('didInsertElement', function() {
    this.get('tabsContainer').registerTabPanel(this);
  }),

  tab: Ember.computed(function() {
    var tabs = this.get('tabs');
    if (tabs) { return tabs.objectAt(this.get('index')); }
  }).property('tabs.[]', 'index'),

  tabList: Ember.computed.readOnly('tabsContainer.tabList'),

  tabPanels: Ember.computed.readOnly('tabsContainer.tabPanels'),

  tabs: Ember.computed.readOnly('tabList.tabs'),

  tabsContainer: Ember.computed.readOnly('parentView'),

  unregisterWithTabsContainer: Ember.on('willDestroyElement', function() {
    this.get('tabsContainer').unregisterTabPanel(this);
  }),
});
