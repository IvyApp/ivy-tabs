import jQuery from 'jquery';
import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | dynamic tabs', function(hooks) {
  setupApplicationTest(hooks);

  test('the first tab added should be selected', async function(assert) {
    await visit('/dynamic-tabs');
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));

    assert.ok(jQuery('[role="tab"]:contains("Item 1")', '#ember-testing').is('.active'));
  });

  test('the first tab should remain selected when additional tabs are added', async function(assert) {
    await visit('/dynamic-tabs');
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));

    assert.ok(jQuery('[role="tab"]:contains("Item 1")', '#ember-testing').is('.active'));
  });

  test('the next tab should become selected when the first tab is active and is removed', async function(assert) {
    await visit('/dynamic-tabs');
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('[role="tab"]:contains("Item 1")', '#ember-testing').get(0));
    await click(jQuery('[role="tab"]:contains("Item 1") .close', '#ember-testing').get(0));

    assert.ok(jQuery('[role="tab"]:contains("Item 2")', '#ember-testing').is('.active'));
  });

  test('the previous tab should become selected when the active tab is removed', async function(assert) {
    await visit('/dynamic-tabs');
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('[role="tab"]:contains("Item 2")', '#ember-testing').get(0));
    await click(jQuery('[role="tab"]:contains("Item 2") .close', '#ember-testing').get(0));

    assert.ok(jQuery('[role="tab"]:contains("Item 1")', '#ember-testing').is('.active'));
  });

  test('removing all tabs should not prevent additional tabs from being added', async function(assert) {
    await visit('/dynamic-tabs');
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('[role="tab"]:contains("Item 1") .close', '#ember-testing').get(0));
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));

    assert.ok(jQuery('[role="tab"]:contains("Item 2")', '#ember-testing').is('.active'));
  });
});
