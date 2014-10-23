import Ember from 'ember';

export default Ember.Component.extend({
  activeTab: null,

  classNames: ['ivy-tabs'],

  init: function() {
    this._super();
    this.set('tabPanels', Ember.A());
  },

  registerTabList: function(tabList) {
    this.set('tabList', tabList);
    this.addObserver('selectedIndex', this, this._selectedIndexDidChange);
    Ember.run.once(this, this._selectedIndexDidChange);
  },

  registerTabPanel: function(tabPanel) {
    this.get('tabPanels').pushObject(tabPanel);
  },

  selectTab: function(tab) {
    this.set('activeTab', tab);
  },

  selectedIndex: 0,

  tabList: null,

  tabPanels: null,

  unregisterTabList: function(tabList) {
    this.removeObserver('selectedIndex', this, this._selectedIndexDidChange);
  },

  unregisterTabPanel: function(tabPanel) {
    this.get('tabPanels').removeObject(tabPanel);
  },

  _selectedIndexDidChange: function() {
    this.get('tabList').selectTabAtIndex(this.get('selectedIndex'));
  }
});
