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

test('selects first tab by default', function() {
  var component = this.subject({
    template: basicTemplate
  });
  this.append();

  equal(component.get('selected-index'), 0, 'selected-index');
});

test('selects tab on click', function() {
  var component = this.subject({
    template: basicTemplate
  });
  this.append();

  Ember.run(function() {
    component.$('#tab2').click();
  });

  equal(component.get('selected-index'), 1, 'selected-index');
});

test('WAI-ARIA attributes', function() {
  var component = this.subject({
    template: basicTemplate
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
    template: basicTemplate
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
    template: basicTemplate
  });
  this.append();

  var panel = component.$('#panel1');
  ok(panel.hasClass('active'), 'has "active" class');
  ok(panel.is(':visible'), 'is visible');
});

test('deselected tab attributes', function() {
  var component = this.subject({
    template: basicTemplate
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
    template: basicTemplate
  });
  this.append();

  var panel = component.$('#panel2');
  ok(!panel.hasClass('active'), 'does not have "active" class');
  ok(!panel.is(':visible'), 'is not visible');
});

test('selects previous tab if active tab is removed', function() {
  var component = this.subject({
    'selected-index': 1,

    items: Ember.A([
      { tabId: 'tab1', panelId: 'panel1', name: 'Item 1' },
      { tabId: 'tab2', panelId: 'panel2', name: 'Item 2' }
    ]),

    layout: Ember.Handlebars.compile(
      '{{#ivy-tab-list id="tablist"}}' +
      '  {{#each item in items}}' +
      '    {{#ivy-tab id=tabId}}{{item.name}}{{/ivy-tab}}' +
      '  {{/each}}' +
      '{{/ivy-tab-list}}' +
      '{{#each item in items}}' +
      '  {{#ivy-tab-panel id=panelId}}{{item.name}}{{/ivy-tab-panel}}' +
      '{{/each}}'
    )
  });
  this.append();

  Ember.run(function() {
    component.get('items').removeAt(1);
  });

  equal(component.get('selected-index'), 0, 'tab2 became active');
});

test('arrow keys navigate between tabs', function() {
  var component = this.subject({
    template: basicTemplate
  });
  this.append();

  var tab1 = component.$('#tab1');
  var tab2 = component.$('#tab2');

  Ember.run(tab1, 'trigger', Ember.$.Event('keydown', { keyCode: 37 }));
  equal(component.get('selected-index'), 1, 'left arrow - tab2 is selected');
  ok(tab2.get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(tab2, 'trigger', Ember.$.Event('keydown', { keyCode: 38 }));
  equal(component.get('selected-index'), 0, 'up arrow - tab1 is selected');
  ok(tab1.get(0) === document.activeElement, 'tab1 has focus');

  Ember.run(tab1, 'trigger', Ember.$.Event('keydown', { keyCode: 39 }));
  equal(component.get('selected-index'), 1, 'right arrow - tab2 is selected');
  ok(tab2.get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(tab2, 'trigger', Ember.$.Event('keydown', { keyCode: 40 }));
  equal(component.get('selected-index'), 0, 'down arrow - tab1 is selected');
  ok(tab1.get(0) === document.activeElement, 'tab1 has focus');
});
