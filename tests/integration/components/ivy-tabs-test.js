import Ember from 'ember';
import hbs from 'htmlbars-inline-precompile';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-tabs', {
  integration: true
});

const basicTemplate = hbs`
  {{#ivy-tabs selected-index=selectedIndex as |tabs|}}
    {{#tabs.tablist id="tablist" as |tablist|}}
      {{#tablist.tab id="tab1"}}tab 1{{/tablist.tab}}
      {{#tablist.tab id="tab2"}}tab 2{{/tablist.tab}}
    {{/tabs.tablist}}
    {{#tabs.tabpanel id="panel1"}}panel 1{{/tabs.tabpanel}}
    {{#tabs.tabpanel id="panel2"}}panel 2{{/tabs.tabpanel}}
  {{/ivy-tabs}}
`;

test('selects first tab by default', function(assert) {
  this.render(basicTemplate);

  assert.equal(this.get('selectedIndex'), 0, 'selected-index');
});

test('selects tab by index', function(assert) {
  this.set('selectedIndex', 1);
  this.render(basicTemplate);

  assert.equal(this.get('selectedIndex'), 1, 'selected-index');
});

test('selects tab on click', function(assert) {
  this.render(basicTemplate);
  this.$('#tab2').click();

  assert.equal(this.get('selectedIndex'), 1, 'selected-index');
});

test('selects tab on touchEnd', function(assert) {
  this.render(basicTemplate);
  this.$('#tab2').trigger('touchend');

  assert.equal(this.get('selectedIndex'), 1, 'selected-index');
});

test('WAI-ARIA attributes', function(assert) {
  this.render(basicTemplate);

  const tablist = this.$('#tablist');
  assert.equal(tablist.attr('aria-multiselectable'), 'false', 'tablist: aria-multiselectable');
  assert.equal(tablist.attr('role'), 'tablist', 'tablist: role');

  const tab = this.$('#tab1');
  assert.equal(tab.attr('role'), 'tab', 'tab1: role');
  assert.equal(tab.attr('aria-controls'), 'panel1', 'tab1: aria-controls');

  let tabpanel = this.$('#panel1');
  assert.equal(tabpanel.attr('role'), 'tabpanel', 'panel1: role');
  assert.equal(tabpanel.attr('aria-labelledby'), 'tab1', 'panel1: aria-labelledby');
  assert.equal(tabpanel.attr('aria-hidden'), 'false', 'panel1: aria-hidden');

  tabpanel = this.$('#panel2');
  assert.equal(tabpanel.attr('role'), 'tabpanel', 'panel2: role');
  assert.equal(tabpanel.attr('aria-labelledby'), 'tab2', 'panel2: aria-labelledby');
  assert.equal(tabpanel.attr('aria-hidden'), 'true', 'panel2: aria-hidden');
});

test('selected tab attributes', function(assert) {
  this.render(basicTemplate);

  const tab = this.$('#tab1');
  assert.ok(tab.hasClass('active'), 'has "active" class');
  assert.equal(tab.attr('selected'), 'selected', 'selected');
  assert.equal(tab.attr('aria-selected'), 'true', 'aria-selected');
  assert.equal(tab.attr('aria-expanded'), 'true', 'aria-expanded');
  assert.equal(tab.attr('tabindex'), '0', 'tabindex');
});

test('selected panel attributes', function(assert) {
  this.render(basicTemplate);

  const panel = this.$('#panel1');
  assert.ok(panel.hasClass('active'), 'has "active" class');
  assert.equal(panel.attr('aria-hidden'), 'false', 'aria-hidden');
  assert.ok(panel.is(':visible'), 'is visible');
});

test('deselected tab attributes', function(assert) {
  this.render(basicTemplate);

  const tab = this.$('#tab2');
  assert.ok(!tab.hasClass('active'), 'does not have "active" class');
  assert.equal(tab.attr('selected'), undefined, 'selected');
  assert.equal(tab.attr('aria-selected'), 'false', 'aria-selected');
  assert.equal(tab.attr('aria-expanded'), 'false', 'aria-expanded');
  assert.equal(tab.attr('tabindex'), undefined, 'tabindex');
});

test('deselected panel attributes', function(assert) {
  this.render(basicTemplate);

  const panel = this.$('#panel2');
  assert.ok(!panel.hasClass('active'), 'does not have "active" class');
  assert.equal(panel.attr('aria-hidden'), 'true', 'aria-hidden');
  assert.ok(!panel.is(':visible'), 'is not visible');
});

const eachTemplate = hbs`
  {{#ivy-tabs selected-index=selectedIndex as |tabs|}}
    {{#tabs.tablist as |tablist|}}
      {{#each items as |item|}}
        {{#tablist.tab}}{{item}}{{/tablist.tab}}
      {{/each}}
    {{/tabs.tablist}}
    {{#each items as |item|}}
      {{#tabs.tabpanel}}{{item}}{{/tabs.tabpanel}}
    {{/each}}
  {{/ivy-tabs}}
`;

test('selects previous tab if active tab is removed', function(assert) {
  this.set('selectedIndex', 1);
  this.set('items', Ember.A(['Item 1', 'Item 2']));
  this.render(eachTemplate);

  Ember.run(this, function() {
    this.get('items').removeAt(1);
  });

  assert.equal(this.get('selectedIndex'), 0, 'previous tab became active');
});

test('selects previous tab if active tab is removed via replacement', function(assert) {
  this.set('selectedIndex', 1);
  this.set('items', Ember.A(['Item 1', 'Item 2']));
  this.render(eachTemplate);

  Ember.run(this, function() {
    this.set('items', Ember.A(['Item 3']));
  });

  assert.equal(this.get('selectedIndex'), 0, 'previous tab became active');
});

test('retains tab selection if preceeding tab is removed', function(assert) {
  this.set('selectedIndex', 1);
  this.set('items', Ember.A(['Item 1', 'Item 2']));
  this.render(eachTemplate);

  Ember.run(this, function() {
    this.get('items').removeAt(0);
  });

  assert.equal(this.get('selectedIndex'), 0, 'tab selection is retained');
});

test('selects the next tab when an active, first tab is removed', function(assert) {
  this.set('selectedIndex', 0);
  this.set('items', Ember.A(['Item 1', 'Item 2', 'Item 3']));
  this.render(eachTemplate);

  Ember.run(this, function() {
    this.get('items').removeAt(0);
  });

  assert.equal(this.get('selectedIndex'), 0, 'selects next tab');
});

test('arrow keys navigate between tabs', function(assert) {
  this.render(basicTemplate);

  const tab1 = this.$('#tab1');
  const tab2 = this.$('#tab2');

  Ember.run(tab1, 'trigger', Ember.$.Event('keydown', { keyCode: 37 }));
  assert.equal(this.get('selectedIndex'), 1, 'left arrow - tab2 is selected');
  assert.ok(tab2.get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(tab2, 'trigger', Ember.$.Event('keydown', { keyCode: 38 }));
  assert.equal(this.get('selectedIndex'), 0, 'up arrow - tab1 is selected');
  assert.ok(tab1.get(0) === document.activeElement, 'tab1 has focus');

  Ember.run(tab1, 'trigger', Ember.$.Event('keydown', { keyCode: 39 }));
  assert.equal(this.get('selectedIndex'), 1, 'right arrow - tab2 is selected');
  assert.ok(tab2.get(0) === document.activeElement, 'tab2 has focus');

  Ember.run(tab2, 'trigger', Ember.$.Event('keydown', { keyCode: 40 }));
  assert.equal(this.get('selectedIndex'), 0, 'down arrow - tab1 is selected');
  assert.ok(tab1.get(0) === document.activeElement, 'tab1 has focus');
});
