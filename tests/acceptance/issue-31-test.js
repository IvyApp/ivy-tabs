import jQuery from 'jquery';
import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | issue #31', function(hooks) {
  setupApplicationTest(hooks);

  test('should keep Tab A selected when navigating between demo pages', async function(assert) {
    await visit('/');

    assert.equal(jQuery('[role="tab"][aria-selected="true"]', '#ember-testing').text().trim(), 'Tab A');

    await visit('/query-params');
    await visit('/');

    assert.equal(jQuery('[role="tab"][aria-selected="true"]', '#ember-testing').text().trim(), 'Tab A');
  });

  test('should select correct next tab after bulk removal', async function(assert) {
    await visit('/dynamic-tabs');
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));
    await click(jQuery('.btn:contains("Add an Item")', '#ember-testing').get(0));

    assert.equal(jQuery('[role="tab"]:contains("Item 1")', '#ember-testing').attr('aria-selected'), 'true', 'Item 1 is selected');

    await click(jQuery('input[type="checkbox"]:eq(0)', '#ember-testing').get(0));
    await click(jQuery('input[type="checkbox"]:eq(1)', '#ember-testing').get(0));
    await click(jQuery('.btn:contains("Remove 2 Item(s)")', '#ember-testing').get(0));

    assert.equal(jQuery('[role="tab"]:contains("Item 3")', '#ember-testing').attr('aria-selected'), 'true', 'Item 3 is selected');
  });
});
