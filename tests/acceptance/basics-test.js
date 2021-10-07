import { visit } from '@ember/test-helpers';
import { findTab } from '../helpers/finders';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | basics', function (hooks) {
  setupApplicationTest(hooks);

  test('should select the first tab by default', async function (assert) {
    await visit('/');
    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
  });
});
