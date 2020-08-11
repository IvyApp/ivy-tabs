import hbs from 'htmlbars-inline-precompile';
import { run } from '@ember/runloop';
import { A } from '@ember/array';
import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';

import { render } from '@ember/test-helpers';

module('ivy-tabs', function(hooks) {
  setupRenderingTest(hooks);

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

  test('selects previous tab if active tab is removed', async function(assert) {
    this.set('selection', 'Item 2');
    this.set('items', A(['Item 1', 'Item 2']));
    await render(eachTemplate);

    run(this, function() {
      this.items.removeAt(1);
    });

    assert.equal(this.selection, 'Item 1', 'previous tab became active');
  });

  test('selects previous tab if active tab is removed via replacement', async function(assert) {
    this.set('selection', 'Item 2');
    this.set('items', A(['Item 1', 'Item 2']));
    await render(eachTemplate);

    run(this, function() {
      this.set('items', A(['Item 3']));
    });

    assert.equal(this.selection, 'Item 3', 'previous tab became active');
  });

  test('retains tab selection if preceeding tab is removed', async function(assert) {
    this.set('selection', 'Item 2');
    this.set('items', A(['Item 1', 'Item 2']));
    await render(eachTemplate);

    run(this, function() {
      this.items.removeAt(0);
    });

    assert.equal(this.selection, 'Item 2', 'tab selection is retained');
  });

  test('selects the next tab when an active, first tab is removed', async function(assert) {
    this.set('selection', 'Item 1');
    this.set('items', A(['Item 1', 'Item 2', 'Item 3']));
    await render(eachTemplate);

    run(this, function() {
      this.items.removeAt(0);
    });

    assert.equal(this.selection, 'Item 2', 'selects next tab');
  });

  test('does not select tabs while being destroyed', async function(assert) {
    const _this = this;
    let selectionCount = 0;

    this.set('selectionAction', function(selection) {
      _this.set('selection', selection);
      selectionCount++;
    });

    this.set('items', A(['Item 1', 'Item 2', 'Item 3']));
    await render(hbs`
      {{#unless hideComponent}}
        {{#ivy-tabs selection=selection as |tabs|}}
          {{#tabs.tablist as |tablist|}}
            {{#each items as |item|}}
              {{#tablist.tab item on-select=(action selectionAction)}}{{item}}{{/tablist.tab}}
            {{/each}}
          {{/tabs.tablist}}
          {{#each items as |item|}}
            {{#tabs.tabpanel item}}{{item}}{{/tabs.tabpanel}}
          {{/each}}
        {{/ivy-tabs}}
      {{/unless}}
    `);

    assert.equal(
      selectionCount,
      1,
      'Triggers initial, automatic on-select during setup'
    );

    run(this, function() {
      // Force a destruction of the component.
      this.set('hideComponent', true);
    });

    assert.equal(
      selectionCount,
      1,
      'Does not trigger on-select during destroy'
    );
  });
});
