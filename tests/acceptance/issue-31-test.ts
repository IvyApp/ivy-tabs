import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { findButtonByText, findCheckboxFor, findTab } from '../helpers/finders';

module('Acceptance | issue #31', hooks => {
  setupApplicationTest(hooks);

  test('should keep Tab A selected when navigating between demo pages', async assert => {
    await visit('/');

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');

    await visit('/query-params');
    await visit('/');

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
  });

  test('should select correct next tab after bulk removal', async assert => {
    await visit('/dynamic-tabs');
    await click(findButtonByText('Add an Item'));
    await click(findButtonByText('Add an Item'));
    await click(findButtonByText('Add an Item'));

    assert.equal(
      findTab('Item 1').getAttribute('aria-selected'),
      'true',
      'Item 1 is selected'
    );

    await click(findCheckboxFor('Item 1'));
    await click(findCheckboxFor('Item 2'));
    await click(findButtonByText('Remove 2 Item(s)'));

    assert.equal(
      findTab('Item 3').getAttribute('aria-selected'),
      'true',
      'Item 3 is selected'
    );
  });
});
