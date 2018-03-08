import jQuery from 'jquery';
import { module, test } from 'qunit';
import { setupApplicationTest } from 'ember-qunit';
import { visit } from '@ember/test-helpers';

module('Acceptance | accessibility attributes', function(hooks) {
  setupApplicationTest(hooks);

  test('tablists should be [role="tablist"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tablist', '#ember-testing').attr('role'), 'tablist');
  });

  test('tablists should be [aria-multiselectable="false"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tablist', '#ember-testing').attr('aria-multiselectable'), 'false');
  });

  test('tabs should be [role="tab"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tab-a', '#ember-testing').attr('role'), 'tab');
    assert.equal(jQuery('#basic-tab-b', '#ember-testing').attr('role'), 'tab');
    assert.equal(jQuery('#basic-tab-c', '#ember-testing').attr('role'), 'tab');
  });

  test('tabs should be [aria-controls], set to the ID of their tabpanel', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tab-a', '#ember-testing').attr('aria-controls'), 'basic-panel-a');
    assert.equal(jQuery('#basic-tab-b', '#ember-testing').attr('aria-controls'), 'basic-panel-b');
    assert.equal(jQuery('#basic-tab-c', '#ember-testing').attr('aria-controls'), 'basic-panel-c');
  });

  test('the active tab should be [aria-expanded="true"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tab-a', '#ember-testing').attr('aria-expanded'), 'true');
  });

  test('the active tab should be [aria-selected="true"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tab-a', '#ember-testing').attr('aria-selected'), 'true');
  });

  test('the inactive tabs should be [aria-expanded="false"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tab-b', '#ember-testing').attr('aria-expanded'), 'false');
    assert.equal(jQuery('#basic-tab-c', '#ember-testing').attr('aria-expanded'), 'false');
  });

  test('the inactive tabs should be [aria-selected="false"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tab-b', '#ember-testing').attr('aria-selected'), 'false');
    assert.equal(jQuery('#basic-tab-c', '#ember-testing').attr('aria-selected'), 'false');
  });

  test('the active tab should be [tabindex="0"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-tab-a', '#ember-testing').attr('tabindex'), '0');
  });

  test('the inactive tabs should not be [tabindex]', async function(assert) {
    await visit('/');

    assert.notOk(jQuery('#basic-tab-b', '#ember-testing').attr('tabindex'));
    assert.notOk(jQuery('#basic-tab-c', '#ember-testing').attr('tabindex'));
  });

  test('tabpanels should be [role="tabpanel"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-panel-a', '#ember-testing').attr('role'), 'tabpanel');
    assert.equal(jQuery('#basic-panel-b', '#ember-testing').attr('role'), 'tabpanel');
    assert.equal(jQuery('#basic-panel-c', '#ember-testing').attr('role'), 'tabpanel');
  });

  test('tabpanels should be [aria-labelledby], set to the ID of their tab', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-panel-a', '#ember-testing').attr('aria-labelledby'), 'basic-tab-a');
    assert.equal(jQuery('#basic-panel-b', '#ember-testing').attr('aria-labelledby'), 'basic-tab-b');
    assert.equal(jQuery('#basic-panel-c', '#ember-testing').attr('aria-labelledby'), 'basic-tab-c');
  });

  test('the active tabpanel should be [aria-hidden="false"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-panel-a', '#ember-testing').attr('aria-hidden'), 'false');
  });

  test('the inactive tabpanels should be [aria-hidden="true"]', async function(assert) {
    await visit('/');

    assert.equal(jQuery('#basic-panel-b', '#ember-testing').attr('aria-hidden'), 'true');
    assert.equal(jQuery('#basic-panel-c', '#ember-testing').attr('aria-hidden'), 'true');
  });
});
