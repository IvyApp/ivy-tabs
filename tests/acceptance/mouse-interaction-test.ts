import { click, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { findTab } from '../helpers/finders';

module('Acceptance | mouse interaction', hooks => {
  setupApplicationTest(hooks);

  test('clicking a tab should select it', async assert => {
    await visit('/');
    await click(findTab('Tab B'));

    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'true');
  });
});
