import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { findTab, findTabPanel } from '../helpers/finders';

module('Acceptance | classes', hooks => {
  setupApplicationTest(hooks);

  test('the active tab should be .active', async assert => {
    await visit('/');

    assert.ok(findTab('Tab A').classList.contains('active'));
  });

  test('the inactive tabs should not be .active', async assert => {
    await visit('/');

    assert.notOk(findTab('Tab B').classList.contains('active'));
    assert.notOk(findTab('Tab C').classList.contains('active'));
  });

  test('the active tabpanel should be .active', async assert => {
    await visit('/');

    assert.ok(findTabPanel('Tab A').classList.contains('active'));
  });

  test('the inactive tabpanels should not be .active', async assert => {
    await visit('/');

    assert.notOk(findTabPanel('Tab B').classList.contains('active'));
    assert.notOk(findTabPanel('Tab C').classList.contains('active'));
  });
});
