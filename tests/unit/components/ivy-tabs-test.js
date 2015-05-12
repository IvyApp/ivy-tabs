import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-tabs', 'component:ivy-tabs', {
  needs: [
    'component:ivy-tab',
    'component:ivy-tab-list',
    'component:ivy-tab-panel'
  ]
});

var basicTemplate = Ember.Handlebars.compile(
  '{{#ivy-tab-list id="tablist"}}' +
  '  {{#ivy-tab id="tab1"}}tab 1{{/ivy-tab}}' +
  '  {{#ivy-tab id="tab2"}}tab 2{{/ivy-tab}}' +
  '{{/ivy-tab-list}}' +
  '{{#ivy-tab-panel id="panel1"}}panel 1{{/ivy-tab-panel}}' +
  '{{#ivy-tab-panel id="panel2"}}panel 2{{/ivy-tab-panel}}'
);

test('selects first tab by default', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  assert.equal(component.get('selected-index'), 0, 'selected-index');
});

test('selects tab on click', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  Ember.run(function() {
    component.$('#tab2').click();
  });

  assert.equal(component.get('selected-index'), 1, 'selected-index');
});

test('selects tab on touchEnd', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  Ember.run(function() {
    component.$('#tab2').trigger('touchend');
  });

  assert.equal(component.get('selected-index'), 1, 'selected-index');
});

test('WAI-ARIA attributes', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  var tablist = component.$('#tablist');
  assert.equal(tablist.attr('aria-multiselectable'), 'false', 'tablist: aria-multiselectable');
  assert.equal(tablist.attr('role'), 'tablist', 'tablist: role');

  var tab = component.$('#tab1');
  assert.equal(tab.attr('role'), 'tab', 'tab1: role');
  assert.equal(tab.attr('aria-controls'), 'panel1', 'tab1: aria-controls');

  var tabpanel = component.$('#panel1');
  assert.equal(tabpanel.attr('role'), 'tabpanel', 'panel1: role');
  assert.equal(tabpanel.attr('aria-labelledby'), 'tab1', 'panel1: aria-labelledby');
});

test('selected tab attributes', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  var tab = component.$('#tab1');
  assert.ok(tab.hasClass('active'), 'has "active" class');
  assert.equal(tab.attr('selected'), 'selected', 'selected');
  assert.equal(tab.attr('aria-selected'), 'true', 'aria-selected');
  assert.equal(tab.attr('aria-expanded'), 'true', 'aria-expanded');
  assert.equal(tab.attr('tabindex'), '0', 'tabindex');
});

test('selected panel attributes', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  var panel = component.$('#panel1');
  assert.ok(panel.hasClass('active'), 'has "active" class');
  assert.ok(panel.is(':visible'), 'is visible');
});

test('deselected tab attributes', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  var tab = component.$('#tab2');
  assert.ok(!tab.hasClass('active'), 'does not have "active" class');
  assert.equal(tab.attr('selected'), undefined, 'selected');
  assert.equal(tab.attr('aria-selected'), 'false', 'aria-selected');
  assert.equal(tab.attr('aria-expanded'), 'false', 'aria-expanded');
  assert.equal(tab.attr('tabindex'), undefined, 'tabindex');
});

test('deselected panel attributes', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  var panel = component.$('#panel2');
  assert.ok(!panel.hasClass('active'), 'does not have "active" class');
  assert.ok(!panel.is(':visible'), 'is not visible');
});

var eachLayout = Ember.Handlebars.compile(
  '{{#ivy-tab-list}}' +
  '  {{#each item in items}}' +
  '    {{#ivy-tab}}{{item}}{{/ivy-tab}}' +
  '  {{/each}}' +
  '{{/ivy-tab-list}}' +
  '{{#each item in items}}' +
  '  {{#ivy-tab-panel}}{{item}}{{/ivy-tab-panel}}' +
  '{{/each}}'
);

test('selects previous tab if active tab is removed', function(assert) {
  var component = this.subject({
    'selected-index': 1,
    items: Ember.A(['Item 1', 'Item 2']),
    layout: eachLayout
  });
  this.render();

  Ember.run(function() {
    component.get('items').removeAt(1);
  });

  assert.equal(component.get('selected-index'), 0, 'previous tab became active');
});

test('selects first tab if all tabs are replaced', function(assert) {
  var component = this.subject({
    'selected-index': 1,
    items: Ember.A(['Item 1', 'Item 2']),
    layout: eachLayout
  });
  this.render();

  Ember.run(function() {
    component.set('items', Ember.A(['Item 3', 'Item 4']));
  });

  assert.equal(component.get('selected-index'), 0, 'first tab became active');
});

test('arrow keys navigate between tabs', function(assert) {
  var component = this.subject({
    template: basicTemplate
  });
  this.render();

  var tab1 = component.$('#tab1');
  var tab2 = component.$('#tab2');

  Ember.run(tab1, 'trigger', Ember.$.Event('keydown', { keyCode: 37 }));
  assert.equal(component.get('selected-index'), 1, 'left arrow - tab2 is selected');
  assert.ok(tab2.get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(tab2, 'trigger', Ember.$.Event('keydown', { keyCode: 38 }));
  assert.equal(component.get('selected-index'), 0, 'up arrow - tab1 is selected');
  assert.ok(tab1.get(0) === document.activeElement, 'tab1 has focus');

  Ember.run(tab1, 'trigger', Ember.$.Event('keydown', { keyCode: 39 }));
  assert.equal(component.get('selected-index'), 1, 'right arrow - tab2 is selected');
  assert.ok(tab2.get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(tab2, 'trigger', Ember.$.Event('keydown', { keyCode: 40 }));
  assert.equal(component.get('selected-index'), 0, 'down arrow - tab1 is selected');
  assert.ok(tab1.get(0) === document.activeElement, 'tab1 has focus');
});
