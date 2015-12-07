import Ember from 'ember';

/**
 * @module ivy-tabs
 */

/**
 * @class IvyTabListComponent
 * @namespace IvyTabs
 * @extends Ember.Component
 */
export default Ember.Component.extend({
  tagName: 'ul',
  attributeBindings: ['aria-multiselectable', 'role'],
  classNames: ['ivy-tab-list'],

  init: function() {
    this._super();
    Ember.run.once(this, this._registerWithTabsContainer);
  },

  willDestroy: function() {
    this._super();
    Ember.run.once(this, this._unregisterWithTabsContainer);
  },

  /**
   * Tells screenreaders that only one tab can be selected at a time.
   *
   * @property aria-multiselectable
   * @type String
   * @default 'false'
   */
  'aria-multiselectable': 'false',

  /**
   * The `role` attribute of the tab list element.
   *
   * See http://www.w3.org/TR/wai-aria/roles#tablist
   *
   * @property role
   * @type String
   * @default 'tablist'
   */
  role: 'tablist',

  /**
   * Gives focus to the selected tab.
   *
   * @method focusSelectedTab
   */
  focusSelectedTab: function() {
    this.get('selectedTab').$().focus();
  },

  /**
   * Event handler for navigating tabs via arrow keys. The left (or up) arrow
   * selects the previous tab, while the right (or down) arrow selects the next
   * tab.
   *
   * @method navigateOnKeyDown
   * @param {Event} event
   */
  navigateOnKeyDown: Ember.on('keyDown', function(event) {
    switch (event.keyCode) {
    case 37: /* left */
    case 38: /* up */
      this.selectPreviousTab();
      break;
    case 39: /* right */
    case 40: /* down */
      this.selectNextTab();
      break;
    default:
      return;
    }

    event.preventDefault();
    Ember.run.scheduleOnce('afterRender', this, this.focusSelectedTab);
  }),

  /**
   * Adds a tab to the `tabs` array.
   *
   * @method registerTab
   * @param {IvyTabs.IvyTabComponent} tab
   */
  registerTab: function(tab) {
    this.get('tabs').pushObject(tab);
  },

  /**
   * Selects the next tab in the list, if any.
   *
   * @method selectNextTab
   */
  selectNextTab: function() {
    var nextTab = this.findNextEnabledTab( this.get('selected-index') );

    if (nextTab) {
      this.selectTab( nextTab );
    }
  },

  /**
   * Selects the previous tab in the list, if any.
   *
   * @method selectPreviousTab
   */
  selectPreviousTab: function() {
    var prevTab = this.findPreviousEnabledTab( this.get('selected-index') );

    if (prevTab) {
      this.selectTab( prevTab );
    }
  },

  /**
   * Finds next tab that is not disabled
   *
   * @method findNextEnabledTab
   * @param {String} index
   */
  findNextEnabledTab: function findNextEnabledTab(index) {
    var lastIndex = this.get('tabs.length') - 1,
        tabs = this.get('tabs'),
        i, tab;

    index++;

    for (i = index; i <= lastIndex; i++) {
      tab = tabs.objectAt(i);

      if (!tab.get('isDisabled')) {
        return tab;
      }
    }

    for (i = 0; i < index; i++) {
      tab = tabs.objectAt(i);

      if (!tab.get('isDisabled')) {
        return tab;
      }
    }

    return null;
  },

  /**
   * Finds previous tab that is not disabled
   *
   * @method findPreviousEnabledTab
   * @param {String} index
   */
  findPreviousEnabledTab: function findPreviousEnabledTab(index) {
    var lastIndex = this.get('tabs.length') - 1,
        tabs = this.get('tabs'),
        i, tab;

    index--;

    for (i = index; i >= 0; i--) {
      tab = tabs.objectAt(i);

      if (!tab.get('isDisabled')) {
        return tab;
      }
    }

    for (i = lastIndex; i > index; i--) {
      tab = tabs.objectAt(i);

      if (!tab.get('isDisabled')) {
        return tab;
      }
    }

    return null;
  },

  'selected-index': Ember.computed.alias('tabsContainer.selected-index'),

  /**
   * The currently-selected `ivy-tab` instance.
   *
   * @property selectedTab
   * @type IvyTabs.IvyTabComponent
   */
  selectedTab: Ember.computed(function() {
    return this.get('tabs').objectAt(this.get('selected-index'));
  }).property('selected-index', 'tabs.[]'),

  /**
   * Select the given tab.
   *
   * @method selectTab
   * @param {IvyTabs.IvyTabComponent} tab
   */
  selectTab: function(tab) {
    this.selectTabByIndex(this.get('tabs').indexOf(tab));
  },

  /**
   * Select the tab at `index`.
   *
   * @method selectTabByIndex
   * @param {Number} index
   */
  selectTabByIndex: function(index) {
    var tabs = this.get('tabs'),
        tab = tabs.objectAt(index);

    if (!tab || tab.get('isDisabled')) {
      return;
    }

    this.set('selected-index', index);

    for (var i = tabs.length - 1; i >= 0; i--) {
      tabs[i].set('isComplete', i < index);
    }
  },

  /**
   * The `ivy-tabs` component.
   *
   * @property tabsContainer
   * @type IvyTabs.IvyTabsComponent
   * @readOnly
   */
  tabsContainer: Ember.computed.alias('parentView').readOnly(),

  /**
   * Removes a tab from the `tabs` array.
   *
   * @method unregisterTab
   * @param {IvyTabs.IvyTabComponent} tab
   */
  unregisterTab: function(tab) {
    var index = tab.get('index');
    this.get('tabs').removeObject(tab);

    if (index < this.get('selected-index')) {
      this.selectPreviousTab();
    } else if (tab.get('isSelected')) {
      if (index !== 0) {
        this.selectPreviousTab();
      }
    }
  },

  _initTabs: Ember.on('init', function() {
    this.set('tabs', Ember.A());
  }),

  _registerWithTabsContainer: function() {
    this.get('tabsContainer').registerTabList(this);
  },

  _unregisterWithTabsContainer: function() {
    this.get('tabsContainer').unregisterTabList(this);
  }
});
