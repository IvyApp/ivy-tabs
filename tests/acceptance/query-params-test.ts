import { click, currentURL, visit } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { module, test } from 'qunit';
import { findTab } from '../helpers/finders';

module('Acceptance | query params', hooks => {
  setupApplicationTest(hooks);

  test('should select a tab by query param', async assert => {
    await visit('/query-params?tab=B');

    assert.equal(findTab('Tab B').getAttribute('aria-selected'), 'true');
  });

  test('selecting a tab should update the query param', async assert => {
    await visit('/query-params?tab=B');
    await click(findTab('Tab C'));

    assert.equal(currentURL(), '/query-params?tab=C');
  });
});
