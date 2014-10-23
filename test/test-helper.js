emq.globalize();

setResolver(Ember.DefaultResolver.extend({
  testSubjects: {
    'component:ivy-tab': ivy.tabs.IvyTabComponent,
    'component:ivy-tab-list': ivy.tabs.IvyTabListComponent,
    'component:ivy-tab-panel': ivy.tabs.IvyTabPanelComponent,
    'component:ivy-tabs': ivy.tabs.IvyTabsComponent
  },

  resolve: function(fullName) {
    return this.testSubjects[fullName] || this._super.apply(this, arguments);
  }
}).create());

document.write('<div id="ember-testing-container"><div id="ember-testing"></div></div>');
