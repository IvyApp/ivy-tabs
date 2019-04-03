import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { findButtonByText, findTab } from '../helpers/finders';

module('Acceptance | dynamic tabs', hooks => {
  setupApplicationTest(hooks);

  test('aria-multiselectable=false and role=tablist is added when non-empty', async assert => {
    await visit('/dynamic-tabs');

    assert.dom('#dynamic-tablist').doesNotHaveAttribute('aria-multiselectable');
    assert.dom('#dynamic-tablist').hasAttribute('role', 'presentation');

    await click(findButtonByText('Add an Item'));

    assert
      .dom('#dynamic-tablist')
      .hasAttribute('aria-multiselectable', 'false');
    assert.dom('#dynamic-tablist').hasAttribute('role', 'tablist');

    await click(findTab('Item 1').querySelector('.close')!);

    assert.dom('#dynamic-tablist').doesNotHaveAttribute('aria-multiselectable');
    assert.dom('#dynamic-tablist').hasAttribute('role', 'presentation');
  });

  test('the first tab added should be selected', async assert => {
    await visit('/dynamic-tabs');
    await click(findButtonByText('Add an Item'));

    assert.ok(findTab('Item 1').classList.contains('active'));
  });

  test('the first tab should remain selected when additional tabs are added', async assert => {
    await visit('/dynamic-tabs');
    await click(findButtonByText('Add an Item'));
    await click(findButtonByText('Add an Item'));

    assert.ok(findTab('Item 1').classList.contains('active'));
  });

  test('the next tab should become selected when the first tab is active and is removed', async assert => {
    await visit('/dynamic-tabs');
    await click(findButtonByText('Add an Item'));
    await click(findButtonByText('Add an Item'));
    await click(findTab('Item 1'));
    await click(findTab('Item 1').querySelector('.close')!);

    assert.ok(findTab('Item 2').classList.contains('active'));
  });

  test('the previous tab should become selected when the active tab is removed', async assert => {
    await visit('/dynamic-tabs');
    await click(findButtonByText('Add an Item'));
    await click(findButtonByText('Add an Item'));
    await click(findTab('Item 2'));

    assert.ok(findTab('Item 2').classList.contains('active'));

    await click(findTab('Item 2').querySelector('.close')!);

    assert.ok(findTab('Item 1').classList.contains('active'));
  });

  test('removing all tabs should not prevent additional tabs from being added', async assert => {
    await visit('/dynamic-tabs');
    await click(findButtonByText('Add an Item'));
    await click(findTab('Item 1').querySelector('.close')!);
    await click(findButtonByText('Add an Item'));

    assert.ok(findTab('Item 2').classList.contains('active'));
  });
});
