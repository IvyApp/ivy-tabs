import hbs from 'htmlbars-inline-precompile';
import run from 'ember-runloop';
import { A } from 'ember-array/utils';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('ivy-tabs', {
  integration: true
});

const eachTemplate = hbs`
  {{#ivy-tabs selection=selection as |tabs|}}
    {{#tabs.tablist as |tablist|}}
      {{#each items as |item|}}
        {{#tablist.tab item on-select=(action (mut selection))}}{{item}}{{/tablist.tab}}
      {{/each}}
    {{/tabs.tablist}}
    {{#each items as |item|}}
      {{#tabs.tabpanel item}}{{item}}{{/tabs.tabpanel}}
    {{/each}}
  {{/ivy-tabs}}
`;

test('selects previous tab if active tab is removed', function(assert) {
  this.set('selection', 'Item 2');
  this.set('items', A(['Item 1', 'Item 2']));
  this.render(eachTemplate);

  run(this, function() {
    this.get('items').removeAt(1);
  });

  assert.equal(this.get('selection'), 'Item 1', 'previous tab became active');
});

test('selects previous tab if active tab is removed via replacement', function(assert) {
  this.set('selection', 'Item 2');
  this.set('items', A(['Item 1', 'Item 2']));
  this.render(eachTemplate);

  run(this, function() {
    this.set('items', A(['Item 3']));
  });

  assert.equal(this.get('selection'), 'Item 3', 'previous tab became active');
});

test('retains tab selection if preceeding tab is removed', function(assert) {
  this.set('selection', 'Item 2');
  this.set('items', A(['Item 1', 'Item 2']));
  this.render(eachTemplate);

  run(this, function() {
    this.get('items').removeAt(0);
  });

  assert.equal(this.get('selection'), 'Item 2', 'tab selection is retained');
});

test('selects the next tab when an active, first tab is removed', function(assert) {
  this.set('selection', 'Item 1');
  this.set('items', A(['Item 1', 'Item 2', 'Item 3']));
  this.render(eachTemplate);

  run(this, function() {
    this.get('items').removeAt(0);
  });

  assert.equal(this.get('selection'), 'Item 2', 'selects next tab');
});
