import jQuery from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | basics', function(hooks) {
  setupApplicationTest(hooks);

  test('should select the first tab by default', async function(assert) {
    await visit('/');
    assert.equal(jQuery('#basic-tab-a').attr('aria-selected'), 'true');
  });
});
