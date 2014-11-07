emq.globalize();

setResolver(Ember.DefaultResolver.extend({
  testSubjects: {
    'component:ivy-tab': IvyTabs.IvyTabComponent,
    'component:ivy-tab-list': IvyTabs.IvyTabListComponent,
    'component:ivy-tab-panel': IvyTabs.IvyTabPanelComponent,
    'component:ivy-tabs': IvyTabs.IvyTabsComponent
  },

  resolve: function(fullName) {
    return this.testSubjects[fullName] || this._super.apply(this, arguments);
  }
}).create());

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
