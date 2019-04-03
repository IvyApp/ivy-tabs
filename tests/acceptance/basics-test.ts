import { visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { findTab } from '../helpers/finders';

module('Acceptance | basics', hooks => {
  setupApplicationTest(hooks);

  test('should select the first tab by default', async assert => {
    await visit('/');

    assert.equal(findTab('Tab A').getAttribute('aria-selected'), 'true');
  });
});
