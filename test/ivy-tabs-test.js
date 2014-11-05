moduleForComponent('ivy-tabs', 'component:ivy-tabs', {
  needs: [
    'component:ivy-tab',
    'component:ivy-tab-list',
    'component:ivy-tab-panel'
  ]
});

test('selects first tab by default', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  equal(component.get('selected-index'), 0, 'selected-index');
  ok(component.$('#tab1').is('[aria-selected=true]'), 'tab1 is selected');
  ok(component.$('#tab2').is('[aria-selected=false]'), 'tab2 is not selected');
  ok(component.$('#panel1').is(':visible'), 'panel1 is visible');
  ok(component.$('#panel2').is(':not(:visible)'), 'panel2 is not visible');
});

test('selects tab by selected-index', function() {
  var component = this.subject({
    'selected-index': 1,

    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  equal(component.get('selected-index'), 1, 'selected-index');
  ok(component.$('#tab1').is('[aria-selected=false]'), 'tab1 is not selected');
  ok(component.$('#tab2').is('[aria-selected=true]'), 'tab2 is selected');
  ok(component.$('#panel1').is(':not(:visible)'), 'panel1 is not visible');
  ok(component.$('#panel2').is(':visible'), 'panel2 is visible');

  Ember.run(function() {
    component.set('selected-index', 0);
  });

  equal(component.get('selected-index'), 0, 'selected-index');
  ok(component.$('#tab1').is('[aria-selected=true]'), 'tab1 is selected');
  ok(component.$('#tab2').is('[aria-selected=false]'), 'tab2 is not selected');
  ok(component.$('#panel1').is(':visible'), 'panel1 is visible');
  ok(component.$('#panel2').is(':not(:visible)'), 'panel2 is not visible');
});

test('selects tab on click', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  Ember.run(function() {
    component.$('#tab2').click();
  });

  equal(component.get('selected-index'), 1, 'selected-index');
  ok(component.$('#tab1').is('[aria-selected=false]'), 'tab1 is not selected');
  ok(component.$('#tab2').is('[aria-selected=true]'), 'tab2 is selected');
  ok(component.$('#panel1').is(':not(:visible)'), 'panel1 is not visible');
  ok(component.$('#panel2').is(':visible'), 'panel2 is visible');
});

test('WAI-ARIA attributes', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  var tablist = component.$('#tablist');
  equal(tablist.attr('aria-multiselectable'), 'false', 'tablist: aria-multiselectable');
  equal(tablist.attr('role'), 'tablist', 'tablist: role');

  var tab = component.$('#tab1');
  equal(tab.attr('role'), 'tab', 'tab1: role');
  equal(tab.attr('aria-controls'), 'panel1', 'tab1: aria-controls');

  var tabpanel = component.$('#panel1');
  equal(tabpanel.attr('role'), 'tabpanel', 'panel1: role');
  equal(tabpanel.attr('aria-labelledby'), 'tab1', 'panel1: aria-labelledby');
});

test('selected tab attributes', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  var tab = component.$('#tab1');
  ok(tab.hasClass('active'), 'has "active" class');
  equal(tab.attr('selected'), 'selected', 'selected');
  equal(tab.attr('aria-selected'), 'true', 'aria-selected');
  equal(tab.attr('aria-expanded'), 'true', 'aria-expanded');
  equal(tab.attr('tabindex'), '0', 'tabindex');
});

test('selected panel attributes', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  var panel = component.$('#panel1');
  ok(panel.hasClass('active'), 'has "active" class');
});

test('deselected tab attributes', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  var tab = component.$('#tab2');
  ok(!tab.hasClass('active'), 'does not have "active" class');
  equal(tab.attr('selected'), undefined, 'selected');
  equal(tab.attr('aria-selected'), 'false', 'aria-selected');
  equal(tab.attr('aria-expanded'), 'false', 'aria-expanded');
  equal(tab.attr('tabindex'), undefined, 'tabindex');
});

test('deselected panel attributes', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  var panel = component.$('#panel2');
  ok(!panel.hasClass('active'), 'does not have "active" class');
});

test('selects previous tab if active tab is removed', function() {
  var component = this.subject({
    items: Ember.A([
      { tabId: 'tab1', panelId: 'panel1', name: 'Item 1' },
      { tabId: 'tab2', panelId: 'panel2', name: 'Item 2' }
    ]),

    layout: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#each items}}' +
      '    {{#ivy-tab id=tabId}}{{name}}{{/ivy-tab}}' +
      '  {{/each}}' +
      '{{/ivy-tab-list}}' +
      '{{#each items}}' +
      '  {{#ivy-tab-panel id=panelId}}{{name}}{{/ivy-tab-panel}}' +
      '{{/each}}'
    )
  });
  this.append();

  ok(component.$('#tab1').hasClass('active'), 'tab1 is active');
  ok(!component.$('#tab2').hasClass('active'), 'tab2 is not active');

  Ember.run(function() {
    component.get('items').removeAt(0);
  });

  equal(component.$('#tab1').length, 0, 'tab1 was removed');
  ok(component.$('#tab2').hasClass('active'), 'tab2 became active');
});

test('arrow keys navigate between tabs', function() {
  var component = this.subject({
    template: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
      '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
      '{{/ivy-tab-list}}' +
      '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
      '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
    )
  });
  this.append();

  Ember.run(component.$('#tab1'), 'trigger', jQuery.Event('keydown', { keyCode: 37 }));
  equal(component.get('selected-index'), 1, 'left arrow - tab2 is selected');
  ok(component.$('#tab2').get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(component.$('#tab2'), 'trigger', jQuery.Event('keydown', { keyCode: 38 }));
  equal(component.get('selected-index'), 0, 'up arrow - tab1 is selected');
  ok(component.$('#tab1').get(0) === document.activeElement, 'tab1 has focus');

  Ember.run(component.$('#tab1'), 'trigger', jQuery.Event('keydown', { keyCode: 39 }));
  equal(component.get('selected-index'), 1, 'right arrow - tab2 is selected');
  ok(component.$('#tab2').get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(component.$('#tab2'), 'trigger', jQuery.Event('keydown', { keyCode: 40 }));
  equal(component.get('selected-index'), 0, 'down arrow - tab1 is selected');
  ok(component.$('#tab1').get(0) === document.activeElement, 'tab1 has focus');
});
