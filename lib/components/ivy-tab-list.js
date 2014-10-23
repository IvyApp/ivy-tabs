import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ivy-tab-list'],
  tagName: 'ul',
  attributeBindings: ['aria-multiselectable', 'role'],

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tablist
   *
   * @property role
   * @type {String}
   */
  role: 'tablist',

  'aria-multiselectable': 'false',

  init: function() {
    this._super();
    this.set('tabs', Ember.A());
  },

  registerTab: function(tab) {
    this.get('tabs').pushObject(tab);
  },

  registerWithTabsContainer: Ember.on('didInsertElement', function() {
    this.get('tabsContainer').registerTabList(this);
  }),


  selectTab: function(tab) {
    this.get('tabsContainer').selectTab(tab);
  },

  selectTabAtIndex: function(index) {
    var tab = this.get('tabs').objectAt(index);
    if (tab) { tab.select(); }
  },

  tabsContainer: Ember.computed.readOnly('parentView'),

  unregisterTab: function(tab) {
    this.get('tabs').removeObject(tab);
  },

  unregisterWithTabsContainer: Ember.on('willDestroyElement', function() {
    this.get('tabsContainer').unregisterTabList(this);
  })
});
