import Ember from 'ember';

export default Ember.Component.extend({
  classNames: ['ivy-tab-panel'],
  classNameBindings: ['active'],
  attributeBindings: ['aria-labeledby', 'role'],

  /**
   * See http://www.w3.org/TR/wai-aria/roles#tabpanel
   *
   * @property role
   * @type {String}
   */
  role: 'tabpanel',

  activeClass: 'active',

  _isActive: Ember.computed.readOnly('tab._isActive'),

  active: Ember.computed(function() {
    return this.get('_isActive') ? this.get('activeClass') : false;
  }).property('_isActive', 'activeClass'),

  'aria-labeledby': Ember.computed.readOnly('tab.elementId'),

  isVisible: Ember.computed.readOnly('active'),

  registerWithTabsContainer: Ember.on('didInsertElement', function() {
    this.get('tabsContainer').registerTabPanel(this);
  }),

  tab: Ember.computed(function() {
    var tabs = this.get('tabs');
    if (tabs) { return tabs.objectAt(this.get('tabPanels').indexOf(this)); }
  }).property('tabs.@each', 'tabPanels.@each'),

  tabList: Ember.computed.readOnly('tabsContainer.tabList'),

  tabPanels: Ember.computed.readOnly('tabsContainer.tabPanels'),

  tabs: Ember.computed.readOnly('tabList.tabs'),

  tabsContainer: Ember.computed.readOnly('parentView'),

  unregisterWithTabsContainer: Ember.on('willDestroyElement', function() {
    this.get('tabsContainer').unregisterTabPanel(this);
  })
});
