import { visit } from '@ember/test-helpers';
import { findTab, findTabPanel } from '../helpers/finders';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | classes', function (hooks) {
  setupApplicationTest(hooks);

  test('the active tab should be .active', async function (assert) {
    await visit('/');

    assert.dom(findTab('Tab A')).hasClass('active');
  });

  test('the inactive tabs should not be .active', async function (assert) {
    await visit('/');

    assert.dom(findTab('Tab B')).hasNoClass('active');
    assert.dom(findTab('Tab C')).hasNoClass('active');
  });

  test('the active tabpanel should be .active', async function (assert) {
    await visit('/');

    assert.dom(findTabPanel('Tab A')).hasClass('active');
  });

  test('the inactive tabpanels should not be .active', async function (assert) {
    await visit('/');

    assert.dom(findTabPanel('Tab B')).hasNoClass('active');
    assert.dom(findTabPanel('Tab C')).hasNoClass('active');
  });
});
