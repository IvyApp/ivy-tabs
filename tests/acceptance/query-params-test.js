import jQuery from 'jquery';
import { click, currentURL, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | query params', function(hooks) {
  setupApplicationTest(hooks);

  test('should select a tab by query param', async function(assert) {
    await visit('/query-params?tab=B');

    assert.equal(jQuery('#query-params-tab-b', '#ember-testing').attr('aria-selected'), 'true');
  });

  test('selecting a tab should update the query param', async function(assert) {
    await visit('/query-params?tab=B');
    await click('#query-params-tab-c');

    assert.equal(currentURL(), '/query-params?tab=C');
  });
});
