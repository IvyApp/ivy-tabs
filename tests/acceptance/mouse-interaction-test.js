import jQuery from 'jquery';
import { click, visit } from '@ember/test-helpers';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | mouse interaction', function(hooks) {
  setupApplicationTest(hooks);

  test('clicking a tab should select it', async function(assert) {
    await visit('/');
    await click('#basic-tab-b');

    assert.equal(jQuery('#basic-tab-b', '#ember-testing').attr('aria-selected'), 'true');
  });
});
