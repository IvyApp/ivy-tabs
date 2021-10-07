import { visit } from '@ember/test-helpers';
import { findTab } from '../helpers/finders';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | query params', function (hooks) {
  setupApplicationTest(hooks);

  test('tabs should have correct hrefs', async function (assert) {
    await visit('/routable-tabs');
    assert.equal(findTab('Tab A').getAttribute('href'), '/routable-tabs/tab-a');
    assert.equal(findTab('Tab B').getAttribute('href'), '/routable-tabs/tab-b');
    assert.equal(findTab('Tab C').getAttribute('href'), '/routable-tabs/tab-c');
  });
});
