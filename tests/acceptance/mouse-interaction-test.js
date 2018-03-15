import { click, visit } from '@ember/test-helpers';
import { findTab } from '../helpers/finders';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | mouse interaction', function(hooks) {
  setupApplicationTest(hooks);

  test('clicking a tab should select it', async function(assert) {
    await visit('/');
    await click(findTab('Tab B'));

    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'true');
  });
});
