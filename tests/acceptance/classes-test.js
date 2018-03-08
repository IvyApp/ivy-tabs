import jQuery from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | classes', function(hooks) {
  setupApplicationTest(hooks);

  test('the active tab should be .active', async function(assert) {
    await visit('/');

    assert.ok(jQuery('#basic-tab-a', '#ember-testing').is('.active'));
  });

  test('the inactive tabs should not be .active', async function(assert) {
    await visit('/');

    assert.notOk(jQuery('#basic-tab-b', '#ember-testing').is('.active'));
    assert.notOk(jQuery('#basic-tab-c', '#ember-testing').is('.active'));
  });

  test('the active tabpanel should be .active', async function(assert) {
    await visit('/');

    assert.ok(jQuery('#basic-panel-a', '#ember-testing').is('.active'));
  });

  test('the inactive tabpanels should not be .active', async function(assert) {
    await visit('/');

    assert.notOk(jQuery('#basic-panel-b', '#ember-testing').is('.active'));
    assert.notOk(jQuery('#basic-panel-c', '#ember-testing').is('.active'));
  });
});
