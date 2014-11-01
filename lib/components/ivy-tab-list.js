import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  attributeBindings: ['aria-multiselectable', 'role'],
  classNames: ['ivy-tab-list'],

  'aria-multiselectable': 'false',

  role: 'tablist',

  initTabs: Ember.on('init', function() {
    this.set('tabs', Ember.A());
  }),

  registerTab: function(tab) {
    this.get('tabs').pushObject(tab);
  },

  registerWithTabsContainer: Ember.on('didInsertElement', function() {
    this.get('tabsContainer').registerTabList(this);
  }),

  selectPreviousTab: function() {
    var index = this.get('selectedIndex');
    if (index > 0) { this.selectTabByIndex(index - 1); }
  },

  selectedIndex: Ember.computed.alias('tabsContainer.selectedIndex'),

  selectedTab: Ember.computed(function() {
    return this.get('tabs').objectAt(this.get('selectedIndex'));
  }).property('selectedIndex', 'tabs.[]'),

  selectTab: function(tab) {
    this.selectTabByIndex(this.get('tabs').indexOf(tab));
  },

  selectTabByIndex: function(index) {
    this.set('selectedIndex', index);
  },

  tabsContainer: Ember.computed.alias('parentView').readOnly(),

  unregisterTab: function(tab) {
    this.get('tabs').removeObject(tab);
    if (tab.get('isSelected')) { this.selectPreviousTab(); }
  },

  unregisterWithTabsContainer: Ember.on('willDestroyElement', function() {
    this.get('tabsContainer').unregisterTabList(this);
  })
});
